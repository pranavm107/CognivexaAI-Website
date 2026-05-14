import logger from '../config/logger.js';

/**
 * Presence Management System
 * Tracks which users are online and what they are currently viewing.
 */
const onlineUsers = new Map(); // socketId -> { userId, projectId, isTyping }

const handlePresence = (socket, io) => {
  // Join presence
  socket.on('presence_join', ({ userId, projectId }) => {
    onlineUsers.set(socket.id, { userId, projectId, isTyping: false });
    
    // Broadcast updated presence to the project room
    if (projectId) {
      socket.join(`presence_${projectId}`);
      broadcastProjectPresence(projectId, io);
    }
  });

  // Focus change
  socket.on('presence_focus', ({ projectId }) => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      // Leave old room if exists
      if (user.projectId) socket.leave(`presence_${user.projectId}`);
      
      user.projectId = projectId;
      if (projectId) {
        socket.join(`presence_${projectId}`);
        broadcastProjectPresence(projectId, io);
      }
    }
  });

  // Typing indicators
  socket.on('presence_typing', ({ projectId, isTyping }) => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      user.isTyping = isTyping;
      io.to(`presence_${projectId}`).emit('presence_typing_update', { 
        userId: user.userId, 
        isTyping 
      });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      const { projectId } = user;
      onlineUsers.delete(socket.id);
      if (projectId) {
        broadcastProjectPresence(projectId, io);
      }
    }
  });
};

const broadcastProjectPresence = (projectId, io) => {
  const usersInProject = Array.from(onlineUsers.values())
    .filter(u => u.projectId === projectId)
    .map(u => ({ userId: u.userId, isTyping: u.isTyping }));

  io.to(`presence_${projectId}`).emit('presence_update', usersInProject);
};

export default {
  handlePresence
};
