import { StatusCodes } from 'http-status-codes';
import Project from '../models/Project.model.js';
import catchAsync from '../utils/catchAsync.js';
import ActivityLog from '../models/ActivityLog.model.js';
import { socketService } from '../services/socket.service.js';

/**
 * DELIVERY PIPELINE CONTROLLER
 */
export const getDeliveryPipeline = catchAsync(async (req, res) => {
  const projects = await Project.find({ isDeleted: false })
    .populate('client', 'companyName')
    .sort({ updatedAt: -1 });

  // Group by phase
  const phases = {
    onboarding: projects.filter(p => p.status === 'discovery'),
    planning: projects.filter(p => p.status === 'design'),
    development: projects.filter(p => p.status === 'development'),
    testing: projects.filter(p => p.status === 'testing'),
    deployment: projects.filter(p => p.status === 'deployment'),
    completed: projects.filter(p => p.status === 'completed')
  };

  res.send({ success: true, data: phases });
});

export const updateProjectPhase = catchAsync(async (req, res) => {
  const { projectId, newStatus } = req.body;

  const project = await Project.findById(projectId);
  if (!project) return res.status(StatusCodes.NOT_FOUND).send({ message: 'Project not found' });

  const oldStatus = project.status;
  project.status = newStatus;
  await project.save();

  // Audit
  await ActivityLog.create({
    actorId: req.user._id,
    action: 'PROJECT_PHASE_CHANGED',
    entityType: 'Project',
    entityId: projectId,
    details: { oldStatus, newStatus }
  });

  // Real-time
  socketService.to('admin_global', 'PIPELINE_UPDATED', {
    projectId,
    oldStatus,
    newStatus
  });

  res.send({ success: true, message: 'Project phase updated' });
});

export default {
  getDeliveryPipeline,
  updateProjectPhase
};
