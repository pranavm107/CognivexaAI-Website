import { Queue } from 'bullmq';
import redis from '../config/redis.js';
import logger from '../config/logger.js';

export const createQueue = (name) => {
  const queue = new Queue(name, {
    connection: redis,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });

  queue.on('error', (err) => {
    logger.error(`Queue ${name} error: ${err.message}`);
  });

  return queue;
};
