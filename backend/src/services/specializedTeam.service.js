import SpecializedTeam from '../models/SpecializedTeam.model.js';
import { StatusCodes as httpStatus } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

export const createTeam = async (body) => SpecializedTeam.create(body);

export const queryTeams = async (filter) => SpecializedTeam.find(filter).sort({ order: 1 });

export const updateTeam = async (id, body) => {
  const team = await SpecializedTeam.findById(id);
  if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  Object.assign(team, body);
  await team.save();
  return team;
};

export const deleteTeam = async (id) => {
  const team = await SpecializedTeam.findById(id);
  if (!team) throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  await team.deleteOne();
  return team;
};
