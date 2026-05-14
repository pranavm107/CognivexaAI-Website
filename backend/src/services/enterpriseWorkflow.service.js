import logger from '../config/logger.js';
import { v4 as uuidv4 } from 'uuid';
import eventBus from './eventBus.service.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * GLOBAL WORKFLOW ORCHESTRATOR
 * Executes chained enterprise operations with state management and failure handling.
 */
export const enterpriseWorkflow = {
  /**
   * Execute a Transactional Workflow
   * @param {string} name - Workflow name (e.g., DEAL_CONVERSION)
   * @param {Array} steps - Array of async functions representing workflow steps
   * @param {Object} initialData - Starting data for the workflow
   */
  execute: async (name, steps, initialData = {}) => {
    const workflowId = uuidv4();
    const timeline = [];
    let currentState = 'initiated';
    let data = { ...initialData };

    logger.info(`[Workflow] ${name} (${workflowId}) started`);

    try {
      // 1. Validation Phase
      currentState = 'validating';
      timeline.push({ state: currentState, timestamp: new Date() });
      
      // 2. Execution Phase
      currentState = 'executing';
      for (const step of steps) {
        logger.info(`[Workflow] ${name} - Executing step: ${step.name}`);
        
        const result = await step.action(data);
        data = { ...data, ...result };
        
        timeline.push({ 
          step: step.name, 
          status: 'completed', 
          timestamp: new Date() 
        });
      }

      currentState = 'completed';
      timeline.push({ state: currentState, timestamp: new Date() });

      // 3. Finalize & Log
      await AuditLog.create({
        organizationId: data.organizationId || data.clientId,
        userId: data.actorId,
        action: `WORKFLOW_${name}_COMPLETED`,
        department: 'Global',
        severity: 'info',
        metadata: { workflowId, timeline }
      });

      await eventBus.publish(`WORKFLOW_${name}_SUCCESS`, { workflowId, data }, { 
        userId: data.actorId, 
        organizationId: data.organizationId 
      });

      return { success: true, workflowId, data };

    } catch (error) {
      logger.error(`[Workflow] ${name} (${workflowId}) failed:`, error);
      
      currentState = 'failed';
      timeline.push({ 
        state: currentState, 
        error: error.message, 
        timestamp: new Date() 
      });

      await eventBus.publish(`WORKFLOW_${name}_FAILURE`, { 
        workflowId, 
        error: error.message,
        partialData: data
      }, { 
        userId: data.actorId, 
        organizationId: data.organizationId,
        severity: 'critical'
      });

      // Trigger compensation logic if available (Phase 3 requirement)
      return { success: false, workflowId, error: error.message, partialData: data };
    }
  }
};

export default enterpriseWorkflow;
