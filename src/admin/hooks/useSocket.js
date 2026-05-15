import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:7000';

export const useSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'], // Fallback to polling if websocket fails
    });

    socket.on('connect', () => {
      console.log('✅ Admin connected to real-time operations channel');
      socket.emit('join_admin');
    });

    socket.on('booking_updated', (booking) => {
      console.log('🔄 Booking updated:', booking);
      queryClient.invalidateQueries(['admin-bookings']);
      queryClient.invalidateQueries(['admin-booking', booking._id]);
      queryClient.invalidateQueries(['admin-dashboard-stats']);
      queryClient.invalidateQueries(['admin-full-report']);
    });

    socket.on('new_booking', (booking) => {
      console.log('🔔 New booking received:', booking);
      queryClient.invalidateQueries(['admin-bookings']);
      queryClient.invalidateQueries(['admin-dashboard-stats']);
      queryClient.invalidateQueries(['admin-full-report']);
    });

    socket.on('new_inquiry', (inquiry) => {
      console.log('🔔 New inquiry received:', inquiry);
      queryClient.invalidateQueries(['admin-inquiries']);
      queryClient.invalidateQueries(['admin-dashboard-stats']);
      queryClient.invalidateQueries(['admin-full-report']);
    });

    socket.on('inquiry_updated', (inquiry) => {
      console.log('🔄 Inquiry updated:', inquiry);
      queryClient.invalidateQueries(['admin-inquiries']);
      queryClient.invalidateQueries(['admin-inquiry', inquiry._id]);
      queryClient.invalidateQueries(['admin-full-report']);
    });

    // CMS Real-time Updates
    socket.on('service_updated', () => queryClient.invalidateQueries(['admin-services']));
    socket.on('portfolio_updated', () => queryClient.invalidateQueries(['admin-portfolio']));
    socket.on('team_updated', () => queryClient.invalidateQueries(['admin-team']));
    socket.on('settings_updated', () => queryClient.invalidateQueries(['admin-settings']));
    socket.on('new_notification', () => queryClient.invalidateQueries(['admin-notifications']));

    socket.on('disconnect', () => {
      console.log('❌ Real-time connection lost');
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
};
