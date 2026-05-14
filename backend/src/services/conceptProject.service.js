import ConceptProject from '../models/ConceptProject.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const createConceptProject = async (projectBody) => {
  return ConceptProject.create(projectBody);
};

export const queryConceptProjects = async (filter, options) => {
  const projects = await ConceptProject.find(filter).sort({ order: 1, createdAt: -1 });
  return projects;
};

export const getConceptProjectById = async (id) => {
  return ConceptProject.findById(id);
};

export const updateConceptProjectById = async (projectId, updateBody) => {
  const project = await getConceptProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Concept Project not found');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

export const deleteConceptProjectById = async (projectId) => {
  const project = await getConceptProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Concept Project not found');
  }
  await project.deleteOne();
  return project;
};
