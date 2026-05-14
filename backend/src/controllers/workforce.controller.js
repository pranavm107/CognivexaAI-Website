import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.model.js';
import auditService from '../services/audit.service.js';
import { alertService } from '../services/alert.service.js';
import ApiError from '../utils/ApiError.js';

export const workforceController = {
  /**
   * Onboard Employee (Full Workflow)
   */
  onboard: catchAsync(async (req, res) => {
    const { firstName, lastName, email, department, role, designation } = req.body;
    const orgId = req.user.clientId;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already registered');

    // 2. Create Employee
    const employee = await User.create({
      firstName,
      lastName,
      email,
      department,
      role,
      designation,
      clientId: orgId,
      status: 'active',
      isVerified: true // Auto-verify for enterprise onboarding
    });

    // 3. Log Audit Event
    await auditService.logAction({
      organizationId: orgId,
      userId: req.user._id,
      action: 'EMPLOYEE_ONBOARDED',
      department: 'HR',
      severity: 'info',
      metadata: {
        employeeId: employee._id,
        email: employee.email,
        department: employee.department
      }
    });

    // 4. Create Alert for Global Admin
    await alertService.createAlert({
      organizationId: orgId,
      severity: 'low',
      title: 'New Workforce Entry',
      message: `${firstName} ${lastName} has been onboarded to ${department}.`,
      department: 'HR'
    });

    res.status(StatusCodes.CREATED).send({
      success: true,
      message: 'Employee Onboarding Workflow Initiated',
      data: employee
    });
  }),

  /**
   * Get Workforce Team Directory
   */
  getTeamDirectory: catchAsync(async (req, res) => {
    const orgId = req.user.clientId;
    const team = await User.find({ clientId: orgId }).sort({ createdAt: -1 });

    res.status(StatusCodes.OK).send({
      success: true,
      data: team
    });
  }),

  /**
   * Get Workforce Analytics
   */
  getWorkforceAnalytics: catchAsync(async (req, res) => {
    const orgId = req.user.clientId;
    // Placeholder for real analytics logic
    res.status(StatusCodes.OK).send({
      success: true,
      data: {
        totalStaff: 42,
        utilization: 85,
        departmentDistribution: { Engineering: 20, Design: 10, Product: 12 }
      }
    });
  }),

  /**
   * Get Employee Performance
   */
  getEmployeePerformance: catchAsync(async (req, res) => {
    const { userId } = req.params;
    // Placeholder for real performance logic
    res.status(StatusCodes.OK).send({
      success: true,
      data: {
        userId,
        performanceScore: 92,
        completedTasks: 15,
        ongoingProjects: 3
      }
    });
  })
};

export default workforceController;
