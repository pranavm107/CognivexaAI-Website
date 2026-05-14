import PricingCategory from '../models/PricingCategory.model.js';
import PricingPlan from '../models/PricingPlan.model.js';
import SmartPackage from '../models/SmartPackage.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

// Categories
export const createCategory = async (body) => PricingCategory.create(body);
export const queryCategories = async (filter) => PricingCategory.find(filter).sort({ order: 1 });
export const updateCategory = async (id, body) => {
  const category = await PricingCategory.findById(id);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  Object.assign(category, body);
  await category.save();
  return category;
};
export const deleteCategory = async (id) => {
  const category = await PricingCategory.findById(id);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  await category.deleteOne();
  return category;
};

// Plans
export const createPlan = async (body) => PricingPlan.create(body);
export const queryPlans = async (filter) => PricingPlan.find(filter).populate('categoryId').sort({ order: 1 });
export const updatePlan = async (id, body) => {
  const plan = await PricingPlan.findById(id);
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  Object.assign(plan, body);
  await plan.save();
  return plan;
};
export const deletePlan = async (id) => {
  const plan = await PricingPlan.findById(id);
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Plan not found');
  await plan.deleteOne();
  return plan;
};

// Smart Package
export const getSmartPackage = async () => {
  let pkg = await SmartPackage.findOne();
  if (!pkg) {
    pkg = await SmartPackage.create({});
  }
  return pkg;
};
export const updateSmartPackage = async (id, body) => {
  const pkg = await SmartPackage.findById(id);
  if (!pkg) throw new ApiError(httpStatus.NOT_FOUND, 'Smart Package not found');
  Object.assign(pkg, body);
  await pkg.save();
  return pkg;
};
