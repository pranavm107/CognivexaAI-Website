import Redis from 'ioredis';
import logger from '../config/logger.js';
import env from '../config/env.js';

const redis = new Redis(env.REDIS_URL || 'redis://localhost:6379');

/**
 * DISTRIBUTED LOCK SERVICE (REDLOCK PATTERN)
 * Prevents race conditions and duplicate executions in distributed environments.
 */
export const distributedLock = {
  /**
   * Acquire a Mutex Lock
   * @param {string} resource - Unique resource identifier (e.g., invoice_123)
   * @param {number} ttl - Time-to-live in milliseconds
   */
  acquire: async (resource, ttl = 5000) => {
    const lockKey = `lock:${resource}`;
    const token = Math.random().toString(36).substring(2);

    logger.debug(`[Lock] Attempting to acquire: ${lockKey}`);

    // Set with NX (Only if not exists) and PX (Milliseconds TTL)
    const acquired = await redis.set(lockKey, token, 'PX', ttl, 'NX');

    if (acquired === 'OK') {
      logger.info(`[Lock] Acquired: ${lockKey}`);
      return token;
    }

    logger.warn(`[Lock] Failed to acquire: ${lockKey} (Resource busy)`);
    return null;
  },

  /**
   * Release a Mutex Lock
   */
  release: async (resource, token) => {
    const lockKey = `lock:${resource}`;
    
    // Use Lua script to ensure atomicity (Only delete if token matches)
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;

    const result = await redis.eval(script, 1, lockKey, token);
    
    if (result === 1) {
      logger.info(`[Lock] Released: ${lockKey}`);
      return true;
    }

    return false;
  }
};

export default distributedLock;
