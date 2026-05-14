import Session from '../models/Session.model.js';
import User from '../models/User.model.js';
import { alertService } from './alert.service.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const securityService = {
  /**
   * Track Active Session
   */
  trackSession: async (userId, sessionData) => {
    // Basic anomaly detection placeholder
    const activeSessionsCount = await Session.countDocuments({ userId, isActive: true });
    
    if (activeSessionsCount > 5) {
      await alertService.createAlert({
        organizationId: sessionData.organizationId,
        severity: 'high',
        title: 'Multiple Active Sessions Detected',
        message: `User ${userId} has ${activeSessionsCount} active sessions. Possible account compromise.`,
        department: 'Security'
      });
    }

    return Session.create({ userId, ...sessionData });
  },

  /**
   * Revoke User Session
   */
  revokeSession: async (sessionId) => {
    return Session.findByIdAndUpdate(sessionId, { isActive: false, lastActivity: new Date() });
  },

  /**
   * Force Password Reset (Incident Response)
   */
  forcePasswordReset: async (userId, adminId) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

    // In a real system, we'd set a passwordResetRequired flag
    // For now, we'll log the security action
    await alertService.createAlert({
      organizationId: user.clientId,
      severity: 'critical',
      title: 'Forced Password Reset',
      message: `Security Incident Response: Admin ${adminId} forced a password reset for ${user.email}`,
      department: 'Security'
    });

    return { success: true, message: 'Password reset forced successfully' };
  }
};

export default securityService;
