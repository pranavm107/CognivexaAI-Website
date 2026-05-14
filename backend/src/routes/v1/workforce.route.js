import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import { workforceController } from '../../controllers/workforce.controller.js';

const router = express.Router();

router.use(auth());

router.post('/onboard', workforceController.onboard);
router.get('/team', workforceController.getTeamDirectory);

export default router;
