import { StatusCodes } from 'http-status-codes';
import Invoice from '../models/Invoice.model.js';
import Project from '../models/Project.model.js';
import catchAsync from '../utils/catchAsync.js';
import globalAnalyticsService from '../services/globalAnalytics.service.js';
import { revenueRiskEngine } from '../services/revenueRiskEngine.service.js';

/**
 * Enterprise Financial Operations Controller
 */
export const getFinancialHealth = catchAsync(async (req, res) => {
  const [invoices, mrrData, riskMetrics] = await Promise.all([
    Invoice.find({ isDeleted: false }).populate('client', 'companyName'),
    globalAnalyticsService.getGlobalMetrics(),
    revenueRiskEngine.getRevenueAtRisk()
  ]);

  const overdue = invoices.filter(i => i.status === 'overdue' || (i.status === 'pending' && i.dueDate < new Date()));
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.totalAmount, 0);

  res.send({
    success: true,
    data: {
      metrics: {
        totalRevenue: mrrData.revenue.total,
        mrr: mrrData.revenue.mrr,
        arr: mrrData.revenue.arr,
        pendingRevenue,
        overdueCount: overdue.length,
        revenueAtRisk: riskMetrics.totalAtRisk,
        criticalAccounts: riskMetrics.criticalAccounts
      },
      recentInvoices: invoices.slice(0, 10).sort((a, b) => b.createdAt - a.createdAt),
      overdueInvoices: overdue
    }
  });
});

export const getAgingReport = catchAsync(async (req, res) => {
  const invoices = await Invoice.find({ status: 'pending', isDeleted: false });
  const now = new Date();
  
  const aging = {
    current: 0,
    '1-30_days': 0,
    '31-60_days': 0,
    '60+_days': 0
  };

  invoices.forEach(inv => {
    const diff = (now - new Date(inv.dueDate)) / (1000 * 60 * 60 * 24);
    if (diff <= 0) aging.current += inv.totalAmount;
    else if (diff <= 30) aging['1-30_days'] += inv.totalAmount;
    else if (diff <= 60) aging['31-60_days'] += inv.totalAmount;
    else aging['60+_days'] += inv.totalAmount;
  });

  res.send({ success: true, data: aging });
});

export default {
  getFinancialHealth,
  getAgingReport
};
