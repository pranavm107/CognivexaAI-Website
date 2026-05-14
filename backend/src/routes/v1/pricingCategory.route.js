import express from 'express';
import * as pricingController from '../../controllers/pricing.controller.js';

const router = express.Router();

router.route('/')
  .post(pricingController.createCategory)
  .get(pricingController.getCategories);

router.route('/:id')
  .put(pricingController.updateCategory)
  .delete(pricingController.deleteCategory);

export default router;
