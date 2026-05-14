import Redis from 'ioredis';
import env from '../config/env.js';
import logger from '../config/logger.js';

const redis = new Redis(env.REDIS_URL || 'redis://localhost:6379');

/**
 * IDEMPOTENCY MIDDLEWARE
 * Ensures that duplicate requests (retries) do not result in duplicate transactions.
 */
const idempotencyMiddleware = async (req, res, next) => {
  const idempotencyKey = req.headers['idempotency-key'];

  if (!idempotencyKey) {
    return next();
  }

  const cacheKey = `idempotency:${idempotencyKey}`;

  try {
    // 1. Check if request was already processed
    const cachedResponse = await redis.get(cacheKey);

    if (cachedResponse) {
      logger.info(`[Idempotency] Duplicate request detected: ${idempotencyKey}`);
      const { statusCode, body } = JSON.parse(cachedResponse);
      return res.status(statusCode).send(body);
    }

    // 2. Intercept res.send to cache the successful response
    const originalSend = res.send;
    res.send = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        redis.set(cacheKey, JSON.stringify({
          statusCode: res.statusCode,
          body
        }), 'EX', 86400); // Cache for 24 hours
      }
      return originalSend.apply(res, arguments);
    };

    next();
  } catch (error) {
    logger.error('[Idempotency] Error:', error);
    next();
  }
};

export default idempotencyMiddleware;
