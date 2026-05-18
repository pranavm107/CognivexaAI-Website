import express from 'express';
import * as conceptBuildController from '../../controllers/conceptBuild.controller.js';

const router = express.Router();

router.route('/')
  .post(conceptBuildController.createBuild)
  .get(conceptBuildController.getBuilds);

router.get('/slug/:slug', conceptBuildController.getBuildBySlug);
router.get('/:slug', conceptBuildController.getBuildBySlug);

router.route('/:id')
  .put(conceptBuildController.updateBuild)
  .delete(conceptBuildController.deleteBuild);

export default router;
