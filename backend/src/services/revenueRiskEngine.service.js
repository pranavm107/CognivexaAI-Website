import Invoice from '../models/Invoice.model.js';
import Client from '../models/Client.model.js';

/**
 * Enterprise Revenue Risk Engine
 * Calculates organization-level financial reliability and predicts revenue delays.
 */
export const revenueRiskEngine = {
  /**
   * Calculate Payment Reliability Score for an Organization
   * Score: 0 (Critical) to 100 (Perfect)
   */
  calculateClientRiskScore: async (clientId) => {
    const invoices = await Invoice.find({ client: clientId, isDeleted: false });
    if (invoices.length === 0) return 100;

    const paidInvoices = invoices.filter(i => i.status === 'paid');
    const overdueInvoices = invoices.filter(i => i.status === 'overdue' || i.status === 'failed');

    // Factor 1: On-time Payment Ratio
    const onTimeRatio = paidInvoices.length / invoices.length;

    // Factor 2: Average Delay Days
    let totalDelayDays = 0;
    paidInvoices.forEach(inv => {
      if (inv.paidAt && inv.dueDate) {
        const delay = Math.max(0, (new Date(inv.paidAt) - new Date(inv.dueDate)) / (1000 * 60 * 60 * 24));
        totalDelayDays += delay;
      }
    });
    const avgDelay = paidInvoices.length > 0 ? totalDelayDays / paidInvoices.length : 0;

    // Scoring Formula
    let score = (onTimeRatio * 60); // 60% weight on ratio
    score += Math.max(0, 40 - (avgDelay * 2)); // 40% weight on speed (deduct 2 points per day delay)

    return Math.round(Math.min(100, Math.max(0, score)));
  },

  /**
   * Predict Revenue at Risk
   */
  getRevenueAtRisk: async () => {
    const overdue = await Invoice.find({ status: 'overdue', isDeleted: false });
    const amount = overdue.reduce((sum, inv) => sum + inv.totalAmount, 0);
    
    return {
      totalAtRisk: amount,
      overdueCount: overdue.length,
      criticalAccounts: [...new Set(overdue.map(i => i.client.toString()))].length
    };
  }
};
