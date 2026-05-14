import { StatusCodes as httpStatus } from 'http-status-codes';
import * as portfolioProjectService from '../services/portfolioProject.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const createPortfolioProject = catchAsync(async (req, res) => {
  const project = await portfolioProjectService.createPortfolioProject(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    data: project
  });
});

export const getPortfolioProjects = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) {
    filter.active = req.query.active === 'true';
  }
  const projects = await portfolioProjectService.queryPortfolioProjects(filter, {});
  res.status(httpStatus.OK).json({
    success: true,
    results: projects
  });
});

export const getPortfolioProject = catchAsync(async (req, res) => {
  const project = await portfolioProjectService.getPortfolioProjectById(req.params.id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Portfolio Project not found');
  }
  res.status(httpStatus.OK).json({
    success: true,
    data: project
  });
});

export const updatePortfolioProject = catchAsync(async (req, res) => {
  const project = await portfolioProjectService.updatePortfolioProjectById(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    data: project
  });
});

export const deletePortfolioProject = catchAsync(async (req, res) => {
  await portfolioProjectService.deletePortfolioProjectById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
