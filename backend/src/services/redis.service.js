import Redis from 'ioredis';
import env from '../config/env.js';
import logger from '../config/logger.js';

const redisConfig = {
  host: env.REDIS_HOST || '127.0.0.1',
  port: env.REDIS_PORT || 6379,
  password: env.REDIS_PASSWORD || null,
  retryStrategy: () => null, // Stop retries if it fails
  maxRetriesPerRequest: 0,
};

class RedisService {
  constructor() {
    this.isMock = true; // Default to mock
    this.memoryCache = new Map();

    if (env.REDIS_ENABLED === 'true') {
      try {
        this.client = new Redis(redisConfig);
        this.pub = new Redis(redisConfig);
        this.sub = new Redis(redisConfig);

        const handleError = (err) => {
          if (!this.isMock) {
            logger.warn('Redis connection lost. Switched to In-Memory mode.');
            this.isMock = true;
          }
        };

        this.client.on('error', handleError);
        this.pub.on('error', handleError);
        this.sub.on('error', handleError);
        this.isMock = false; // Successfully initialized
      } catch (e) {
        logger.warn('Redis initialization failed. Switched to In-Memory mode.');
      }
    }
  }

  async set(key, value, ttl = 3600) {
    if (this.isMock) {
      this.memoryCache.set(key, value);
      return;
    }
    try {
      const stringValue = JSON.stringify(value);
      await this.client.set(key, stringValue, 'EX', ttl);
    } catch (error) {
      this.memoryCache.set(key, value);
    }
  }

  async get(key) {
    if (this.isMock) return this.memoryCache.get(key);
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return this.memoryCache.get(key);
    }
  }

  async del(key) {
    if (this.isMock) {
      this.memoryCache.delete(key);
      return;
    }
    try {
      await this.client.del(key);
    } catch (error) {}
  }

  async delByPattern(pattern) {
    if (this.isMock) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      for (const key of this.memoryCache.keys()) {
        if (regex.test(key)) this.memoryCache.delete(key);
      }
      return;
    }
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) await this.client.del(...keys);
    } catch (error) {}
  }

  async publish(channel, message) {
    if (this.isMock) return;
    try {
      await this.pub.publish(channel, JSON.stringify(message));
    } catch (error) {}
  }

  async subscribe(channel, callback) {
    if (this.isMock) return;
    try {
      await this.sub.subscribe(channel);
      this.sub.on('message', (ch, msg) => {
        if (ch === channel) callback(JSON.parse(msg));
      });
    } catch (error) {}
  }
}

export default new RedisService();
export { Redis }; // Export for BullMQ usage
