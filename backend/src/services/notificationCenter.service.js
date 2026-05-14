import logger from '../config/logger.js';
import { socketService } from './socket.service.js';
import webhookEngine from './webhookEngine.service.js';

/**
 * UNIFIED NOTIFICATION INFRASTRUCTURE
 * Orchestrates multi-channel delivery of organizational alerts and communications.
 */
export const notificationCenter = {
  /**
   * Send Notification
   * @param {Object} options - { userId, title, message, severity, channels: ['in-app', 'email'] }
   */
  send: async (options) => {
    const { userId, title, message, severity = 'info', channels = ['in-app'], metadata = {} } = options;

    logger.info(`[Notification] Sending to ${userId} via ${channels.join(', ')}`);

    const results = [];

    // 1. In-App (Real-time WebSockets)
    if (channels.includes('in-app')) {
      socketService.sendToUser(userId, 'NEW_NOTIFICATION', {
        title,
        message,
        severity,
        metadata,
        timestamp: new Date()
      });
      results.push('in-app');
    }

    // 2. Email (Placeholder for SES/SendGrid)
    if (channels.includes('email')) {
      logger.debug(`[Notification] Dispatching email to user: ${userId}`);
      results.push('email');
    }

    // 3. External Webhooks (Integrations)
    if (channels.includes('webhook') && options.webhookUrl) {
      await webhookEngine.dispatch(options.webhookUrl, options.webhookSecret, 'NOTIFICATION_RECEIVED', { title, message });
      results.push('webhook');
    }

    return { success: true, deliveredVia: results };
  }
};

export default notificationCenter;
