import { StatusCodes } from 'http-status-codes';
import * as featureService from '../services/feature.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createFeature = catchAsync(async (req, res) => {
  const feature = await featureService.createFeature(req.body);
  res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, 'Feature created', feature));
});

export const getFeatures = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const features = await featureService.queryFeatures(filter);
  res.send(new ApiResponse(StatusCodes.OK, 'Features fetched', features));
});

export const updateFeature = catchAsync(async (req, res) => {
  const feature = await featureService.updateFeature(req.params.id, req.body);
  res.send(new ApiResponse(StatusCodes.OK, 'Feature updated', feature));
});

export const deleteFeature = catchAsync(async (req, res) => {
  await featureService.deleteFeature(req.params.id);
  res.send(new ApiResponse(StatusCodes.OK, 'Feature deleted'));
});
