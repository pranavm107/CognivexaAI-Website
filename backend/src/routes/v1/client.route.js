import express from 'express';
import * as clientController from '../../controllers/clientPortal.controller.js';
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(auth()); // Ensure only logged in clients can access

router.get('/dashboard', clientController.getDashboardData);

router.get('/projects', clientController.getClientProjects);
router.get('/projects/:id', clientController.getProjectDetails);
router.post('/projects/request', clientController.requestProject);

router.get('/messages', clientController.getMessages);
router.post('/messages', clientController.sendMessage);

router.get('/files', clientController.getFiles);
router.post('/files/upload', clientController.uploadFile);
router.patch('/projects/:projectId/files/:fileId/approve', clientController.approveFile);
router.patch('/projects/:projectId/files/:fileId/version', clientController.updateFileVersion);

router.get('/invoices', clientController.getInvoices);
router.post('/invoices/:invoiceId/pay', clientController.payInvoice);

router.get('/notifications', clientController.getNotifications);
router.patch('/notifications/:id/read', clientController.markNotificationRead);

router.post('/meetings', clientController.scheduleMeeting);

router.patch('/profile', clientController.updateProfile);
router.patch('/password', clientController.updatePassword);

export default router;
