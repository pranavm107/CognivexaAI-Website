import PortfolioProject from '../models/PortfolioProject.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const createPortfolioProject = async (projectBody) => {
  return PortfolioProject.create(projectBody);
};

export const queryPortfolioProjects = async (filter, options) => {
  const projects = await PortfolioProject.find(filter).sort({ order: 1, createdAt: -1 });
  return projects;
};

export const getPortfolioProjectById = async (id) => {
  return PortfolioProject.findById(id);
};

export const updatePortfolioProjectById = async (projectId, updateBody) => {
  const project = await getPortfolioProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Portfolio Project not found');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

export const deletePortfolioProjectById = async (projectId) => {
  const project = await getPortfolioProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Portfolio Project not found');
  }
  await project.deleteOne();
  return project;
};
