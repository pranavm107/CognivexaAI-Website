import express from 'express';
import * as specializedTeamController from '../../controllers/specializedTeam.controller.js';

const router = express.Router();

router.route('/')
  .post(specializedTeamController.createTeam)
  .get(specializedTeamController.getTeams);

router.route('/:id')
  .put(specializedTeamController.updateTeam)
  .delete(specializedTeamController.deleteTeam);

export default router;
