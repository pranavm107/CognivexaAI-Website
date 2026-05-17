import Inquiry from '../models/inquiry.model.js';
import Opportunity from '../models/Opportunity.model.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';
import ActivityLog from '../models/ActivityLog.model.js';

/**
 * CRM Service - Enterprise Lead & Opportunity Orchestration
 */

/**
 * Convert an Inquiry into a full CRM Opportunity
 */
export const convertInquiryToOpportunity = async (inquiryId, performerId) => {
  const inquiry = await Inquiry.findById(inquiryId);
  
  if (!inquiry) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Inquiry not found');
  }

  if (inquiry.status === 'converted' || inquiry.convertedOpportunityId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Inquiry already converted to an opportunity');
  }

  // Create Opportunity
  const opportunity = await Opportunity.create({
    title: `Deal: ${inquiry.fullName} - ${inquiry.serviceOfInterest || 'Professional Services'}`,
    stage: 'qualified',
    value: inquiry.estimatedValue || 0,
    owner: inquiry.assignedTo || performerId,
    linkedInquiryId: inquiry._id,
    source: inquiry.leadSource || 'Inquiry Form',
    priority: inquiry.priority || 'medium',
    tags: inquiry.tags || [],
    activities: [
      {
        type: 'conversion',
        description: 'Opportunity created from qualified inquiry lead',
        performer: performerId,
        timestamp: new Date()
      }
    ],
    notes: inquiry.internalNotes.map(n => ({
      text: n.content,
      author: n.addedBy,
      createdAt: n.createdAt
    }))
  });

  // Update Inquiry Status
  inquiry.status = 'converted';
  inquiry.convertedAt = new Date();
  inquiry.convertedOpportunityId = opportunity._id;
  
  inquiry.activities.push({
    type: 'conversion',
    description: `Lead converted to opportunity: ${opportunity.title}`,
    performer: performerId,
    timestamp: new Date()
  });

  await inquiry.save();

  // Audit Log
  await ActivityLog.create({
    actorId: performerId,
    action: 'CRM_LEAD_CONVERTED',
    entityType: 'Inquiry',
    entityId: inquiry._id,
    details: { opportunityId: opportunity._id }
  });

  return { inquiry, opportunity };
};

/**
 * Get unified pipeline stats
 */
export const getUnifiedPipelineStats = async () => {
  const inquiries = await Inquiry.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$status', count: { $sum: 1 }, value: { $sum: '$estimatedValue' } } }
  ]);

  const opportunities = await Opportunity.aggregate([
    { $group: { _id: '$stage', count: { $sum: 1 }, value: { $sum: '$value' } } }
  ]);

  return { inquiries, opportunities };
};
