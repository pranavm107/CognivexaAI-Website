import Feature from '../models/Feature.model.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

export const createFeature = async (data) => {
  return await Feature.create(data);
};

export const queryFeatures = async (filter = {}) => {
  return await Feature.find({ ...filter, active: true }).sort({ order: 1, createdAt: -1 });
};

export const updateFeature = async (id, data) => {
  const feature = await Feature.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!feature) throw new ApiError(StatusCodes.NOT_FOUND, 'Feature not found');
  return feature;
};

export const deleteFeature = async (id) => {
  const feature = await Feature.findByIdAndDelete(id);
  if (!feature) throw new ApiError(StatusCodes.NOT_FOUND, 'Feature not found');
  return feature;
};
