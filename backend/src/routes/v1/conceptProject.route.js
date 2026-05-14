import express from 'express';
import * as conceptProjectController from '../../controllers/conceptProject.controller.js';

const router = express.Router();

router
  .route('/')
  .post(conceptProjectController.createConceptProject)
  .get(conceptProjectController.getConceptProjects);

router
  .route('/:id')
  .get(conceptProjectController.getConceptProject)
  .put(conceptProjectController.updateConceptProject)
  .delete(conceptProjectController.deleteConceptProject);

export default router;
