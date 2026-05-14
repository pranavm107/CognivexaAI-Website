import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import env from '../config/env.js';
import Session from '../models/Session.model.js';

const generateToken = (userId, expires, type, secret = env.JWT.ACCESS_SECRET) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user, req = null) => {
  const accessTokenExpires = dayjs().add(15, 'minutes');
  const accessToken = generateToken(user._id, accessTokenExpires, 'access');

  const refreshTokenExpires = dayjs().add(7, 'days');
  const refreshToken = generateToken(user._id, refreshTokenExpires, 'refresh', env.JWT.REFRESH_SECRET);

  // Save Session in DB
  await Session.create({
    userId: user._id,
    refreshToken,
    ipAddress: req?.ip || 'unknown',
    userAgent: req?.headers['user-agent'] || 'unknown',
    expiresAt: refreshTokenExpires.toDate()
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const verifyToken = async (token, type) => {
  const secret = type === 'refresh' ? env.JWT.REFRESH_SECRET : env.JWT.ACCESS_SECRET;
  const payload = jwt.verify(token, secret);
  
  if (type === 'refresh') {
    const session = await Session.findOne({ 
      refreshToken: token, 
      userId: payload.sub, 
      isValid: true 
    });
    if (!session) throw new Error('Token not found or invalid');
    return session;
  }
  
  return payload;
};

export default {
  generateToken,
  generateAuthTokens,
  verifyToken
};
