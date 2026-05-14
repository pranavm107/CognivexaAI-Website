import ShowcaseProject from '../models/ShowcaseProject.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const createShowcaseProject = async (projectBody) => {
  return ShowcaseProject.create(projectBody);
};

export const queryShowcaseProjects = async (filter, options) => {
  const projects = await ShowcaseProject.find(filter).sort({ order: 1, createdAt: -1 });
  return projects;
};

export const getShowcaseProjectById = async (id) => {
  return ShowcaseProject.findById(id);
};

export const updateShowcaseProjectById = async (projectId, updateBody) => {
  const project = await getShowcaseProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Showcase Project not found');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

export const deleteShowcaseProjectById = async (projectId) => {
  const project = await getShowcaseProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Showcase Project not found');
  }
  await project.deleteOne();
  return project;
};
