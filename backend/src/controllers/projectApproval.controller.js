import { StatusCodes } from 'http-status-codes';
import { projectInitializationService } from '../services/projectInitialization.service.js';
import ProjectRequest from '../models/ProjectRequest.model.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * PROJECT APPROVAL CONTROLLER
 */
export const approveRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  
  const project = await projectInitializationService.initializeFromRequest(requestId, req.user._id);
  
  if (!project) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Request already converted or not found' });
  }

  res.send({ success: true, data: project, message: 'Project initialized successfully' });
});

export const rejectRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const { reason } = req.body;

  const request = await ProjectRequest.findById(requestId);
  if (!request) return res.status(StatusCodes.NOT_FOUND).send({ message: 'Request not found' });

  request.status = 'rejected';
  await request.save();

  res.send({ success: true, message: 'Project request rejected' });
});

export default {
  approveRequest,
  rejectRequest
};
