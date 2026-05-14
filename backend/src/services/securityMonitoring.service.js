import ActivityLog from '../models/ActivityLog.model.js';
import User from '../models/User.model.js';
import { emitToAdmin } from './socket.service.js';
import logger from '../config/logger.js';

/**
 * Log a security-related event and broadcast it to the security command center.
 */
const logSecurityEvent = async ({ actorId, action, details, severity = 'info', ip = 'unknown', entityId }) => {
  try {
    const log = await ActivityLog.create({
      actorId,
      action,
      entityType: 'Security',
      entityId,
      details: {
        ...details,
        severity,
        ip,
        timestamp: new Date(),
      },
    });

    // Broadcast to Admin Security Channel
    emitToAdmin('security_event', {
      id: log._id,
      action,
      severity,
      ip,
      timestamp: log.createdAt,
    });

    return log;
  } catch (error) {
    logger.error('Error logging security event:', error);
  }
};

/**
 * Monitor authentication attempts (simulated geolocation for now)
 */
const trackAuthAttempt = async (email, success, ip) => {
  const user = await User.findOne({ email });
  const action = success ? 'AUTH_SUCCESS' : 'AUTH_FAILURE';
  const severity = success ? 'info' : 'warning';

  await logSecurityEvent({
    actorId: user ? user._id : null,
    entityId: user ? user._id : null,
    action,
    severity,
    ip,
    details: {
      email,
      location: 'Simulated Location', // In production, use GeoIP
    }
  });

  if (!success && !user) {
    logger.warn(`Failed login attempt for non-existent user: ${email} from IP: ${ip}`);
  }
};

/**
 * Get recent high-severity security events
 */
const getSecurityAlerts = async (limit = 10) => {
  return ActivityLog.find({ 
    entityType: 'Security',
    'details.severity': { $in: ['warning', 'critical'] }
  })
  .sort({ createdAt: -1 })
  .limit(limit)
  .populate('actorId', 'firstName lastName email');
};

export default {
  logSecurityEvent,
  trackAuthAttempt,
  getSecurityAlerts,
};
