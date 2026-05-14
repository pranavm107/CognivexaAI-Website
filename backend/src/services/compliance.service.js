import Ticket from '../models/Ticket.model.js';
import Contract from '../models/Contract.model.js';
import Client from '../models/Client.model.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

/**
 * Enterprise Compliance Audit Engine
 * Performs autonomous scans for SLA violations and contractual risks.
 */
export const complianceService = {
  /**
   * Run a Full Organizational Compliance Audit
   */
  runAudit: async (organizationId) => {
    const org = await Client.findById(organizationId);
    if (!org) throw new ApiError(StatusCodes.NOT_FOUND, 'Organization not found');

    // 1. SLA Breach Detection (Tickets past deadline)
    const slaViolations = await Ticket.countDocuments({
      client: organizationId,
      status: { $ne: 'resolved' },
      slaDeadline: { $lt: new Date() }
    });

    // 2. Contract Risk (Expiring in < 30 days)
    const expiringContracts = await Contract.countDocuments({
      organization: organizationId,
      endDate: { 
        $gt: new Date(), 
        $lt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
      }
    });

    // 3. Operational Risks (Overdue invoices placeholder logic)
    const operationalRisks = slaViolations > 0 ? 'high' : 'low';

    // 4. Calculate Compliance Score
    const baseScore = 100;
    const penalty = (slaViolations * 10) + (expiringContracts * 5);
    const complianceScore = Math.max(0, baseScore - penalty);

    return {
      organization: org.companyName,
      timestamp: new Date(),
      complianceScore,
      metrics: {
        slaViolations,
        expiringContracts,
        riskLevel: operationalRisks
      },
      recommendations: [
        slaViolations > 0 ? 'Prioritize overdue technical tickets immediately.' : 'No immediate ticket action required.',
        expiringContracts > 0 ? 'Initiate renewal discussions for expiring MSAs/SOWs.' : 'Contract pipeline is stable.'
      ]
    };
  }
};

export default complianceService;
