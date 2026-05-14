import AuditLog from '../models/AuditLog.model.js';
import { socketService } from './socket.service.js';

export const auditService = {
  /**
   * Log an Operational Action
   */
  logAction: async (logData) => {
    const log = await AuditLog.create(logData);
    
    // Broadcast to operational timeline
    socketService.broadcastToRoom('admin_ops_timeline', 'NEW_AUDIT_LOG', log);
    
    return log;
  },

  /**
   * Get Organizational Timeline
   */
  getTimeline: async (organizationId, filters = {}, limit = 50) => {
    return AuditLog.find({ organizationId, ...filters })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'firstName lastName avatar');
  }
};

export default auditService;
