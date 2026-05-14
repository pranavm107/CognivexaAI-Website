import { v4 as uuidv4 } from 'uuid';
import telemetry from '../services/telemetry.service.js';

/**
 * DISTRIBUTED TRACING MIDDLEWARE
 * Injects correlation IDs and records request/response telemetry.
 */
const tracingMiddleware = async (req, res, next) => {
  const requestId = uuidv4();
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  
  // Inject into request context
  req.requestId = requestId;
  req.correlationId = correlationId;

  // Start tracking duration
  const trace = telemetry.startTrace('http_request', {
    method: req.method,
    path: req.path,
    tenantId: req.headers['x-tenant-id']
  });

  // Set response headers for client-side tracing
  res.setHeader('x-request-id', requestId);
  res.setHeader('x-correlation-id', correlationId);

  // Intercept response finish
  res.on('finish', async () => {
    await trace.end();
    
    // Record Status Code Telemetry
    await telemetry.record('http_response_status', res.statusCode, {
      method: req.method,
      path: req.path,
      requestId
    });
  });

  next();
};

export default tracingMiddleware;
