import { socketService } from './socket.service.js';
import ActivityLog from '../models/ActivityLog.model.js';
import logger from '../config/logger.js';

/**
 * Enterprise Financial Notification Service
 * Dispatches multi-channel alerts for financial events.
 */
export const financialNotificationService = {
  /**
   * Send Overdue Alert
   */
  notifyOverdue: async (invoice, level) => {
    const { _id: invoiceId, client: clientId, invoiceNumber, totalAmount } = invoice;

    // 1. Real-time Socket
    socketService.to(`client_${clientId}`, 'FINANCIAL_ALERT', {
      type: 'OVERDUE',
      invoiceId,
      invoiceNumber,
      level,
      message: `Your payment of ${totalAmount} is ${level.toUpperCase()}.`
    });

    // 2. Admin Real-time
    socketService.to('admin_finance', 'RECOVERY_UPDATE', {
      type: 'OVERDUE_ESCALATION',
      invoiceId,
      clientId,
      level
    });

    // 3. Log Audit
    await ActivityLog.create({
      action: 'FINANCIAL_NOTIFICATION_SENT',
      entityType: 'Invoice',
      entityId: invoiceId,
      clientId,
      details: { channel: 'socket', level }
    });

    logger.info(`Financial notification sent for invoice ${invoiceNumber} [Level: ${level}]`);
  }
};
