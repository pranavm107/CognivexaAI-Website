import { StatusCodes as httpStatus } from 'http-status-codes';
import * as conceptBuildService from '../services/conceptBuild.service.js';
import catchAsync from '../utils/catchAsync.js';

export const createBuild = catchAsync(async (req, res) => {
  const build = await conceptBuildService.createBuild(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: build });
});

export const getBuilds = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) filter.active = req.query.active === 'true';
  const builds = await conceptBuildService.queryBuilds(filter);
  res.send({ success: true, results: builds });
});

export const updateBuild = catchAsync(async (req, res) => {
  const build = await conceptBuildService.updateBuild(req.params.id, req.body);
  res.send({ success: true, data: build });
});

export const deleteBuild = catchAsync(async (req, res) => {
  await conceptBuildService.deleteBuild(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
