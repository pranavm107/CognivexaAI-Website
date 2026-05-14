import { StatusCodes } from 'http-status-codes';
import User from '../models/User.model.js';
import Project from '../models/Project.model.js';
import catchAsync from '../utils/catchAsync.js';
import ActivityLog from '../models/ActivityLog.model.js';
import { socketService } from '../services/socket.service.js';

/**
 * RESOURCE ALLOCATION CONTROLLER
 */
export const getTeamUtilization = catchAsync(async (req, res) => {
  const team = await User.find({ 
    role: { $in: ['admin', 'manager', 'sales', 'support'] },
    isDeleted: false 
  }).select('firstName lastName avatar department skills utilization availability assignedProjectsCount');

  const stats = {
    totalCapacity: team.length * 100,
    currentUtilization: team.reduce((sum, u) => sum + (u.utilization || 0), 0),
    departmentBreakdown: {}
  };

  team.forEach(u => {
    stats.departmentBreakdown[u.department] = (stats.departmentBreakdown[u.department] || 0) + 1;
  });

  res.send({ success: true, data: { team, stats } });
});

export const allocateResource = catchAsync(async (req, res) => {
  const { userId, projectId, role } = req.body;

  const [user, project] = await Promise.all([
    User.findById(userId),
    Project.findById(projectId)
  ]);

  if (!user || !project) {
    return res.status(StatusCodes.NOT_FOUND).send({ message: 'User or Project not found' });
  }

  // Update Project Staffing
  if (!project.assignedTeam.includes(userId)) {
    project.assignedTeam.push(userId);
    await project.save();
  }

  // Update User Utilization
  user.assignedProjectsCount += 1;
  user.utilization = Math.min(100, user.assignedProjectsCount * 25); // Simple formula: 25% per project
  await user.save();

  // Audit Log
  await ActivityLog.create({
    actorId: req.user._id,
    action: 'RESOURCE_ALLOCATED',
    entityType: 'Project',
    entityId: projectId,
    details: { userId, userName: `${user.firstName} ${user.lastName}`, role }
  });

  // Real-time Update
  socketService.to(`project_${projectId}`, 'RESOURCE_ASSIGNED', {
    userId,
    userName: user.firstName,
    projectId
  });

  socketService.to('admin_global', 'UTILIZATION_UPDATED', {
    userId,
    newUtilization: user.utilization
  });

  res.send({ success: true, message: 'Resource allocated successfully' });
});

export default {
  getTeamUtilization,
  allocateResource
};
