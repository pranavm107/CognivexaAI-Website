import { StatusCodes as httpStatus } from 'http-status-codes';
import * as specializedTeamService from '../services/specializedTeam.service.js';
import catchAsync from '../utils/catchAsync.js';

export const createTeam = catchAsync(async (req, res) => {
  const team = await specializedTeamService.createTeam(req.body);
  res.status(httpStatus.CREATED).send({ success: true, data: team });
});

export const getTeams = catchAsync(async (req, res) => {
  const filter = {};
  if (req.query.active !== undefined) filter.active = req.query.active === 'true';
  const teams = await specializedTeamService.queryTeams(filter);
  res.send({ success: true, results: teams });
});

export const updateTeam = catchAsync(async (req, res) => {
  const team = await specializedTeamService.updateTeam(req.params.id, req.body);
  res.send({ success: true, data: team });
});

export const deleteTeam = catchAsync(async (req, res) => {
  await specializedTeamService.deleteTeam(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});
