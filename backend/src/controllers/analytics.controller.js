import * as analyticsService from '../services/analytics.service.js';
import catchAsync from '../utils/catchAsync.js';

export const getFullReport = catchAsync(async (req, res) => {
  const { range } = req.query;
  const report = await analyticsService.getFullReport(range);
  res.send(report);
});

export const getBookingsTrend = catchAsync(async (req, res) => {
  const { range } = req.query;
  const report = await analyticsService.getFullReport(range);
  res.send(report.trends);
});

export const getServiceDemand = catchAsync(async (req, res) => {
  const report = await analyticsService.getFullReport('30');
  res.send(report.services);
});

export const getConversionFunnel = catchAsync(async (req, res) => {
  const report = await analyticsService.getFullReport('30');
  res.send(report.funnel);
});
