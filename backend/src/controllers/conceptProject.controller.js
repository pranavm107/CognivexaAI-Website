import { StatusCodes as httpStatus } from 'http-status-codes';
import * as conceptProjectService from '../services/conceptProject.service.js';
import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const createConceptProject = catchAsync(async (req, res) => {
  const project = await conceptProjectService.createConceptProject(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    data: project
  });
});

export const getConceptProjects = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) {
    filter.active = req.query.active === 'true';
  }
  const projects = await conceptProjectService.queryConceptProjects(filter, {});
  res.status(httpStatus.OK).json({
    success: true,
    results: projects
  });
});

export const getConceptProject = catchAsync(async (req, res) => {
  const project = await conceptProjectService.getConceptProjectById(req.params.id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Concept Project not found');
  }
  res.status(httpStatus.OK).json({
    success: true,
    data: project
  });
});

export const updateConceptProject = catchAsync(async (req, res) => {
  const project = await conceptProjectService.updateConceptProjectById(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    data: project
  });
});

export const deleteConceptProject = catchAsync(async (req, res) => {
  await conceptProjectService.deleteConceptProjectById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
