import { StatusCodes } from 'http-status-codes';
import ProjectRequest from '../models/ProjectRequest.model.js';
import catchAsync from '../utils/catchAsync.js';
import ActivityLog from '../models/ActivityLog.model.js';
import { socketService } from '../services/socket.service.js';

/**
 * PROJECT REQUEST CONTROLLER
 */
export const submitRequest = catchAsync(async (req, res) => {
  const request = await ProjectRequest.create({
    ...req.body,
    client: req.user.clientId,
    requestedBy: req.user._id,
    status: 'submitted'
  });

  // Audit
  await ActivityLog.create({
    actorId: req.user._id,
    action: 'PROJECT_REQUESTED',
    entityType: 'ProjectRequest',
    entityId: request._id,
    clientId: req.user.clientId,
    details: { title: request.title }
  });

  // Real-time
  socketService.to('admin_global', 'NEW_PROJECT_REQUEST', {
    requestId: request._id,
    title: request.title,
    client: req.user.clientId
  });

  res.status(StatusCodes.CREATED).send({ success: true, data: request });
});

export const getRequests = catchAsync(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { client: req.user.clientId };
  const requests = await ProjectRequest.find({ ...filter, isDeleted: false })
    .populate('client', 'companyName')
    .populate('requestedBy', 'firstName lastName')
    .sort({ createdAt: -1 });

  res.send({ success: true, data: requests });
});

export default {
  submitRequest,
  getRequests
};
