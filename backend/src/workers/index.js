import { Worker } from 'bullmq';
import redisConfig from '../config/redis.config.js';
import logger from '../config/logger.js';
import globalAnalyticsService from '../services/globalAnalytics.service.js';

/**
 * Analytics Worker
 * Processes background metrics aggregation
 */
const analyticsWorker = new Worker('analytics', async (job) => {
  logger.info(`Processing analytics job: ${job.id}`);
  if (job.name === 'aggregate-metrics') {
    // Re-run global metrics and refresh cache
    await globalAnalyticsService.getGlobalMetrics();
    logger.info('Analytics cache refreshed via background worker');
  }
}, { connection: redisConfig });

/**
 * Notification Worker
 */
const notificationWorker = new Worker('notifications', async (job) => {
  logger.info(`Processing notification job: ${job.id}`);
  // Simulated email/push logic
}, { connection: redisConfig });

/**
 * Payment Reminder Worker
 */
const paymentReminderWorker = new Worker('paymentReminders', async (job) => {
  logger.info(`Processing payment reminder: ${job.id} [Level: ${job.data.level}]`);
  
  // Logic to send actual emails/SMS would go here
  // For now, we broadcast to sockets and log
}, { connection: redisConfig });

/**
 * Error Handling
 */
analyticsWorker.on('failed', (job, err) => {
  logger.error(`Analytics job ${job.id} failed`, err);
});

notificationWorker.on('failed', (job, err) => {
  logger.error(`Notification job ${job.id} failed`, err);
});

paymentReminderWorker.on('failed', (job, err) => {
  logger.error(`Payment reminder job ${job.id} failed`, err);
});

export default {
  analyticsWorker,
  notificationWorker,
  paymentReminderWorker,
};
