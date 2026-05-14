import { StatusCodes } from 'http-status-codes';
import Invoice from '../models/Invoice.model.js';
import Project from '../models/Project.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import ApiError from '../utils/ApiError.js';
import { socketService } from './socket.service.js';

/**
 * Enterprise Payment Orchestration Service
 * Handles multi-gateway payment sessions and reconciliation.
 */
export const paymentOrchestrator = {
  /**
   * Finalize Payment & Reconcile Balances
   */
  processPaymentSuccess: async (invoiceId, paymentDetails) => {
    const { amount, method, transactionId } = paymentDetails;
    
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) throw new ApiError(StatusCodes.NOT_FOUND, 'Invoice not found');

    // Update Invoice
    invoice.status = 'paid';
    invoice.paidAt = new Date();
    invoice.paymentHistory.push({
      amount,
      method,
      transactionId,
      paidAt: new Date()
    });

    await invoice.save();

    // If linked to a milestone, update milestone status to 'paid'
    if (invoice.milestoneId && invoice.project) {
      const project = await Project.findById(invoice.project);
      if (project) {
        const milestone = project.milestones.id(invoice.milestoneId);
        if (milestone) {
          milestone.status = 'paid';
          await project.save();
        }
      }
    }

    // Broadcast Real-time Success
    socketService.to(`client_${invoice.client}`, 'PAYMENT_SUCCESSFUL', {
      invoiceId: invoice._id,
      amount
    });
    
    socketService.to('admin_finance', 'REVENUE_RECEIVED', {
      invoiceId: invoice._id,
      amount,
      client: invoice.client
    });

    // Log for Audit
    await ActivityLog.create({
      action: 'PAYMENT_COMPLETED',
      entityType: 'Invoice',
      entityId: invoice._id,
      clientId: invoice.client,
      details: { amount, method, transactionId }
    });

    return invoice;
  },

  /**
   * Handle Payment Failures
   */
  processPaymentFailure: async (invoiceId, errorDetails) => {
    const invoice = await Invoice.findByIdAndUpdate(invoiceId, {
      status: 'failed'
    });

    socketService.to(`client_${invoice.client}`, 'PAYMENT_FAILED', {
      invoiceId,
      error: errorDetails.message
    });

    return invoice;
  }
};
