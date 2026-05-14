import Invoice from '../models/Invoice.model.js';
import Project from '../models/Project.model.js';

/**
 * Enterprise Financial Analytics Service
 * Calculates key financial metrics for the organization.
 */
const getFinancialMetrics = async (clientId = null) => {
  const match = { isDeleted: false };
  if (clientId) match.client = clientId;

  const invoices = await Invoice.find(match);

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const outstandingBalance = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const mrr = invoices
    .filter(inv => inv.status === 'paid' && inv.isRecurring)
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return {
    totalRevenue,
    outstandingBalance,
    mrr,
    invoiceCount: invoices.length,
    paidCount: invoices.filter(inv => inv.status === 'paid').length
  };
};

export default {
  getFinancialMetrics
};
