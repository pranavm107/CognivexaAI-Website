import express from 'express';
import * as adminController from '../../controllers/adminCommandCenter.controller.js';
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

// All routes require admin authentication
router.use(auth('admin'));

router.get('/dashboard', adminController.getGlobalCommandCenterData);
router.get('/clients', adminController.getAllClients);
router.post('/clients/:clientId/impersonate', adminController.impersonateClient);
router.get('/projects/monitor', adminController.getGlobalProjectMonitor);
router.get('/analytics/advanced', adminController.getAdvancedAnalytics);
router.get('/security/logs', adminController.getSecurityLogs);
router.get('/activity', adminController.getGlobalActivityFeed);
router.get('/reports/download', adminController.downloadReport);

export default router;
