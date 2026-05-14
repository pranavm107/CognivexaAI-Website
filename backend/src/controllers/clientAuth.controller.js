import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.model.js';
import Client from '../models/Client.model.js';
import tokenService from '../services/token.service.js';
import authService from '../services/auth.service.js';
import ApiError from '../utils/ApiError.js';
import Session from '../models/Session.model.js';
import securityMonitoringService from '../services/securityMonitoring.service.js';
import env from '../config/env.js';

const register = catchAsync(async (req, res) => {
  const { firstName, lastName, email, password, companyName } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already registered');
  }

  // Create Client (Company)
  const client = await Client.create({
    companyName,
    email, // Initial contact email
  });

  // Create User (Client Admin)
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: 'client_admin',
    clientId: client._id,
  });

  const tokens = await tokenService.generateAuthTokens(user, req);

  // Set Refresh Token in Cookie
  res.cookie('refreshToken', tokens.refresh.token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(StatusCodes.CREATED).send({
    success: true,
    message: 'Client registered successfully',
    data: { user, client, accessToken: tokens.access.token },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const user = await authService.loginWithEmailAndPassword(email, password);
    
    if (!['client', 'client_admin'].includes(user.role)) {
      await securityMonitoringService.trackAuthAttempt(email, false, ip);
      throw new ApiError(StatusCodes.FORBIDDEN, 'Access denied. Not a client user.');
    }

    const client = await Client.findById(user.clientId);
    const tokens = await tokenService.generateAuthTokens(user, req);
    
    // Set Refresh Token in Cookie
    res.cookie('refreshToken', tokens.refresh.token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Log success
    await securityMonitoringService.trackAuthAttempt(email, true, ip);

    res.send({
      success: true,
      message: 'Login successful',
      data: { user, client, accessToken: tokens.access.token },
    });
  } catch (error) {
    // Log failure
    await securityMonitoringService.trackAuthAttempt(email, false, ip);
    throw error;
  }
});

const refreshTokens = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Refresh token missing');
  }

  const session = await tokenService.verifyRefreshToken(refreshToken);
  const user = await User.findById(session.userId);
  
  // Revoke old session
  session.isValid = false;
  await session.save();

  // Generate new tokens
  const tokens = await tokenService.generateAuthTokens(user, req);

  // Set new cookie
  res.cookie('refreshToken', tokens.refresh.token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.send({
    success: true,
    message: 'Tokens refreshed',
    data: { accessToken: tokens.access.token },
  });
});

const logout = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await Session.findOneAndUpdate({ refreshToken }, { isValid: false });
  }
  res.clearCookie('refreshToken');
  res.send({ success: true, message: 'Logged out successfully' });
});

export default {
  register,
  login,
  refreshTokens,
  logout
};
