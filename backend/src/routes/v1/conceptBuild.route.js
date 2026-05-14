import express from 'express';
import * as conceptBuildController from '../../controllers/conceptBuild.controller.js';

const router = express.Router();

router.route('/')
  .post(conceptBuildController.createBuild)
  .get(conceptBuildController.getBuilds);

router.route('/:id')
  .put(conceptBuildController.updateBuild)
  .delete(conceptBuildController.deleteBuild);

export default router;
