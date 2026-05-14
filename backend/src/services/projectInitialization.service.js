import Project from '../models/Project.model.js';
import ProjectRequest from '../models/ProjectRequest.model.js';
import Task from '../models/Task.model.js';
import User from '../models/User.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import { socketService } from './socket.service.js';

/**
 * Enterprise Project Initialization Engine
 * Orchestrates the transition from "Request" to "Live Enterprise Project".
 */
export const projectInitializationService = {
  /**
   * Convert Approved Request to Active Project
   */
  initializeFromRequest: async (requestId, adminId) => {
    const request = await ProjectRequest.findById(requestId);
    if (!request || request.status === 'converted') return null;

    // 1. Create Live Project
    const project = await Project.create({
      title: request.title,
      description: request.requirements,
      category: request.category,
      budget: request.estimatedBudget,
      client: request.client,
      status: 'discovery',
      currentPhase: 'Initialization',
      startDate: new Date(),
      milestones: [
        { title: 'Discovery & Architecture', status: 'active', amount: request.estimatedBudget * 0.2 },
        { title: 'MVP Development', status: 'planned', amount: request.estimatedBudget * 0.5 },
        { title: 'Deployment & UAT', status: 'planned', amount: request.estimatedBudget * 0.3 }
      ]
    });

    // 2. Mark Request as Converted
    request.status = 'converted';
    await request.save();

    // 3. Generate Initial Tasks (AI-driven placeholders for now)
    await projectInitializationService.generatePhaseTasks(project._id, request.type);

    // 4. Auto-allocate Team (Based on department)
    const leadEng = await User.findOne({ department: 'Engineering', role: 'admin' });
    if (leadEng) {
      project.assignedTeam.push(leadEng._id);
      await project.save();
    }

    // 5. Audit & Real-time
    await ActivityLog.create({
      actorId: adminId,
      action: 'PROJECT_CONVERTED',
      entityType: 'Project',
      entityId: project._id,
      clientId: project.client,
      details: { requestId, title: project.title }
    });

    socketService.to(`client_${project.client}`, 'PROJECT_STARTED', {
      projectId: project._id,
      title: project.title
    });

    socketService.to('admin_global', 'PIPELINE_UPDATED', {
      projectId: project._id,
      newStatus: 'discovery'
    });

    return project;
  },

  /**
   * Task Orchestration Logic
   */
  generatePhaseTasks: async (projectId, projectType) => {
    const baseTasks = [
      { title: 'Initial Stakeholder Sync', description: 'Align on project goals' },
      { title: 'Infrastructure Setup', description: 'Provision environments' },
      { title: 'Architecture Review', description: 'Sign off on technical design' }
    ];

    const tasks = baseTasks.map(t => ({
      ...t,
      project: projectId,
      status: 'todo',
      priority: 'high'
    }));

    await Task.insertMany(tasks);
  }
};
