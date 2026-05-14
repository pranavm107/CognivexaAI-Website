import env from './env.js';

const redisConfig = {
  host: env.REDIS_HOST || '127.0.0.1',
  port: env.REDIS_PORT || 6379,
  password: env.REDIS_PASSWORD || null,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: null, // Essential for BullMQ
};

export default redisConfig;
