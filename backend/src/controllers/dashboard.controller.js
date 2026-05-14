import * as dashboardService from '../services/dashboard.service.js';
import catchAsync from '../utils/catchAsync.js';

export const getStats = catchAsync(async (req, res) => {
  const stats = await dashboardService.getDashboardStats();
  res.send(stats);
});
