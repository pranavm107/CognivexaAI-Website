import express from 'express';
import * as pricingController from '../../controllers/pricing.controller.js';

const router = express.Router();

router.route('/')
  .get(pricingController.getSmartPackage);

router.route('/:id')
  .put(pricingController.updateSmartPackage);

export default router;
