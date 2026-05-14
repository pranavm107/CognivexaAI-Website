import logger from '../config/logger.js';
import enterpriseWorkflow from './enterpriseWorkflow.service.js';
import Project from '../models/Project.model.js';
import Contract from '../models/Contract.model.js';
import Invoice from '../models/Invoice.model.js';
import User from '../models/User.model.js';

/**
 * DEAL CONVERSION ORCHESTRATOR
 * Automates the transition from Sales Opportunity to Operational Entity.
 */
export const dealConversionService = {
  /**
   * Convert Won Opportunity to Project & Tenant
   */
  convertDeal: async (opportunity, actorId) => {
    const steps = [
      {
        name: 'provision_tenant',
        action: async (data) => {
          // If the opportunity client is a placeholder, promote to full organization
          // For now, we assume the User record exists
          return { tenantReady: true };
        }
      },
      {
        name: 'create_initial_contract',
        action: async (data) => {
          const contract = await Contract.create({
            client: opportunity.client,
            title: `MSA: ${opportunity.title}`,
            status: 'draft',
            value: opportunity.value
          });
          return { contractId: contract._id };
        }
      },
      {
        name: 'initialize_project_template',
        action: async (data) => {
          const project = await Project.create({
            name: opportunity.title,
            client: opportunity.client,
            status: 'planning',
            budget: opportunity.value,
            startDate: new Date()
          });
          return { projectId: project._id };
        }
      },
      {
        name: 'generate_initial_invoice',
        action: async (data) => {
          const invoice = await Invoice.create({
            client: opportunity.client,
            amount: opportunity.value * 0.5, // 50% Upfront deposit
            status: 'pending',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          });
          return { invoiceId: invoice._id };
        }
      }
    ];

    return enterpriseWorkflow.execute('DEAL_CONVERSION', steps, {
      opportunityId: opportunity._id,
      clientId: opportunity.client,
      actorId,
      value: opportunity.value
    });
  }
};

export default dealConversionService;
