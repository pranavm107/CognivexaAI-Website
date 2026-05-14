import express from 'express';
import * as analyticsController from '../../controllers/analytics.controller.js';
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(auth());

router.get('/report', analyticsController.getFullReport);
router.get('/bookings-trend', analyticsController.getBookingsTrend);
router.get('/service-demand', analyticsController.getServiceDemand);
router.get('/conversion-funnel', analyticsController.getConversionFunnel);

export default router;
