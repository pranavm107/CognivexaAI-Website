import * as inquiryService from '../services/inquiry.service.js';
import * as mailService from '../services/mail.service.js';
import Inquiry from '../models/inquiry.model.js';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import { getIO } from '../services/socket.service.js';

export const getInquiries = catchAsync(async (req, res) => {
  const filter = { isDeleted: false };
  
  // Apply filters from query
  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
  if (req.query.search) {
    filter.$or = [
      { fullName: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
      { company: { $regex: req.query.search, $options: 'i' } },
    ];
  }

  const options = {
    limit: parseInt(req.query.limit, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
    sortBy: req.query.sortBy || 'createdAt:desc',
  };

  const result = await inquiryService.queryInquiries(filter, options);
  res.send(result);
});

export const getInquiry = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.getInquiryById(req.params.id);
  res.send(inquiry);
});

export const updateInquiry = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.updateInquiry(req.params.id, req.body, req.user.id);
  
  // Emit real-time update
  const io = getIO();
  io.to('admin_room').emit('inquiry_updated', inquiry);
  
  res.send(inquiry);
});

export const addNote = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.addInternalNote(
    req.params.id, 
    req.body.content, 
    req.body.notifyClient, 
    req.user.id
  );
  
  const io = getIO();
  io.to('admin_room').emit('inquiry_updated', inquiry);
  
  res.status(StatusCodes.CREATED).send(inquiry);
});

export const sendProposal = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.sendProposal(req.params.id, req.body, req.user.id);
  
  const io = getIO();
  io.to('admin_room').emit('inquiry_updated', inquiry);
  
  res.send(inquiry);
});

export const createInquiry = catchAsync(async (req, res) => {
  // Ensure required fields for MongoDB schema
  if (!req.body.subject) {
    req.body.subject = `CRM Lead: ${req.body.fullName || 'Untitled'}`;
  }
  if (!req.body.message) {
    req.body.message = `Admin-created lead for ${req.body.company || 'Private Individual'}`;
  }

  const inquiry = await inquiryService.updateInquiry(null, req.body, req.user.id);
  
  // Auto run AI scoring for admin leads too
  await inquiryService.runAIScoring(inquiry._id);
  
  const io = getIO();
  io.to('admin_room').emit('new_inquiry', inquiry);
  
  res.status(StatusCodes.CREATED).send(inquiry);
});

export const runAIAnalysis = catchAsync(async (req, res) => {
  const inquiry = await inquiryService.runAIScoring(req.params.id);
  
  const io = getIO();
  io.to('admin_room').emit('inquiry_updated', inquiry);
  
  res.send(inquiry);
});

export const createPublicInquiry = catchAsync(async (req, res) => {
  const { fullName, name, email, phone, company, serviceOfInterest, service, subject, message } = req.body;
  
  // Create inquiry
  const inquiryData = {
    fullName: fullName || name,
    email,
    phone,
    company,
    serviceOfInterest: serviceOfInterest || service,
    subject: subject || `Inquiry from ${fullName || name}`,
    message,
    source: 'Website Form'
  };

  const inquiry = await inquiryService.updateInquiry(null, inquiryData, null); // updateInquiry logic handles create
  
  // Send confirmation email to client
  try {
    await mailService.sendInquiryConfirmation({
      name: inquiry.fullName,
      email: inquiry.email,
      serviceOfInterest: inquiry.serviceOfInterest,
      id: String(inquiry._id)
    });
    
    // Update notification status
    await Inquiry.findByIdAndUpdate(inquiry._id, {
      'notifications.inquiryReceived': true,
      lastEmailSentAt: new Date(),
      $push: {
        emailHistory: {
          subject: "We Received Your Inquiry | CognivexaAI",
          type: 'confirmation'
        }
      }
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }

  // Run AI analysis immediately for public leads
  await inquiryService.runAIScoring(inquiry._id);
  
  // Emit to admin real-time
  const io = getIO();
  io.to('admin_room').emit('new_inquiry', inquiry);
  
  res.status(StatusCodes.CREATED).send({ message: 'Inquiry received successfully' });
});

export const deleteInquiry = catchAsync(async (req, res) => {
  await inquiryService.updateInquiry(req.params.id, { isDeleted: true }, req.user.id);
  res.status(StatusCodes.NO_CONTENT).send();
});
