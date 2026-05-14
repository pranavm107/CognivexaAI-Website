import logger from '../config/logger.js';
import { socketService } from './socket.service.js';

/**
 * INFRASTRUCTURE ANOMALY ENGINE
 * Identifies unusual operational patterns using real-time telemetry.
 */
export const anomalyDetection = {
  /**
   * Analyze Operational Stream
   * @param {Object} metric - Current telemetry point
   * @param {Array} history - Recent historical points
   */
  detect: async (metric, history) => {
    const threshold = 2.5; // Z-score threshold for anomalies
    
    // Simple anomaly detection logic (Placeholder for ML-based scoring)
    const avg = history.reduce((a, b) => a + b, 0) / history.length;
    const stdDev = Math.sqrt(history.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b) / history.length);
    
    const zScore = Math.abs((metric.value - avg) / stdDev);

    if (zScore > threshold) {
      logger.error(`[Anomaly] Detected spike in ${metric.name}: ${metric.value}`);
      
      socketService.broadcastToRoom('admin_infra', 'ANOMALY_DETECTED', {
        metric: metric.name,
        value: metric.value,
        zScore,
        severity: 'high'
      });

      return true;
    }

    return false;
  }
};

export default anomalyDetection;
