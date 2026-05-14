import { StatusCodes } from 'http-status-codes';
import Project from '../models/Project.model.js';
import Client from '../models/Client.model.js';
import Task from '../models/Task.model.js';
import Deliverable from '../models/Deliverable.model.js';
import Meeting from '../models/Meeting.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import ApiError from '../utils/ApiError.js';
import { socketService } from './socket.service.js';

/**
 * Enterprise Operational Intelligence Service
 * Orchestrates cross-module relational workflows.
 */
export const enterpriseService = {
  /**
   * Initialize a new Enterprise Project Workspace
   */
  initializeProject: async (adminId, projectData) => {
    const { clientId, title, budget, deadline } = projectData;
    
    const client = await Client.findById(clientId);
    if (!client) throw new ApiError(StatusCodes.NOT_FOUND, 'Client organization not found');

    const project = await Project.create({
      ...projectData,
      status: 'discovery',
      progress: 0,
      currentPhase: 'Initialization'
    });

    // Log Activity
    await ActivityLog.create({
      actorId: adminId,
      action: 'PROJECT_CREATED',
      entityType: 'Project',
      entityId: project._id,
      clientId,
      details: { title, budget }
    });

    // Notify Client via Socket
    socketService.to(`client_${clientId}`, 'PROJECT_INITIALIZED', {
      projectId: project._id,
      title: project.title
    });

    return project;
  },

  /**
   * Advanced Task Orchestration
   */
  createOperationalTask: async (actorId, taskData) => {
    const { project: projectId, title, assignees } = taskData;
    
    const project = await Project.findById(projectId);
    if (!project) throw new ApiError(StatusCodes.NOT_FOUND, 'Project not found');

    const task = await Task.create({
      ...taskData,
      status: 'todo'
    });

    // Update Project Metrics
    await Project.findByIdAndUpdate(projectId, {
      $inc: { taskCount: 1 }
    });

    // Broadcast to Project Room
    socketService.to(`project_${projectId}`, 'TASK_CREATED', {
      taskId: task._id,
      title: task.title,
      assignees
    });

    return task;
  },

  /**
   * Deliverable Approval Workflow
   */
  submitDeliverable: async (clientId, deliverableData) => {
    const deliverable = await Deliverable.create({
      ...deliverableData,
      status: 'under_review'
    });

    // Log for Audit
    await ActivityLog.create({
      action: 'DELIVERABLE_SUBMITTED',
      entityType: 'Deliverable',
      entityId: deliverable._id,
      clientId,
      details: { title: deliverable.title }
    });

    return deliverable;
  },

  /**
   * Real-time Meeting Orchestration
   */
  scheduleEnterpriseMeeting: async (meetingData) => {
    const meeting = await Meeting.create(meetingData);
    
    // Broadcast invite to participants
    meetingData.participants.forEach(userId => {
      socketService.to(`user_${userId}`, 'MEETING_INVITE', {
        meetingId: meeting._id,
        title: meeting.title,
        startTime: meeting.startTime
      });
    });

    return meeting;
  }
};
