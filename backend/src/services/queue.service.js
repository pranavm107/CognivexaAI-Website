import { analyticsQueue, notificationQueue, reportQueue, auditQueue } from '../config/queue.js';
import logger from '../config/logger.js';

class QueueService {
  /**
   * Analytics Jobs
   */
  async addAnalyticsJob(data) {
    await analyticsQueue.add('aggregate-metrics', data);
    logger.info('Analytics job added to queue');
  }

  /**
   * Notification Jobs
   */
  async sendNotification(data) {
    await notificationQueue.add('send-notification', data);
  }

  /**
   * Audit Jobs
   */
  async logAuditEvent(data) {
    await auditQueue.add('process-audit', data);
  }

  /**
   * Report Jobs
   */
  async generateReport(data) {
    await reportQueue.add('generate-pdf', data);
  }
}

export default new QueueService();
