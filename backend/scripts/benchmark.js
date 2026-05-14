import axios from 'axios';
import logger from '../src/config/logger.js';

/**
 * Enterprise Performance Benchmark
 * Simulates high-concurrency requests to the core API.
 */
const benchmark = async () => {
  const BASE_URL = 'http://localhost:7000/api/v1';
  const CONCURRENT_REQUESTS = 50;
  
  logger.info(`--- PERFORMANCE BENCHMARK STARTED (${CONCURRENT_REQUESTS} concurrency) ---`);

  const start = Date.now();
  
  try {
    const requests = Array(CONCURRENT_REQUESTS).fill().map(() => 
      axios.get(`${BASE_URL}/public/services`).catch(err => err.response)
    );

    const results = await Promise.all(requests);
    const end = Date.now();

    const successCount = results.filter(r => r && r.status === 200).length;
    const avgLatency = (end - start) / CONCURRENT_REQUESTS;

    logger.info(`Total Requests: ${CONCURRENT_REQUESTS}`);
    logger.info(`Successful: ${successCount}`);
    logger.info(`Average Latency: ${avgLatency.toFixed(2)}ms`);
    logger.info(`Total Time: ${end - start}ms`);

    if (avgLatency > 100) {
      logger.warn('WARNING: Average latency exceeded 100ms baseline.');
    } else {
      logger.info('PASS: Latency within enterprise parameters.');
    }
  } catch (error) {
    logger.error('Benchmark Error', error);
  }

  logger.info('--- BENCHMARK COMPLETE ---');
  process.exit(0);
};

benchmark();
