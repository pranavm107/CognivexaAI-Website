import express from 'express';
import taskController from '../../controllers/task.controller.js';
import auth from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(auth()); // All task routes require authentication

router
  .route('/')
  .post(taskController.createTask);

router
  .route('/project/:projectId')
  .get(taskController.getProjectTasks);

router
  .route('/:taskId')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

router
  .route('/:taskId/comments')
  .post(taskController.addComment);

router
  .route('/:taskId/subtasks/:subtaskId')
  .patch(taskController.updateSubtask);

export default router;
