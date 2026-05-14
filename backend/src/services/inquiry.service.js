import Inquiry from '../models/inquiry.model.js';
import logger from '../config/logger.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';
import * as mailService from './mail.service.js';

/**
 * Query for inquiries with filters and pagination
 */
export const queryInquiries = async (filter, options) => {
  const { limit = 10, page = 1, sortBy = 'createdAt:desc' } = options;
  const skip = (page - 1) * limit;

  // Sorting
  const sort = {};
  if (sortBy) {
    const [field, order] = sortBy.split(':');
    sort[field] = order === 'desc' ? -1 : 1;
  }

  const inquiries = await Inquiry.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('assignedTo', 'firstName lastName email avatar')
    .populate('internalNotes.addedBy', 'firstName lastName avatar');

  const totalResults = await Inquiry.countDocuments(filter);
  const totalPages = Math.ceil(totalResults / limit);

  return {
    results: inquiries,
    page,
    limit,
    totalPages,
    totalResults,
  };
};

/**
 * Get inquiry by id
 */
export const getInquiryById = async (id) => {
  const inquiry = await Inquiry.findById(id)
    .populate('assignedTo', 'firstName lastName email avatar')
    .populate('internalNotes.addedBy', 'firstName lastName avatar')
    .populate('activities.performer', 'firstName lastName avatar');
  
  if (!inquiry) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Inquiry not found');
  }
  return inquiry;
};

/**
 * Update inquiry and log activity
 */
export const updateInquiry = async (id, updateBody, performerId) => {
  let inquiry;
  
  if (!id) {
    inquiry = new Inquiry(updateBody);
    await inquiry.save();
    return inquiry;
  }

  inquiry = await getInquiryById(id);

  // Check for status change to log activity and send email
  if (updateBody.status && updateBody.status !== inquiry.status) {
    const oldStatus = inquiry.status;
    inquiry.activities.push({
      type: 'status_change',
      description: `Status changed from ${oldStatus} to ${updateBody.status}`,
      performer: performerId,
      metadata: { from: oldStatus, to: updateBody.status }
    });

    // Send email to customer automatically
    try {
      await mailService.sendInquiryStatusUpdate({
        name: inquiry.fullName,
        email: inquiry.email,
        status: updateBody.status
      });
      inquiry.notifications.statusUpdated = true;
      inquiry.lastEmailSentAt = new Date();
      inquiry.emailHistory.push({
        subject: `Inquiry status updated to ${updateBody.status}`,
        type: 'status_update'
      });
    } catch (error) {
      logger.error('Failed to send status update email:', error);
    }
  }

  // Check for assignment change
  if (updateBody.assignedTo && String(updateBody.assignedTo) !== String(inquiry.assignedTo)) {
    inquiry.activities.push({
      type: 'assignment',
      description: `Lead assigned to another administrator`,
      performer: performerId,
      metadata: { assignedTo: updateBody.assignedTo }
    });
  }

  Object.assign(inquiry, updateBody);
  await inquiry.save();
  return inquiry;
};

/**
 * Send Proposal
 */
export const sendProposal = async (id, proposalData, performerId) => {
  const inquiry = await getInquiryById(id);
  
  // 1. Attempt to send the email first
  // If this fails and throws, the database updates below will never execute
  await mailService.sendProposalEmail({
    name: inquiry.fullName,
    email: inquiry.email,
    subject: proposalData.subject,
    message: proposalData.message,
    pricing: proposalData.pricing,
    timeline: proposalData.timeline,
    ctaLink: proposalData.ctaLink
  });
  
  // 2. Only if email succeeded, update status and log activity
  inquiry.status = 'proposal_sent';
  inquiry.notifications.proposalSent = true;
  inquiry.lastEmailSentAt = new Date();
  inquiry.emailHistory.push({
    subject: proposalData.subject || 'Enterprise AI Proposal',
    type: 'proposal'
  });

  inquiry.activities.push({
    type: 'proposal_sent',
    description: `Professional proposal sent to client`,
    performer: performerId,
    metadata: proposalData
  });

  await inquiry.save();
  return inquiry;
};

/**
 * Add internal note
 */
export const addInternalNote = async (id, content, notifyClient, performerId) => {
  const inquiry = await getInquiryById(id);
  
  inquiry.internalNotes.push({
    content,
    addedBy: performerId,
    notifiedClient: notifyClient
  });

  inquiry.activities.push({
    type: 'note_added',
    description: `Internal note added by administrator ${notifyClient ? '(Client Notified)' : ''}`,
    performer: performerId
  });

  if (notifyClient) {
    try {
      await mailService.sendAdminNoteNotification({
        name: inquiry.fullName,
        email: inquiry.email,
        note: content
      });
      inquiry.notifications.adminResponseSent = true;
      inquiry.lastEmailSentAt = new Date();
      inquiry.emailHistory.push({
        subject: 'Inquiry Update from CognivexaAI',
        type: 'note'
      });
    } catch (error) {
      logger.error('Failed to notify client about note:', error);
    }
  }

  await inquiry.save();
  return inquiry;
};

/**
 * AI Scoring Mock (In a real system, this would call an LLM)
 */
export const runAIScoring = async (id) => {
  const inquiry = await getInquiryById(id);
  
  // Logic simulate AI analysis
  const score = Math.floor(Math.random() * 40) + 60; // 60-100
  const urgency = score > 85 ? 'high' : (score > 70 ? 'medium' : 'low');
  
  inquiry.aiIntelligence = {
    score,
    urgency,
    summary: `Lead shows interest in ${inquiry.serviceOfInterest || 'general AI solutions'}. Request appears legitimate with business-level messaging.`,
    sentiment: 'positive',
    conversionProbability: score / 100,
    recommendedNextAction: urgency === 'high' ? 'Schedule discovery call immediately' : 'Send technical case studies',
  };

  await inquiry.save();
  return inquiry;
};
