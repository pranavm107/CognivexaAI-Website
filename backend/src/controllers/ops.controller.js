import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import Ticket from '../models/Ticket.model.js';
import Contract from '../models/Contract.model.js';
import Invoice from '../models/Invoice.model.js';
import Alert from '../models/Alert.model.js';
import auditService from '../services/audit.service.js';

/**
 * Enterprise Ops Cockpit Controller
 * Manages operational queues and cross-department orchestration.
 */
export const opsController = {
  /**
   * Get Unified Operational Queues
   */
  getQueues: catchAsync(async (req, res) => {
    const orgId = req.user.clientId;

    // 1. Escalation Queue (SLA breaches & High Severity Alerts)
    const escalations = await Alert.find({
      organizationId: orgId,
      status: { $in: ['active', 'investigating'] },
      severity: { $in: ['high', 'critical'] }
    }).sort({ severity: -1, createdAt: -1 });

    // 2. Pending Approvals Queue (Contracts & Invoices)
    const pendingContracts = await Contract.find({
      organization: orgId,
      status: 'review'
    }).populate('client');

    const pendingInvoices = await Invoice.find({
      organization: orgId,
      status: 'pending'
    }).populate('client');

    // 3. Support Queue (High Priority Unassigned Tickets)
    const supportQueue = await Ticket.find({
      client: orgId,
      status: 'open',
      priority: { $in: ['high', 'critical'] }
    }).sort({ createdAt: 1 });

    res.status(StatusCodes.OK).send({
      success: true,
      data: {
        escalations,
        approvals: {
          contracts: pendingContracts,
          invoices: pendingInvoices
        },
        support: supportQueue
      }
    });
  }),

  /**
   * Get Operational Timeline
   */
  getTimeline: catchAsync(async (req, res) => {
    const orgId = req.user.clientId;
    const { department, severity } = req.query;

    const filters = {};
    if (department) filters.department = department;
    if (severity) filters.severity = severity;

    const timeline = await auditService.getTimeline(orgId, filters);

    res.status(StatusCodes.OK).send({
      success: true,
      data: timeline
    });
  })
};

export default opsController;
