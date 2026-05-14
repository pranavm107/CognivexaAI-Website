import logger from '../config/logger.js';
import Project from '../models/Project.model.js';
import Ticket from '../models/Ticket.model.js';
import Invoice from '../models/Invoice.model.js';

/**
 * OPERATIONAL RISK INTELLIGENCE ENGINE
 * Predicts operational failures and risks using historical telemetry and entity states.
 */
export const riskIntelligence = {
  /**
   * Calculate Risk for an Organization
   */
  calculateOrgRisk: async (orgId) => {
    logger.info(`[RiskAI] Analyzing operational risk for: ${orgId}`);

    const [projects, tickets, invoices] = await Promise.all([
      Project.find({ client: orgId, status: { $ne: 'completed' } }),
      Ticket.find({ client: orgId, status: 'open' }),
      Invoice.find({ client: orgId, status: 'pending' })
    ]);

    const risks = [];
    let totalScore = 0;

    // 1. Delivery Risk (Project Velocity & Health)
    const criticalProjects = projects.filter(p => p.healthScore < 60);
    if (criticalProjects.length > 0) {
      risks.push({
        type: 'DELIVERY_DELAY',
        severity: 'high',
        description: `${criticalProjects.length} projects are trending below health thresholds.`,
        confidence: 0.85
      });
      totalScore += 40;
    }

    // 2. Financial Risk (Overdue Invoices)
    const overdueInvoices = invoices.filter(i => new Date(i.dueDate) < new Date());
    if (overdueInvoices.length > 0) {
      risks.push({
        type: 'FINANCIAL_RISK',
        severity: 'medium',
        description: `Unpaid capital exposure detected across ${overdueInvoices.length} invoices.`,
        confidence: 0.95
      });
      totalScore += 30;
    }

    // 3. Support Load Risk
    if (tickets.length > 10) {
      risks.push({
        type: 'SUPPORT_OVERLOAD',
        severity: 'medium',
        description: 'Elevated ticket volume detected; potential churn signal.',
        confidence: 0.7
      });
      totalScore += 20;
    }

    return {
      organizationId: orgId,
      overallRiskScore: Math.min(totalScore, 100),
      detectedRisks: risks,
      lastAnalyzed: new Date()
    };
  }
};

export default riskIntelligence;
