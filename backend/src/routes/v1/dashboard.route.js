import express from 'express';
import * as dashboardController from '../../controllers/dashboard.controller.js';
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/stats', auth(), dashboardController.getStats);

export default router;
