import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import authService from '../services/auth.service.js';
import tokenService from '../services/token.service.js';

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  
  res.send({
    success: true,
    message: 'Login successful',
    data: { user, tokens },
  });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(StatusCodes.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({
    success: true,
    message: 'Tokens refreshed',
    data: { ...tokens },
  });
});

export default {
  login,
  logout,
  refreshTokens,
};
