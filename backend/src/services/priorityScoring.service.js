import logger from '../config/logger.js';

/**
 * EXECUTIVE PRIORITY SCORING ENGINE
 * Ranks organizational entities based on impact, severity, and operational dependencies.
 */
export const priorityScoring = {
  /**
   * Calculate Priority Score
   * @param {Object} entity - The entity to score
   * @param {string} type - Entity type ('Ticket', 'Project', 'Incident')
   */
  calculate: (entity, type) => {
    let score = 0;
    const factors = [];

    switch (type) {
      case 'Ticket':
        // Base score by priority
        if (entity.priority === 'critical') score += 50;
        else if (entity.priority === 'high') score += 30;
        
        // SLA Proximity
        const hoursRemaining = (new Date(entity.slaDeadline) - new Date()) / (1000 * 60 * 60);
        if (hoursRemaining < 2) score += 40;
        else if (hoursRemaining < 8) score += 20;

        // Client Tier (Assume 1-3)
        if (entity.clientTier === 1) score += 25;
        break;

      case 'Project':
        // Budget Impact
        if (entity.budget > 100000) score += 40;
        
        // Health Score (Inverse)
        score += (100 - (entity.healthScore || 100)) * 0.5;

        // Velocity Lag
        if (entity.velocity < 50) score += 30;
        break;

      case 'Incident':
        // Severity
        if (entity.severity === 'critical') score += 80;
        
        // Affected Clients
        score += (entity.affectedClientsCount || 0) * 10;
        break;
    }

    return {
      totalScore: Math.min(score, 100),
      label: score > 80 ? 'CRITICAL' : score > 50 ? 'HIGH' : 'NORMAL',
      factors
    };
  }
};

export default priorityScoring;
