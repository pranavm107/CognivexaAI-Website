import logger from '../config/logger.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * ENTERPRISE ROLLBACK ENGINE
 * Manages compensating transactions for failed multi-step workflows.
 */
export const rollback = {
  /**
   * Execute Compensation for a Workflow
   * @param {string} workflowId - ID of the failed workflow
   * @param {Array} compensations - Array of async functions to revert steps
   */
  compensate: async (workflowId, compensations) => {
    logger.warn(`[Rollback] Initiating compensation for workflow: ${workflowId}`);
    
    const results = [];
    
    for (const task of compensations.reverse()) {
      try {
        logger.info(`[Rollback] Reverting task: ${task.name}`);
        const result = await task.action();
        results.push({ task: task.name, status: 'reverted', result });
      } catch (error) {
        logger.error(`[Rollback] Failed to revert ${task.name}:`, error);
        results.push({ task: task.name, status: 'failed', error: error.message });
      }
    }

    await AuditLog.create({
      action: 'WORKFLOW_ROLLBACK',
      department: 'Global',
      severity: 'warning',
      metadata: { workflowId, rollbackTrace: results }
    });

    return results;
  }
};

export default rollback;
