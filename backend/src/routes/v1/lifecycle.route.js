import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import requestController from '../../controllers/projectRequest.controller.js';
import approvalController from '../../controllers/projectApproval.controller.js';
import deliverableController from '../../controllers/deliverableManagement.controller.js';

const router = express.Router();

// Client Actions
router.post('/requests', auth('client'), requestController.submitRequest);
router.get('/requests', auth(), requestController.getRequests);

// Admin Actions
router.post('/requests/:requestId/approve', auth('admin'), approvalController.approveRequest);
router.post('/requests/:requestId/reject', auth('admin'), approvalController.rejectRequest);

// Workflow Actions
router.post('/deliverables/:deliverableId/approve', auth('admin'), deliverableController.approveDeliverable);

export default router;
