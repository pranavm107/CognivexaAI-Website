import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redisService from '../services/redis.service.js';
import logger from '../config/logger.js';

/**
 * Enterprise Rate Limiter
 * Tracks requests by IP and Route in Redis.
 */
const createRateLimiter = (windowMs, max, message) => {
  const options = {
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: message || 'Too many requests, please try again later.',
    },
    handler: (req, res, next, options) => {
      logger.warn(`Rate limit exceeded: ${req.ip} -> ${req.originalUrl}`);
      res.status(options.statusCode).send(options.message);
    },
  };

  // Only use RedisStore if Redis is available
  if (!redisService.isMock) {
    options.store = new RedisStore({
      sendCommand: (...args) => redisService.client.call(...args),
    });
  }

  return rateLimit(options);
};

export const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  10,             // 10 attempts
  'Too many login attempts. Account protected for 15 minutes.'
);

export const apiLimiter = createRateLimiter(
  1 * 60 * 1000,  // 1 minute
  100,            // 100 requests
  'API rate limit exceeded. Please slow down.'
);

export const uploadLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  20,             // 20 uploads
  'Upload limit reached. Please try again in an hour.'
);

export default {
  authLimiter,
  apiLimiter,
  uploadLimiter,
};
