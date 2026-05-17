import { StatusCodes } from 'http-status-codes';
import * as processStepService from '../services/processStep.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createProcessStep = catchAsync(async (req, res) => {
  const step = await processStepService.createProcessStep(req.body);
  res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, 'Process step created', step));
});

export const getProcessSteps = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.type) filter.type = req.query.type;
  const steps = await processStepService.queryProcessSteps(filter);
  res.send(new ApiResponse(StatusCodes.OK, 'Process steps fetched', steps));
});

export const updateProcessStep = catchAsync(async (req, res) => {
  const step = await processStepService.updateProcessStep(req.params.id, req.body);
  res.send(new ApiResponse(StatusCodes.OK, 'Process step updated', step));
});

export const deleteProcessStep = catchAsync(async (req, res) => {
  await processStepService.deleteProcessStep(req.params.id);
  res.send(new ApiResponse(StatusCodes.OK, 'Process step deleted'));
});
