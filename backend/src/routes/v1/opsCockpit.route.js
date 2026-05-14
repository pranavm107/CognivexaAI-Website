import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import { opsController } from '../../controllers/ops.controller.js';

const router = express.Router();

router.use(auth());

router.get('/queues', opsController.getQueues);
router.get('/timeline', opsController.getTimeline);

export default router;
