import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import env from '../config/env.js';
import logger from '../config/logger.js';
import User from '../models/User.model.js';
import ApiError from '../utils/ApiError.js';

const auth = (...requiredRoles) => async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token === 'null' || token === 'undefined' || !token) {
      logger.error(`[Auth] Invalid token format: ${token}`);
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate');
    }

    logger.info(`[Auth] Verifying token for roles: ${requiredRoles}`);

    const payload = jwt.verify(token, env.JWT.ACCESS_SECRET);
    const user = await User.findById(payload.sub);

    if (!user || user.isDeleted) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate');
    }

    // Super Admins bypass role checks
    if (user.role === 'super_admin') {
      req.user = user;
      return next();
    }

    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden');
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error('Auth Middleware Error:', error.message);
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate'));
  }
};

export default auth;
