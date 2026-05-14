import ConceptBuild from '../models/ConceptBuild.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const createBuild = async (body) => ConceptBuild.create(body);

export const queryBuilds = async (filter) => ConceptBuild.find(filter).sort({ order: 1 });

export const updateBuild = async (id, body) => {
  const build = await ConceptBuild.findById(id);
  if (!build) throw new ApiError(httpStatus.NOT_FOUND, 'Concept build not found');
  Object.assign(build, body);
  await build.save();
  return build;
};

export const deleteBuild = async (id) => {
  const build = await ConceptBuild.findById(id);
  if (!build) throw new ApiError(httpStatus.NOT_FOUND, 'Concept build not found');
  await build.deleteOne();
  return build;
};
