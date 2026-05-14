import express from 'express';
import validate from '../../middleware/validate.js';
import authController from '../../controllers/auth.controller.js';
import authValidation from '../../validators/auth.validation.js';

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-tokens', authController.refreshTokens);

export default router;
