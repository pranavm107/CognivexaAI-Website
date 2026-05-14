import logger from '../config/logger.js';
import ActivityLog from '../models/ActivityLog.model.js';
import { socketService } from './socket.service.js';

/**
 * GLOBAL EVENT BUS SERVICE
 * The central nervous system for enterprise event propagation.
 */
export const eventBus = {
  /**
   * Publish an Enterprise Event
   * @param {string} eventName - Standardized event name (e.g., PROJECT_CREATED)
   * @param {Object} payload - Event data
   * @param {Object} context - Execution context (userId, organizationId)
   */
  publish: async (eventName, payload, context = {}) => {
    logger.info(`[EventBus] Publishing: ${eventName}`, { context });

    try {
      // 1. Persist Event for Audit & Replay
      const eventRecord = await ActivityLog.create({
        action: eventName,
        actorId: context.userId,
        clientId: context.organizationId,
        entityType: payload.type || 'Event',
        entityId: payload.id,
        details: payload,
        severity: payload.severity || 'info'
      });

      // 2. Broadcast via WebSockets for Real-time UI Updates
      socketService.broadcastToRoom('admin_global', eventName, {
        ...payload,
        eventRecordId: eventRecord._id,
        timestamp: new Date()
      });

      // 3. Trigger Department-Specific Streams
      if (payload.department) {
        socketService.broadcastToRoom(`dept_${payload.department.toLowerCase()}`, eventName, payload);
      }

      return eventRecord;
    } catch (error) {
      logger.error(`[EventBus] Failure publishing ${eventName}:`, error);
      // In a production system, we'd queue this for retry
      return null;
    }
  },

  /**
   * Subscribe Helper (Placeholder for internal service-to-service logic)
   * In a complex Node environment, this might use EventEmitter or a Message Broker.
   */
  subscribe: (eventName, handler) => {
    logger.info(`[EventBus] New subscriber registered for: ${eventName}`);
    // Internal pub/sub logic would go here
  }
};

export default eventBus;
