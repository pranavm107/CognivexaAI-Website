import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import logger from '../config/logger.js';

/**
 * Tenant Isolation Middleware
 * Ensures every request is scoped to the authenticated user's organization.
 */
export const scopeTenant = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate'));
  }

  // Super admins are global, but can be scoped via a header for impersonation
  if (req.user.role === 'super_admin') {
    const impersonatedTenantId = req.headers['x-tenant-id'];
    if (impersonatedTenantId) {
      req.tenantId = impersonatedTenantId;
      logger.info(`[Tenant] SuperAdmin impersonating tenant: ${impersonatedTenantId}`);
    }
    return next();
  }

  // Regular users are locked to their clientId (Organization)
  if (!req.user.clientId) {
    // If it's an admin user without a clientId, they might be internal staff
    if (req.user.role === 'admin' || req.user.role === 'manager') {
      return next();
    }
    return next(new ApiError(StatusCodes.FORBIDDEN, 'User not associated with any organization'));
  }

  req.tenantId = req.user.clientId;
  next();
};

export default scopeTenant;
