import ProcessStep from '../models/ProcessStep.model.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

export const createProcessStep = async (data) => {
  return await ProcessStep.create(data);
};

export const queryProcessSteps = async (filter = {}) => {
  return await ProcessStep.find({ ...filter, active: true }).sort({ order: 1, stepNumber: 1 });
};

export const updateProcessStep = async (id, data) => {
  const step = await ProcessStep.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!step) throw new ApiError(StatusCodes.NOT_FOUND, 'Process step not found');
  return step;
};

export const deleteProcessStep = async (id) => {
  const step = await ProcessStep.findByIdAndDelete(id);
  if (!step) throw new ApiError(StatusCodes.NOT_FOUND, 'Process step not found');
  return step;
};
