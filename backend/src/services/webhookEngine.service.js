import axios from 'axios';
import crypto from 'crypto';
import logger from '../config/logger.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * ENTERPRISE WEBHOOK ENGINE
 * Manages the delivery of real-time events to third-party endpoints.
 */
export const webhookEngine = {
  /**
   * Dispatch a Webhook
   * @param {string} url - Target endpoint
   * @param {string} secret - Signing secret
   * @param {string} event - Event name
   * @param {Object} payload - Event data
   */
  dispatch: async (url, secret, event, payload) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const body = JSON.stringify({ event, payload, timestamp });
    
    // 1. Generate Signature (HMAC-SHA256)
    const signature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    logger.info(`[Webhook] Dispatching ${event} to ${url}`);

    try {
      const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'X-Cognivexa-Event': event,
          'X-Cognivexa-Signature': signature,
          'X-Cognivexa-Timestamp': timestamp
        },
        timeout: 5000
      });

      await AuditLog.create({
        action: 'WEBHOOK_DELIVERED',
        entityType: 'Webhook',
        details: { url, event, status: response.status },
        severity: 'info'
      });

      return { success: true, status: response.status };
    } catch (error) {
      logger.error(`[Webhook] Delivery failed for ${event}:`, error.message);
      
      await AuditLog.create({
        action: 'WEBHOOK_FAILED',
        entityType: 'Webhook',
        details: { url, event, error: error.message },
        severity: 'warning'
      });

      // In production, we'd trigger a retry queue here
      return { success: false, error: error.message };
    }
  }
};

export default webhookEngine;
