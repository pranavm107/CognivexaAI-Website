import User from '../models/User.model.js';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

/**
 * Enterprise Permission Service
 * Handles granular RBAC and dynamic policy evaluation.
 */
export const permissionService = {
  /**
   * Evaluates if a user has specific permissions within their organization context.
   */
  hasPermission: (user, requiredPermissions) => {
    if (!user) return false;
    
    // Super Admins bypass all checks
    if (user.role === 'super_admin') return true;
    
    // Standard RBAC check
    return requiredPermissions.every(permission => 
      user.permissions && user.permissions.includes(permission)
    );
  },

  /**
   * Update User Permissions (Admin Only)
   */
  updateUserPermissions: async (userId, permissions) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    
    user.permissions = permissions;
    await user.save();
    return user;
  },

  /**
   * Get Defined Permission Set
   */
  getAvailablePermissions: () => {
    return [
      'manage_projects',
      'manage_invoices',
      'manage_team',
      'manage_support',
      'manage_crm',
      'manage_branding',
      'manage_billing',
      'view_analytics',
      'access_security_logs'
    ];
  }
};

export default permissionService;
