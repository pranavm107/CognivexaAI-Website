import { StatusCodes } from 'http-status-codes';
import Session from '../models/Session.model.js';
import User from '../models/User.model.js';
import ActivityLog from '../models/ActivityLog.model.js';
import catchAsync from '../utils/catchAsync.js';
import { socketService } from '../services/socket.service.js';

/**
 * SECURITY OPERATIONS CENTER (SOC) CONTROLLER
 */
export const getActiveSessions = catchAsync(async (req, res) => {
  const sessions = await Session.find({ isRevoked: false })
    .populate('userId', 'firstName lastName email avatar role')
    .sort({ createdAt: -1 });

  res.send({ success: true, data: sessions });
});

export const revokeSession = catchAsync(async (req, res) => {
  const { sessionId } = req.params;
  
  const session = await Session.findById(sessionId);
  if (!session) return res.status(StatusCodes.NOT_FOUND).send({ message: 'Session not found' });

  session.isRevoked = true;
  await session.save();

  // Audit
  await ActivityLog.create({
    actorId: req.user._id,
    action: 'SECURITY_SESSION_REVOKED',
    entityType: 'Session',
    entityId: sessionId,
    details: { targetUserId: session.userId }
  });

  // Instant Logout Broadcast
  socketService.to(`user_${session.userId}`, 'FORCE_LOGOUT', {
    sessionId,
    reason: 'Administrative revocation'
  });

  res.send({ success: true, message: 'Session revoked successfully' });
});

export const lockAccount = catchAsync(async (req, res) => {
  const { userId } = req.params;
  
  const user = await User.findById(userId);
  if (!user) return res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found' });

  user.isDeleted = true; // For now, using isDeleted as a lock, but in prod we'd have isLocked
  await user.save();

  // Audit
  await ActivityLog.create({
    actorId: req.user._id,
    action: 'SECURITY_ACCOUNT_LOCKED',
    entityType: 'User',
    entityId: userId,
    details: { email: user.email }
  });

  // Revoke all sessions for this user
  await Session.updateMany({ userId, isRevoked: false }, { isRevoked: true });

  // Broadcast
  socketService.to(`user_${userId}`, 'ACCOUNT_LOCKED');

  res.send({ success: true, message: 'Account locked and all sessions revoked' });
});

export default {
  getActiveSessions,
  revokeSession,
  lockAccount
};
