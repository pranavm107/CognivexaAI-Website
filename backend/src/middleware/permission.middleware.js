import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

const checkPermission = (...requiredPermissions) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate'));
  }

  // Super admins have all permissions
  if (req.user.role === 'super_admin') {
    return next();
  }

  const hasPermission = requiredPermissions.every((permission) => 
    req.user.permissions.includes(permission)
  );

  if (!hasPermission) {
    return next(new ApiError(StatusCodes.FORBIDDEN, 'Insufficient permissions'));
  }

  next();
};

export default checkPermission;
