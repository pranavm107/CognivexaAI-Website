import { StatusCodes } from 'http-status-codes';
import Project from '../models/Project.model.js';
import Message from '../models/Message.model.js';
import Invoice from '../models/Invoice.model.js';
import Notification from '../models/Notification.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import User from '../models/User.model.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import { emitToProject, emitToAdmin } from '../services/socket.service.js';

const emitGlobalOp = (event, data) => {
  emitToAdmin('global_operation', {
    ...data,
    timestamp: new Date()
  });
};

/**
 * DASHBOARD
 */
export const getDashboardData = catchAsync(async (req, res) => {
  const [activeProjects, upcomingMeetings, invoiceStats, recentActivity] = await Promise.all([
    Project.find({ client: req.user.clientId, status: { $ne: 'completed' }, isDeleted: false }),
    Project.aggregate([
      { $match: { client: req.user.clientId, isDeleted: false } },
      { $unwind: '$meetings' },
      { $match: { 'meetings.date': { $gte: new Date() }, 'meetings.status': 'scheduled' } },
      { $sort: { 'meetings.date': 1 } },
      { $limit: 5 }
    ]),
    Invoice.aggregate([
      { $match: { client: req.user.clientId, isDeleted: false } },
      { $group: { _id: '$status', total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
    ]),
    ActivityLog.find({ actorId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
  ]);

  const stats = {
    activeProjectsCount: activeProjects.length,
    pendingInvoicesCount: invoiceStats.find(s => s._id === 'pending')?.count || 0,
    unpaidBalance: invoiceStats.find(s => s._id === 'pending')?.total || 0,
    totalInvestment: invoiceStats.find(s => s._id === 'paid')?.total || 0,
    nextMeeting: upcomingMeetings[0]?.meetings || null,
  };

  res.send({ 
    success: true, 
    data: { stats, recentActivity, activeProjects: activeProjects.slice(0, 3) } 
  });
});

/**
 * PROJECTS
 */
export const getClientProjects = catchAsync(async (req, res) => {
  const projects = await Project.find({ client: req.user.clientId, isDeleted: false })
    .populate('assignedTeam', 'firstName lastName role avatar')
    .sort({ updatedAt: -1 });
    
  res.send({ success: true, results: projects });
});

export const getProjectDetails = catchAsync(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, client: req.user.clientId, isDeleted: false })
    .populate('assignedTeam', 'firstName lastName role avatar')
    .populate('updates.author', 'firstName lastName avatar')
    .populate('invoices');
    
  if (!project) throw new ApiError(StatusCodes.NOT_FOUND, 'Project not found');
  
  res.send({ success: true, data: project });
});

export const requestProject = catchAsync(async (req, res) => {
  const { title, description, category, budget, deadline } = req.body;
  
  const project = await Project.create({
    title,
    description,
    client: req.user.clientId,
    status: 'discovery',
    budget, // Assuming we add this to model if not there
    dueDate: deadline,
  });

  emitGlobalOp('PROJECT_REQUESTED', {
    clientId: req.user.clientId,
    actor: `${req.user.firstName} ${req.user.lastName}`,
    projectTitle: title,
    type: 'project'
  });

  res.status(StatusCodes.CREATED).send({ success: true, data: project });
});

/**
 * MESSAGES
 */
export const getMessages = catchAsync(async (req, res) => {
  const { projectId } = req.query;
  const filter = { isDeleted: false };
  
  if (projectId) {
    filter.projectId = projectId;
  } else {
    const projects = await Project.find({ client: req.user.clientId, isDeleted: false }).select('_id');
    filter.projectId = { $in: projects.map(p => p._id) };
  }

  const messages = await Message.find(filter)
    .populate('sender', 'firstName lastName avatar role')
    .sort({ createdAt: 1 });

  res.send({ success: true, results: messages });
});

export const sendMessage = catchAsync(async (req, res) => {
  const { projectId, content, attachments } = req.body;
  
  const project = await Project.findOne({ _id: projectId, client: req.user.clientId });
  if (!project) throw new ApiError(StatusCodes.FORBIDDEN, 'Unauthorized project access');

  const message = await Message.create({
    sender: req.user._id,
    projectId,
    content,
    attachments
  });

  const populatedMessage = await Message.findById(message._id)
    .populate('sender', 'firstName lastName avatar role');

  emitToProject(projectId, 'new_message', populatedMessage);
  
  emitGlobalOp('MESSAGE_SENT', {
    clientId: req.user.clientId,
    actor: `${req.user.firstName} ${req.user.lastName}`,
    projectId,
    type: 'message'
  });

  res.status(StatusCodes.CREATED).send({ success: true, data: populatedMessage });
});

/**
 * INVOICES
 */
export const getInvoices = catchAsync(async (req, res) => {
  const invoices = await Invoice.find({ client: req.user.clientId, isDeleted: false })
    .populate('project', 'title')
    .sort({ createdAt: -1 });

  res.send({ success: true, results: invoices });
});

export const payInvoice = catchAsync(async (req, res) => {
  const { invoiceId } = req.params;
  const invoice = await Invoice.findOne({ _id: invoiceId, client: req.user.clientId });
  
  if (!invoice) throw new ApiError(StatusCodes.NOT_FOUND, 'Invoice not found');
  
  invoice.status = 'paid';
  invoice.paidAt = new Date();
  await invoice.save();

  await ActivityLog.create({
    actorId: req.user._id,
    action: 'INVOICE_PAID',
    entityType: 'Invoice',
    entityId: invoice._id,
    details: { newValues: { amount: invoice.totalAmount } }
  });

  emitGlobalOp('INVOICE_PAID', {
    clientId: req.user.clientId,
    actor: `${req.user.firstName} ${req.user.lastName}`,
    amount: invoice.totalAmount,
    invoiceId: invoice._id,
    type: 'finance'
  });

  res.send({ success: true, message: 'Payment successful', data: invoice });
});

/**
 * NOTIFICATIONS
 */
export const getNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({ recipient: req.user._id, isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(20);

  res.send({ success: true, results: notifications });
});

export const markNotificationRead = catchAsync(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user._id, _id: req.params.id },
    { isRead: true }
  );
  res.send({ success: true });
});

/**
 * FILES
 */
export const getFiles = catchAsync(async (req, res) => {
  const { projectId } = req.query;
  const filter = { isDeleted: false };
  
  if (projectId) {
    const project = await Project.findOne({ _id: projectId, client: req.user.clientId }).select('files');
    return res.send({ success: true, results: project ? project.files : [] });
  }

  const projects = await Project.find({ client: req.user.clientId, isDeleted: false }).select('files');
  const allFiles = projects.reduce((acc, p) => [...acc, ...p.files], []);

  res.send({ success: true, results: allFiles });
});

export const approveFile = catchAsync(async (req, res) => {
  const { projectId, fileId } = req.params;
  const { status, feedback } = req.body;

  const project = await Project.findOne({ _id: projectId, client: req.user.clientId });
  if (!project) throw new ApiError(StatusCodes.NOT_FOUND, 'Project not found');

  const file = project.files.id(fileId);
  if (!file) throw new ApiError(StatusCodes.NOT_FOUND, 'File not found');

  file.status = status;
  if (status === 'approved') {
    file.approvalDetails = {
      approvedAt: new Date(),
      approvedBy: req.user._id,
      feedback
    };
  } else {
    file.approvalDetails.feedback = feedback;
  }

  await project.save();

  res.send({ success: true, data: file });
});

export const updateFileVersion = catchAsync(async (req, res) => {
  const { projectId, fileId } = req.params;
  const { url, name } = req.body;

  const project = await Project.findOne({ _id: projectId, client: req.user.clientId });
  const file = project.files.id(fileId);

  // Push current version to history
  file.history.push({
    url: file.url,
    version: file.version,
    updatedAt: new Date(),
    updatedBy: req.user._id
  });

  // Update to new version
  file.url = url;
  file.version += 1;
  file.status = 'pending_review';
  if (name) file.name = name;

  await project.save();

  res.send({ success: true, data: file });
});

export const uploadFile = catchAsync(async (req, res) => {
  const { projectId, name, url, type, size } = req.body;
  
  const project = await Project.findOne({ _id: projectId, client: req.user.clientId });
  if (!project) throw new ApiError(StatusCodes.FORBIDDEN, 'Unauthorized project access');

  const newFile = {
    name,
    url,
    type,
    size,
    status: 'pending_review',
    uploadedBy: req.user._id,
    createdAt: new Date()
  };

  project.files.push(newFile);
  await project.save();

  await ActivityLog.create({
    actorId: req.user._id,
    action: 'FILE_UPLOADED',
    entityType: 'Project',
    entityId: projectId,
    details: { newValues: { fileName: name } }
  });

  emitGlobalOp('FILE_UPLOADED', {
    clientId: req.user.clientId,
    actor: `${req.user.firstName} ${req.user.lastName}`,
    fileName: name,
    projectId,
    type: 'file'
  });

  res.status(StatusCodes.CREATED).send({ success: true, data: newFile });
});

/**
 * MEETINGS
 */
export const scheduleMeeting = catchAsync(async (req, res) => {
  const { projectId, title, date, link, duration, notes } = req.body;

  const project = await Project.findOne({ _id: projectId, client: req.user.clientId });
  if (!project) throw new ApiError(StatusCodes.FORBIDDEN, 'Unauthorized project access');

  const meeting = {
    title,
    date,
    link,
    duration,
    summary: notes,
    status: 'scheduled'
  };

  project.meetings.push(meeting);
  await project.save();

  await ActivityLog.create({
    actorId: req.user._id,
    action: 'MEETING_SCHEDULED',
    entityType: 'Project',
    entityId: projectId,
    details: { newValues: { title, date } }
  });

  emitGlobalOp('MEETING_SCHEDULED', {
    clientId: req.user.clientId,
    actor: `${req.user.firstName} ${req.user.lastName}`,
    meetingTitle: title,
    date,
    type: 'meeting'
  });

  res.status(StatusCodes.CREATED).send({ success: true, data: meeting });
});

/**
 * PROFILE
 */
export const updateProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { firstName, lastName, email, phone, avatar } = req.body;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (avatar) user.avatar = avatar;

  await user.save();

  res.send({ success: true, data: user });
});

export const updatePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!(await user.isPasswordMatch(currentPassword))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect current password');
  }

  user.password = newPassword;
  await user.save();

  res.send({ success: true, message: 'Password updated successfully' });
});

export default {
  getDashboardData,
  getClientProjects,
  getProjectDetails,
  requestProject,
  getMessages,
  sendMessage,
  getInvoices,
  payInvoice,
  getNotifications,
  markNotificationRead,
  getFiles,
  approveFile,
  updateFileVersion,
  uploadFile,
  scheduleMeeting,
  updateProfile,
  updatePassword
};
