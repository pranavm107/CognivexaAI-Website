import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';
import globalAnalyticsService from '../services/globalAnalytics.service.js';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.model.js';
import Project from '../models/Project.model.js';
import ApiError from '../utils/ApiError.js';
import tokenService from '../services/token.service.js';
import { tokenTypes } from '../config/tokens.js';
import ActivityLog from '../models/ActivityLog.model.js';
import mongoose from 'mongoose';

/**
 * ADMIN COMMAND CENTER
 */
export const getGlobalCommandCenterData = catchAsync(async (req, res) => {
  const [metrics, revenueTrends] = await Promise.all([
    globalAnalyticsService.getGlobalMetrics(),
    globalAnalyticsService.getRevenueTrends(30)
  ]);

  // System Health Simulation (Real-time polling target)
  const systemHealth = {
    api: 'nominal',
    database: 'connected',
    websocket: 'healthy',
    storage: 'nominal',
    latency: '42ms',
    uptime: '99.98%'
  };

  res.send({ 
    success: true, 
    data: { 
      metrics, 
      revenueTrends,
      systemHealth,
      timestamp: new Date()
    } 
  });
});

/**
 * CLIENT MANAGEMENT
 */
export const getAllClients = catchAsync(async (req, res) => {
  const clients = await User.find({ role: 'client', isDeleted: false })
    .select('-password')
    .sort({ createdAt: -1 });
    
  res.send({ success: true, results: clients });
});

/**
 * IMPERSONATION ENGINE
 */
export const impersonateClient = catchAsync(async (req, res) => {
  const { clientId } = req.params;
  const clientUser = await User.findById(clientId);
  
  if (!clientUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Client not found');
  }

  // Generate a temporary impersonation token
  const expires = dayjs().add(1, 'hour');
  const token = tokenService.generateToken(clientUser._id, expires, tokenTypes.ACCESS);

  res.send({ 
    success: true, 
    data: { 
      token, 
      user: clientUser,
      isImpersonation: true
    } 
  });
});

/**
 * PROJECT OPERATIONS
 */
export const getGlobalProjectMonitor = catchAsync(async (req, res) => {
  const projects = await Project.find({ isDeleted: false })
    .populate('client', 'companyName')
    .populate('assignedTeam', 'firstName lastName avatar')
    .sort({ updatedAt: -1 });

  const alerts = projects.filter(p => p.healthScore < 50 || p.riskLevel === 'high');

  res.send({ 
    success: true, 
    data: { 
      projects,
      alertsCount: alerts.length,
      criticalAlerts: alerts
    } 
  });
});

/**
 * ADVANCED ANALYTICS
 */
export const getAdvancedAnalytics = catchAsync(async (req, res) => {
  const retention = await globalAnalyticsService.getRetentionMetrics();
  res.send({ success: true, data: { retention } });
});

/**
 * SECURITY AUDIT
 */
export const getSecurityLogs = catchAsync(async (req, res) => {
  const logs = await ActivityLog.find({ entityType: 'Security' })
    .sort({ createdAt: -1 })
    .limit(100)
    .populate('actorId', 'firstName lastName email');
  
  res.send({ success: true, results: logs });
});

import reportsService from '../services/reports.service.js';

/**
 * REPORT GENERATION
 */
export const downloadReport = catchAsync(async (req, res) => {
  const { type } = req.query;
  let csv;
  let filename;

  switch (type) {
    case 'revenue':
      csv = await reportsService.generateRevenueReport();
      filename = `revenue_audit_${new Date().toISOString().split('T')[0]}.csv`;
      break;
    case 'security':
      csv = await reportsService.generateSecurityReport();
      filename = `security_audit_${new Date().toISOString().split('T')[0]}.csv`;
      break;
    case 'operations':
      csv = await reportsService.generateProjectReport();
      filename = `ops_audit_${new Date().toISOString().split('T')[0]}.csv`;
      break;
    default:
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid report type');
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.status(StatusCodes.OK).send(csv);
});

export const getGlobalActivityFeed = catchAsync(async (req, res) => {
  const logs = await ActivityLog.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('actorId', 'firstName lastName avatar')
    .populate('clientId', 'companyName');
  
  res.send({ success: true, data: logs });
});

export default {
  getGlobalCommandCenterData,
  getAllClients,
  impersonateClient,
  getGlobalProjectMonitor,
  getAdvancedAnalytics,
  getSecurityLogs,
  getGlobalActivityFeed,
  downloadReport
};
