import express from 'express';
import * as showcaseProjectController from '../../controllers/showcaseProject.controller.js';

const router = express.Router();

router
  .route('/')
  .post(showcaseProjectController.createShowcaseProject)
  .get(showcaseProjectController.getShowcaseProjects);

router
  .route('/:id')
  .get(showcaseProjectController.getShowcaseProject)
  .put(showcaseProjectController.updateShowcaseProject)
  .delete(showcaseProjectController.deleteShowcaseProject);

export default router;
