import { StatusCodes } from 'http-status-codes';
import * as faqService from '../services/faq.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiResponse from '../utils/ApiResponse.js';

export const createFAQ = catchAsync(async (req, res) => {
  const faq = await faqService.createFAQ(req.body);
  res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, 'FAQ created', faq));
});

export const getFAQs = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const faqs = await faqService.queryFAQs(filter);
  res.send(new ApiResponse(StatusCodes.OK, 'FAQs fetched', faqs));
});

export const updateFAQ = catchAsync(async (req, res) => {
  const faq = await faqService.updateFAQ(req.params.id, req.body);
  res.send(new ApiResponse(StatusCodes.OK, 'FAQ updated', faq));
});

export const deleteFAQ = catchAsync(async (req, res) => {
  await faqService.deleteFAQ(req.params.id);
  res.send(new ApiResponse(StatusCodes.OK, 'FAQ deleted'));
});
