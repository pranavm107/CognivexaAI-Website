import { StatusCodes } from 'http-status-codes';
import User from '../models/User.model.js';
import Session from '../models/Session.model.js';
import ApiError from '../utils/ApiError.js';
import tokenService from './token.service.js';

const loginWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email, isDeleted: false });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const logout = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Not found');
  }
  await session.deleteOne();
};

const refreshAuth = async (refreshToken) => {
  try {
    const session = await tokenService.verifyToken(refreshToken, 'refresh');
    const user = await User.findById(session.userId);
    if (!user) {
      throw new Error();
    }
    await session.deleteOne();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Please authenticate');
  }
};

export default {
  loginWithEmailAndPassword,
  logout,
  refreshAuth,
};
