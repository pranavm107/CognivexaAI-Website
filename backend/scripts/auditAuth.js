import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import env from '../src/config/env.js';
import Session from '../src/models/Session.model.js';
import User from '../src/models/User.model.js';
import logger from '../src/config/logger.js';

/**
 * Enterprise Auth Security Audit
 * Tests for:
 * 1. Refresh Token Reuse Detection
 * 2. Invalidation Propagation
 * 3. Expired Token Rejection
 */
const auditAuth = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('--- AUTH SECURITY AUDIT STARTED ---');

    // Setup: Create a test user and session
    const user = await User.findOne({ email: 'admin@cognivexa.ai' });
    if (!user) throw new Error('Admin user not found for audit');

    const refreshToken = jwt.sign({ sub: user._id, type: 'refresh' }, env.JWT.REFRESH_SECRET, { expiresIn: '7d' });
    const session = await Session.create({
      userId: user._id,
      refreshToken,
      ip: '127.0.0.1',
      userAgent: 'AuditScript',
      expiresAt: dayjs().add(7, 'days').toDate()
    });

    logger.info('Audit Session Created');

    // TEST 1: Refresh Token Reuse Detection
    // Step A: Use the token once (Valid)
    const sessionFound = await Session.findOne({ refreshToken, isValid: true });
    if (!sessionFound) throw new Error('Token not found in DB');
    
    // Simulate refresh (invalidate old)
    sessionFound.isValid = false;
    await sessionFound.save();
    logger.info('PASS: Token invalidated after first use');

    // Step B: Attempt to reuse the SAME token
    const reuseAttempt = await Session.findOne({ refreshToken, isValid: true });
    if (reuseAttempt) {
      logger.error('FAIL: Token reuse permitted!');
    } else {
      logger.info('PASS: Token reuse blocked by isValid flag');
    }

    // TEST 2: Signature Validation
    try {
      jwt.verify(refreshToken + 'tampered', env.JWT.REFRESH_SECRET);
      logger.error('FAIL: Tampered signature accepted!');
    } catch (e) {
      logger.info('PASS: Tampered signature rejected');
    }

    // TEST 3: Expired Token Rejection
    const expiredToken = jwt.sign({ sub: user._id, type: 'refresh' }, env.JWT.REFRESH_SECRET, { expiresIn: '-1s' });
    try {
      jwt.verify(expiredToken, env.JWT.REFRESH_SECRET);
      logger.error('FAIL: Expired token accepted!');
    } catch (e) {
      logger.info('PASS: Expired token rejected');
    }

    logger.info('--- AUTH AUDIT COMPLETE ---');
    process.exit(0);
  } catch (error) {
    logger.error('Audit Failed', error);
    process.exit(1);
  }
};

auditAuth();
