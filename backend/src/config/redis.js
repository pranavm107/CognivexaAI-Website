import Redis from 'ioredis';
import env from './env.js';
import logger from './logger.js';

const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  logger.info('Redis Connected');
});

redis.on('error', (err) => {
  logger.error(`Redis Error: ${err.message}`);
});

export default redis;
