import express from 'express';
import * as pricingController from '../../controllers/pricing.controller.js';

const router = express.Router();

router.route('/')
  .post(pricingController.createPlan)
  .get(pricingController.getPlans);

router.route('/:id')
  .put(pricingController.updatePlan)
  .delete(pricingController.deletePlan);

export default router;
