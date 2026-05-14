import express from 'express';
import * as portfolioProjectController from '../../controllers/portfolioProject.controller.js';

const router = express.Router();

router
  .route('/')
  .post(portfolioProjectController.createPortfolioProject)
  .get(portfolioProjectController.getPortfolioProjects);

router
  .route('/:id')
  .get(portfolioProjectController.getPortfolioProject)
  .put(portfolioProjectController.updatePortfolioProject)
  .delete(portfolioProjectController.deletePortfolioProject);

export default router;
