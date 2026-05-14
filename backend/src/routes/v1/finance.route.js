import express from 'express';
import * as financeController from '../../controllers/financialOperations.controller.js';
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(auth('admin'));

router.get('/health', financeController.getFinancialHealth);
router.get('/aging-report', financeController.getAgingReport);

export default router;
