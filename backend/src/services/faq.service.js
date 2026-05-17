import FAQ from '../models/FAQ.model.js';
import ApiError from '../utils/ApiError.js';
import { StatusCodes } from 'http-status-codes';

export const createFAQ = async (data) => {
  return await FAQ.create(data);
};

export const queryFAQs = async (filter = {}) => {
  return await FAQ.find({ ...filter, active: true }).sort({ order: 1, createdAt: -1 });
};

export const getFAQById = async (id) => {
  const faq = await FAQ.findById(id);
  if (!faq) throw new ApiError(StatusCodes.NOT_FOUND, 'FAQ not found');
  return faq;
};

export const updateFAQ = async (id, data) => {
  const faq = await FAQ.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!faq) throw new ApiError(StatusCodes.NOT_FOUND, 'FAQ not found');
  return faq;
};

export const deleteFAQ = async (id) => {
  const faq = await FAQ.findByIdAndDelete(id);
  if (!faq) throw new ApiError(StatusCodes.NOT_FOUND, 'FAQ not found');
  return faq;
};
