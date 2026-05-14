import { StatusCodes } from 'http-status-codes';
import Deliverable from '../models/Deliverable.model.js';
import Project from '../models/Project.model.js';
import { milestoneBillingService } from '../services/milestoneBilling.service.js';
import catchAsync from '../utils/catchAsync.js';
import ActivityLog from '../models/ActivityLog.model.js';

/**
 * ENTERPRISE DELIVERABLE WORKFLOW CONTROLLER
 */
export const approveDeliverable = catchAsync(async (req, res) => {
  const { deliverableId } = req.params;
  
  const deliverable = await Deliverable.findById(deliverableId);
  if (!deliverable) return res.status(StatusCodes.NOT_FOUND).send({ message: 'Deliverable not found' });

  deliverable.status = 'approved';
  deliverable.approvedAt = new Date();
  deliverable.approvedBy = req.user._id;
  await deliverable.save();

  // Audit
  await ActivityLog.create({
    actorId: req.user._id,
    action: 'DELIVERABLE_APPROVED',
    entityType: 'Deliverable',
    entityId: deliverableId,
    clientId: deliverable.clientId,
    details: { title: deliverable.title }
  });

  // Check if this triggers a milestone completion
  // Logic: Find project milestone linked to this deliverable
  const project = await Project.findById(deliverable.projectId);
  if (project) {
    const milestone = project.milestones.find(m => 
      m.deliverables.some(d => d.toString() === deliverableId)
    );

    if (milestone) {
      // Trigger Milestone Approval -> Automated Invoicing
      await milestoneBillingService.handleMilestoneStatusChange(
        project._id, 
        milestone._id, 
        'approved', 
        req.user._id
      );
    }
  }

  res.send({ success: true, message: 'Deliverable approved and financial workflow triggered' });
});

export default {
  approveDeliverable
};
