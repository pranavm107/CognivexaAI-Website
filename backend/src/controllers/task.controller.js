import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync.js';
import Task from '../models/Task.model.js';
import Project from '../models/Project.model.js';
import ApiError from '../utils/ApiError.js';
import { getIO } from '../services/socket.service.js';

const createTask = catchAsync(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    author: req.user._id
  });

  // Emit real-time update
  getIO().to(`project_${task.project}`).emit('task_created', task);

  res.status(StatusCodes.CREATED).send({
    success: true,
    data: task
  });
});

const getProjectTasks = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ project: projectId, isDeleted: false })
    .populate('assignees', 'firstName lastName avatar')
    .sort({ createdAt: -1 });

  res.send({
    success: true,
    results: tasks
  });
});

const updateTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.taskId,
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }

  // Emit real-time update
  getIO().to(`project_${task.project}`).emit('task_updated', task);

  res.send({
    success: true,
    data: task
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.taskId, { isDeleted: true });
  
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }

  // Emit real-time update
  getIO().to(`project_${task.project}`).emit('task_deleted', { taskId: task._id });

  res.status(StatusCodes.NO_CONTENT).send();
});

const addComment = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }

  task.comments.push({
    content,
    author: req.user._id
  });

  await task.save();

  // Emit real-time update
  getIO().to(`project_${task.project}`).emit('task_comment_added', { taskId, comment: task.comments[task.comments.length - 1] });

  res.send({
    success: true,
    data: task.comments
  });
});

const updateSubtask = catchAsync(async (req, res) => {
  const { taskId, subtaskId } = req.params;
  const { completed } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, 'subtasks._id': subtaskId },
    { $set: { 'subtasks.$.completed': completed } },
    { new: true }
  );

  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task or subtask not found');
  }

  getIO().to(`project_${task.project}`).emit('task_updated', task);

  res.send({
    success: true,
    data: task
  });
});

export default {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
  addComment,
  updateSubtask
};
