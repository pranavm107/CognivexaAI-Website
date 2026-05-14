import Ticket from '../models/Ticket.model.js';
import Invoice from '../models/Invoice.model.js';
import Project from '../models/Project.model.js';
import { socketService } from './socket.service.js';
import logger from '../config/logger.js';

/**
 * Enterprise Automation Rule Engine
 * Orchestrates cross-module autonomous actions.
 */
export const automationEngine = {
  /**
   * Monitor Ticket SLA Breaches
   */
  checkSLABreaches: async () => {
    const overdueTickets = await Ticket.find({
      status: { $in: ['open', 'assigned', 'in_progress'] },
      slaDeadline: { $lt: new Date() },
      isEscalated: false
    });

    for (const ticket of overdueTickets) {
      ticket.isEscalated = true;
      ticket.status = 'escalated';
      ticket.escalationReason = 'SLA Breach: Response Deadline Exceeded';
      await ticket.save();

      socketService.to('admin_support', 'TICKET_ESCALATED', {
        ticketId: ticket.ticketId,
        reason: 'SLA Breach'
      });
      
      logger.warn(`Automation: Ticket ${ticket.ticketId} escalated due to SLA breach.`);
    }
  },

  /**
   * Trigger Revenue Escalations
   */
  processRevenueEscalations: async () => {
    // Logic to escalate projects with overdue invoices > 30 days
    const criticalInvoices = await Invoice.find({
      status: 'overdue',
      dueDate: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    for (const inv of criticalInvoices) {
      socketService.to('admin_finance', 'REVENUE_RISK_CRITICAL', {
        invoiceId: inv.invoiceNumber,
        client: inv.client
      });
    }
  }
};
