import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';
import env from '../config/env.js';
import User from '../models/User.model.js';
import Project from '../models/Project.model.js';
import presenceService from './presence.service.js';

import { createAdapter } from '@socket.io/redis-adapter';
import redisService from './redis.service.js';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Enable Redis Adapter for horizontal scaling (if Redis is available)
  if (!redisService.isMock) {
    const pubClient = redisService.pub;
    const subClient = redisService.sub;
    io.adapter(createAdapter(pubClient, subClient));
    logger.info('Socket.io Redis Adapter Enabled');
  } else {
    logger.warn('Socket.io running with Local Memory Adapter (Redis unavailable)');
  }

  // Authentication Middleware for Sockets
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));

      const payload = jwt.verify(token, env.JWT.ACCESS_SECRET);
      const user = await User.findById(payload.sub);

      if (!user || user.isDeleted) return next(new Error('Authentication error'));

      socket.user = user;
      next();
    } catch (e) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id} (User: ${socket.user?.email})`);
    
    presenceService.handlePresence(socket, io);

    socket.on('join_admin_room', (room) => {
      if (socket.user.role !== 'admin') return; // Strict Admin Check
      const allowedRooms = ['admin_global', 'admin_security', 'admin_finance', 'admin_room'];
      if (allowedRooms.includes(room)) {
        socket.join(room);
      }
    });

    socket.on('join_client', (clientId) => {
      // Only allow if user belongs to this client OR is admin
      if (socket.user.role === 'admin' || socket.user.clientId?.toString() === clientId) {
        socket.join(`client_${clientId}`);
      }
    });

    socket.on('join_project', async (projectId) => {
      // Verify project ownership before joining
      if (socket.user.role === 'admin') {
        socket.join(`project_${projectId}`);
        return;
      }

      const project = await Project.findOne({ _id: projectId, client: socket.user.clientId });
      if (project) {
        socket.join(`project_${projectId}`);
      }
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

export const emitToAdmin = (event, data) => {
  if (io) {
    io.to('admin_room').emit(event, data);
  }
};

export const emitToClient = (clientId, event, data) => {
  if (io) {
    io.to(`client_${clientId}`).emit(event, data);
  }
};

export const emitToProject = (projectId, event, data) => {
  if (io) {
    io.to(`project_${projectId}`).emit(event, data);
  }
};

export const socketService = {
  to: (room, event, data) => {
    if (io) {
      io.to(room).emit(event, data);
    }
  },
  emitToAdmin,
  emitToClient,
  emitToProject
};

export default socketService;
