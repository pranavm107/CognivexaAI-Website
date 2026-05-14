import Notification from '../models/Notification.model.js';
import { getIO } from './socket.service.js';
import logger from '../config/logger.js';

/**
 * Enterprise Notification Service
 * Orchestrates multi-channel delivery (Socket.io + Database persistence)
 */
const sendNotification = async (data) => {
  try {
    const notification = await Notification.create(data);
    
    // Emit real-time update via Socket.io
    const io = getIO();
    io.to(`client_${data.recipient}`).emit('new_notification', notification);
    
    // Also emit to the specific user if they are an admin
    io.to('admin_room').emit('new_notification_admin', notification);

    return notification;
  } catch (error) {
    logger.error('Error sending notification:', error);
    return null;
  }
};

const markAsRead = async (notificationId, userId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, recipient: userId },
    { isRead: true, readAt: new Date() },
    { new: true }
  );
};

const getUnreadCount = async (userId) => {
  return Notification.countDocuments({ recipient: userId, isRead: false });
};

export default {
  sendNotification,
  markAsRead,
  getUnreadCount
};
