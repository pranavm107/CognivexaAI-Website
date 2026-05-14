import { StatusCodes } from 'http-status-codes';
import Opportunity from '../models/Opportunity.model.js';
import catchAsync from '../utils/catchAsync.js';
import ActivityLog from '../models/ActivityLog.model.js';
import dealConversionService from '../services/dealConversion.service.js';

/**
 * CRM CONTROLLER
 */
export const getSalesPipeline = catchAsync(async (req, res) => {
  const opportunities = await Opportunity.find({})
    .populate('client', 'companyName')
    .populate('owner', 'firstName lastName')
    .sort({ value: -1 });
    
  res.send({ success: true, data: opportunities });
});

export const createOpportunity = catchAsync(async (req, res) => {
  const opportunity = await Opportunity.create({
    ...req.body,
    owner: req.user._id
  });

  await ActivityLog.create({
    actorId: req.user._id,
    action: 'CRM_OPPORTUNITY_CREATED',
    entityType: 'Opportunity',
    entityId: opportunity._id,
    details: { title: opportunity.title, value: opportunity.value }
  });

  res.status(StatusCodes.CREATED).send({ success: true, data: opportunity });
});

export const updateOpportunityStage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;

  const opportunity = await Opportunity.findByIdAndUpdate(id, { stage }, { new: true });
  
  await ActivityLog.create({
    actorId: req.user._id,
    action: 'CRM_STAGE_UPDATED',
    entityType: 'Opportunity',
    entityId: id,
    details: { newStage: stage }
  });

  // Trigger Transactional Conversion if Won
  if (stage === 'won') {
    await dealConversionService.convertDeal(opportunity, req.user._id);
  }

  res.send({ success: true, data: opportunity });
});

export default {
  getSalesPipeline,
  createOpportunity,
  updateOpportunityStage
};
