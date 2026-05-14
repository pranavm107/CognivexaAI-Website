import { StatusCodes as httpStatus } from 'http-status-codes';
import * as pricingService from '../services/pricing.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

// Categories
export const createCategory = catchAsync(async (req, res) => {
  const category = await pricingService.createCategory(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: category });
});
export const getCategories = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) filter.active = req.query.active === 'true';
  const categories = await pricingService.queryCategories(filter);
  res.send({ success: true, results: categories });
});
export const updateCategory = catchAsync(async (req, res) => {
  const category = await pricingService.updateCategory(req.params.id, req.body);
  res.send({ success: true, data: category });
});
export const deleteCategory = catchAsync(async (req, res) => {
  await pricingService.deleteCategory(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Plans
export const createPlan = catchAsync(async (req, res) => {
  const plan = await pricingService.createPlan(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: plan });
});
export const getPlans = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) filter.active = req.query.active === 'true';
  if (req.query.categoryId) filter.categoryId = req.query.categoryId;
  const plans = await pricingService.queryPlans(filter);
  res.send({ success: true, results: plans });
});
export const updatePlan = catchAsync(async (req, res) => {
  const plan = await pricingService.updatePlan(req.params.id, req.body);
  res.send({ success: true, data: plan });
});
export const deletePlan = catchAsync(async (req, res) => {
  await pricingService.deletePlan(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

// Smart Package
export const getSmartPackage = catchAsync(async (req, res) => {
  const pkg = await pricingService.getSmartPackage();
  res.send({ success: true, data: pkg });
});
export const updateSmartPackage = catchAsync(async (req, res) => {
  const pkg = await pricingService.updateSmartPackage(req.params.id, req.body);
  res.send({ success: true, data: pkg });
});
