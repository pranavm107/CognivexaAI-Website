import Incident from '../models/Incident.model.js';
import eventBus from './eventBus.service.js';
import { socketService } from './socket.service.js';

/**
 * ENTERPRISE INCIDENT COMMAND SERVICE
 * Manages the lifecycle and communication of organizational incidents.
 */
export const incidentService = {
  /**
   * Create an Incident
   */
  createIncident: async (incidentData) => {
    const incidentId = 'INC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const incident = await Incident.create({
      ...incidentData,
      incidentId
    });

    await eventBus.publish('INCIDENT_CREATED', incident, {
      organizationId: incident.organizationId,
      severity: incident.severity
    });

    socketService.broadcastToRoom('admin_global', 'NEW_INCIDENT', incident);
    
    return incident;
  },

  /**
   * Update Incident Status
   */
  updateStatus: async (incidentId, status, note, actorId) => {
    const incident = await Incident.findOneAndUpdate(
      { incidentId },
      { 
        status, 
        $push: { 'postmortem.timeline': { timestamp: new Date(), note } } 
      },
      { new: true }
    );

    if (status === 'resolved') {
      incident.resolvedAt = new Date();
      await incident.save();
    }

    await eventBus.publish('INCIDENT_UPDATED', incident, { userId: actorId });
    
    return incident;
  }
};

export default incidentService;
