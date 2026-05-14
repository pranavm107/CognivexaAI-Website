import logger from '../config/logger.js';
import { socketService } from './socket.service.js';

/**
 * ENTERPRISE TELEMETRY ENGINE
 * Collects and correlates operational metrics across the distributed infrastructure.
 */
export const telemetry = {
  /**
   * Record a Metric
   * @param {string} name - Metric name (e.g., api_latency)
   * @param {number} value - Numeric value
   * @param {Object} tags - Dimensional data (method, route, tenantId)
   */
  record: async (name, value, tags = {}) => {
    const data = {
      name,
      value,
      tags,
      timestamp: new Date()
    };

    // 1. Log for external ingestion (Datadog/Elastic)
    logger.info(`[Telemetry] ${name}: ${value}`, tags);

    // 2. Broadcast to Admin Real-time Health Center
    socketService.broadcastToRoom('admin_infra', 'TELEMETRY_UPDATE', data);
  },

  /**
   * Start Tracing an Operation
   * Returns an object with an end() function to record duration.
   */
  startTrace: (name, tags = {}) => {
    const start = process.hrtime();
    return {
      end: async () => {
        const diff = process.hrtime(start);
        const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
        await telemetry.record(`${name}_duration`, parseFloat(durationMs), tags);
        return durationMs;
      }
    };
  }
};

export default telemetry;
