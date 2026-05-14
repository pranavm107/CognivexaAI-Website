import logger from '../config/logger.js';
import redisService from '../services/redis.service.js';

/**
 * Enterprise Observability Middleware
 * Tracks API Latency and Request Metrics
 */
const observability = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', async () => {
    const diff = process.hrtime(start);
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    
    const metric = {
      path: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      latency: `${timeInMs}ms`,
      ip: req.ip,
      timestamp: new Date().toISOString()
    };

    // Log to winston
    if (res.statusCode >= 400) {
      logger.error(`API Error: ${req.method} ${req.originalUrl} [${res.statusCode}] - ${timeInMs}ms`);
    } else {
      logger.info(`API Success: ${req.method} ${req.originalUrl} [${res.statusCode}] - ${timeInMs}ms`);
    }

    // Store in Redis for Real-time Dashboard (Last 100 requests)
    try {
      await redisService.client.lpush('system:latency', JSON.stringify(metric));
      await redisService.client.ltrim('system:latency', 0, 99);
    } catch (e) {
      // Ignore redis errors in middleware
    }
  });

  next();
};

export default observability;
