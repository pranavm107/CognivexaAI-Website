import { Queue } from 'bullmq';
import redisConfig from './redis.config.js';

const defaultOptions = {
  connection: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
  },
};

// Initialize Queues
export const analyticsQueue = new Queue('analytics', defaultOptions);
export const notificationQueue = new Queue('notifications', defaultOptions);
export const reportQueue = new Queue('reports', defaultOptions);
export const auditQueue = new Queue('audit', defaultOptions);
export const paymentReminderQueue = new Queue('paymentReminders', defaultOptions);
export const overdueEscalationQueue = new Queue('overdueEscalations', defaultOptions);

export default {
  analyticsQueue,
  notificationQueue,
  reportQueue,
  auditQueue,
};
