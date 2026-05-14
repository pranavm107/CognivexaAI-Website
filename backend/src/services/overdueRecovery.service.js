import Invoice from '../models/Invoice.model.js';
import { paymentReminderQueue, overdueEscalationQueue } from '../config/queue.js';
import ActivityLog from '../models/ActivityLog.model.js';
import logger from '../config/logger.js';
import { socketService } from './socket.service.js';
import { financialNotificationService } from './financialNotification.service.js';

/**
 * Enterprise Revenue Recovery Service
 * Automates detection, reminders, and escalations for overdue invoices.
 */
export const overdueRecoveryService = {
  /**
   * Scan for Overdue Invoices
   * Intended to be run by a Cron job or periodic queue.
   */
  scanForOverdueInvoices: async () => {
    logger.info('--- REVENUE RECOVERY SCAN STARTED ---');
    const now = new Date();
    
    // Find unpaid invoices that are past due
    const overdueInvoices = await Invoice.find({
      status: { $in: ['pending', 'partially_paid', 'failed'] },
      dueDate: { $lt: now },
      isDeleted: false
    });

    for (const invoice of overdueInvoices) {
      await overdueRecoveryService.processOverdueInvoice(invoice);
    }
    
    logger.info(`Processed ${overdueInvoices.length} overdue invoices`);
  },

  /**
   * Process Individual Overdue Invoice
   */
  processOverdueInvoice: async (invoice) => {
    const now = new Date();
    const daysOverdue = Math.floor((now - new Date(invoice.dueDate)) / (1000 * 60 * 60 * 24));
    
    // Determine Escalation Level
    let escalationLevel = 'overdue';
    if (daysOverdue >= 30) escalationLevel = 'critical';
    else if (daysOverdue >= 15) escalationLevel = 'escalated';
    else if (daysOverdue >= 7) escalationLevel = 'warning';

    // Update Status if not already marked
    if (invoice.status !== 'overdue') {
      invoice.status = 'overdue';
      await invoice.save();
    }

    // Enqueue Reminder Job
    await paymentReminderQueue.add(`reminder-${invoice._id}-${escalationLevel}`, {
      invoiceId: invoice._id,
      clientId: invoice.client,
      level: escalationLevel,
      daysOverdue
    }, {
      jobId: `reminder-${invoice._id}-${escalationLevel}-${now.toDateString()}`,
      removeOnComplete: true
    });

    // Broadcast Real-time Warning
    await financialNotificationService.notifyOverdue(invoice, escalationLevel);

    // Log Activity
    await ActivityLog.create({
      action: 'OVERDUE_RECOVERY_TRIGGERED',
      entityType: 'Invoice',
      entityId: invoice._id,
      clientId: invoice.client,
      details: { daysOverdue, escalationLevel }
    });
  }
};
