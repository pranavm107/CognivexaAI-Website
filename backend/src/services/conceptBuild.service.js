import ConceptBuild from '../models/ConceptBuild.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const createBuild = async (body) => {
  // Validate slug uniqueness
  if (body.slug) {
    const existing = await ConceptBuild.findOne({ slug: body.slug });
    if (existing) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'A concept build with this slug already exists');
    }
  }

  // Validate array formatting
  if (body.engineeringCards && !Array.isArray(body.engineeringCards)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Engineering cards must be a valid array');
  }

  return ConceptBuild.create(body);
};

export const queryBuilds = async (filter) => ConceptBuild.find(filter).sort({ order: 1 });

export const updateBuild = async (id, body) => {
  const build = await ConceptBuild.findById(id);
  if (!build) throw new ApiError(httpStatus.NOT_FOUND, 'Concept build not found');

  // Validate slug uniqueness
  if (body.slug && body.slug !== build.slug) {
    const existing = await ConceptBuild.findOne({ slug: body.slug, _id: { $ne: id } });
    if (existing) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'A concept build with this slug already exists');
    }
  }

  // Validate array formatting
  if (body.engineeringCards && !Array.isArray(body.engineeringCards)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Engineering cards must be a valid array');
  }

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

export const getBuildBySlug = async (slug) => {
  const build = await ConceptBuild.findOne({ slug });
  if (!build) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Concept build not found');
  }
  return build;
};
