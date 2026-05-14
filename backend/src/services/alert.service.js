import Alert from '../models/Alert.model.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { socketService } from './socket.service.js';

export const alertService = {
  /**
   * Create a Global Operational Alert
   */
  createAlert: async (alertData) => {
    const alert = await Alert.create(alertData);
    
    // Broadcast to specific department and global admins
    socketService.broadcastToRoom(`dept_${alert.department.toLowerCase()}`, 'OPERATIONAL_ALERT', alert);
    socketService.broadcastToRoom('admin_global', 'OPERATIONAL_ALERT', alert);
    
    return alert;
  },

  /**
   * Get Alerts for an Organization
   */
  getAlerts: async (organizationId, filters = {}) => {
    return Alert.find({ organizationId, ...filters })
      .sort({ createdAt: -1 })
      .populate('owner', 'firstName lastName avatar');
  },

  /**
   * Resolve an Alert
   */
  resolveAlert: async (alertId, userId, notes) => {
    const alert = await Alert.findById(alertId);
    if (!alert) throw new ApiError(StatusCodes.NOT_FOUND, 'Alert not found');

    alert.status = 'resolved';
    alert.resolvedAt = new Date();
    alert.owner = userId;
    alert.resolutionNotes = notes;
    await alert.save();

    socketService.broadcastToRoom('admin_global', 'ALERT_RESOLVED', alert);
    
    return alert;
  }
};

export default alertService;
