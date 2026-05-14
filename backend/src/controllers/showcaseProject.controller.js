import { StatusCodes as httpStatus } from 'http-status-codes';
import * as showcaseProjectService from '../services/showcaseProject.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const createShowcaseProject = catchAsync(async (req, res) => {
  const project = await showcaseProjectService.createShowcaseProject(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    data: project
  });
});

export const getShowcaseProjects = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) {
    filter.active = req.query.active === 'true';
  }
  const projects = await showcaseProjectService.queryShowcaseProjects(filter, {});
  res.status(httpStatus.OK).json({
    success: true,
    results: projects
  });
});

export const getShowcaseProject = catchAsync(async (req, res) => {
  const project = await showcaseProjectService.getShowcaseProjectById(req.params.id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Showcase Project not found');
  }
  res.status(httpStatus.OK).json({
    success: true,
    data: project
  });
});

export const updateShowcaseProject = catchAsync(async (req, res) => {
  const project = await showcaseProjectService.updateShowcaseProjectById(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    data: project
  });
});

export const deleteShowcaseProject = catchAsync(async (req, res) => {
  await showcaseProjectService.deleteShowcaseProjectById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
