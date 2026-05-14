import express from 'express';
import clientAuthController from '../../controllers/clientAuth.controller.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, clientAuthController.register);
router.post('/login', authLimiter, clientAuthController.login);
router.post('/refresh-tokens', authLimiter, clientAuthController.refreshTokens);
router.post('/logout', clientAuthController.logout);

export default router;
