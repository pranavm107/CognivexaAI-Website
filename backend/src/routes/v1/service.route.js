import express from 'express';
import * as serviceController from '../../controllers/service.controller.js';

const router = express.Router();

router
  .route('/')
  .post(serviceController.createService)
  .get(serviceController.getServices);

router
  .route('/:id')
  .get(serviceController.getService)
  .put(serviceController.updateService)
  .delete(serviceController.deleteService);

export default router;
