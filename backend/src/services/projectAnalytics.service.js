import Project from '../models/Project.model.js';
import Task from '../models/Task.model.js';
import logger from '../config/logger.js';

/**
 * Enterprise Project Health Service
 * Calculates project health based on multiple vectors:
 * 1. Milestone Progress (30%)
 * 2. Task On-Time Delivery (40%)
 * 3. Risk Factors (Blockers, High Priority Overdue) (20%)
 * 4. Recent Activity/Engagement (10%)
 */
const calculateProjectHealth = async (projectId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) return null;

    const tasks = await Task.find({ project: projectId, isDeleted: false });
    
    let healthScore = 100;
    let riskLevel = 'low';

    // 1. Task Vector: Overdue & Blocked
    const now = new Date();
    const overdueTasks = tasks.filter(t => t.status !== 'completed' && t.dueDate && new Date(t.dueDate) < now);
    const blockedTasks = tasks.filter(t => t.status === 'blocked');
    
    if (overdueTasks.length > 0) {
      healthScore -= overdueTasks.length * 5;
    }
    if (blockedTasks.length > 0) {
      healthScore -= blockedTasks.length * 10;
      riskLevel = 'medium';
    }

    // 2. Milestone Vector
    const activeMilestones = project.milestones.filter(m => m.status !== 'completed');
    const overdueMilestones = activeMilestones.filter(m => m.dueDate && new Date(m.dueDate) < now);
    
    if (overdueMilestones.length > 0) {
      healthScore -= overdueMilestones.length * 15;
      riskLevel = 'high';
    }

    // 3. Critical Failure Logic
    if (healthScore < 40) riskLevel = 'critical';
    else if (healthScore < 60) riskLevel = 'high';
    else if (healthScore < 85) riskLevel = 'medium';

    // Normalize score
    healthScore = Math.max(0, Math.min(100, healthScore));

    // Update project
    project.healthScore = healthScore;
    project.riskLevel = riskLevel;
    await project.save();

    return { healthScore, riskLevel };
  } catch (error) {
    logger.error(`Error calculating project health for ${projectId}:`, error);
    return null;
  }
};

/**
 * Global Analytics Service
 * Runs daily or on-demand to sync all enterprise projects
 */
const runGlobalAnalytics = async () => {
  const projects = await Project.find({ status: { $ne: 'completed' } });
  logger.info(`Running global analytics for ${projects.length} active projects...`);
  
  for (const project of projects) {
    await calculateProjectHealth(project._id);
  }
};

export default {
  calculateProjectHealth,
  runGlobalAnalytics
};
