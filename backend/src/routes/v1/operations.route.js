import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import resourceController from '../../controllers/resourceAllocation.controller.js';
import deliveryController from '../../controllers/deliveryPipeline.controller.js';
import securityOpsController from '../../controllers/securityOperations.controller.js';

const router = express.Router();

router.use(auth('admin'));

// Resource Allocation
router.get('/resources/utilization', resourceController.getTeamUtilization);
router.post('/resources/allocate', resourceController.allocateResource);

// Delivery Pipeline
router.get('/delivery/pipeline', deliveryController.getDeliveryPipeline);
router.patch('/delivery/phase', deliveryController.updateProjectPhase);

// Security Operations
router.get('/security/sessions', securityOpsController.getActiveSessions);
router.delete('/security/sessions/:sessionId', securityOpsController.revokeSession);
router.post('/security/accounts/:userId/lock', securityOpsController.lockAccount);

export default router;
