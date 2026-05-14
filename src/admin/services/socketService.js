import { io } from 'socket.io-client';
import useAuthStore from '../store/authStore';

let socket;

export const initSocket = () => {
  const token = useAuthStore.getState().accessToken;
  
  if (!token) return null;

  socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:7000', {
    auth: {
      token,
    },
  });

  socket.on('connect', () => {
    console.log('Connected to real-time operations server');
    socket.emit('join-admin-room');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from operations server');
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
