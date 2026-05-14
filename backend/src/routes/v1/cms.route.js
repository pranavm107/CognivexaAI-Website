import express from 'express';
import * as cmsController from '../../controllers/cms.controller.js';
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(auth());

// Services
router.get('/services', cmsController.getServices);
router.post('/services', cmsController.createService);
router.patch('/services/:id', cmsController.updateService);
router.delete('/services/:id', cmsController.deleteService);

// Portfolio
router.get('/portfolio', cmsController.getPortfolio);
router.post('/portfolio', cmsController.createPortfolio);
router.patch('/portfolio/:id', cmsController.updatePortfolio);
router.delete('/portfolio/:id', cmsController.deletePortfolio);

// Team
router.get('/team', cmsController.getTeam);
router.post('/team', cmsController.createTeamMember);
router.patch('/team/:id', cmsController.updateTeamMember);
router.delete('/team/:id', cmsController.deleteTeamMember);

// Notifications
router.get('/notifications', cmsController.getNotifications);
router.patch('/notifications/:id/read', cmsController.markNotificationRead);

// Settings
router.get('/settings', cmsController.getSettings);
router.patch('/settings', cmsController.updateSettings);

export default router;
