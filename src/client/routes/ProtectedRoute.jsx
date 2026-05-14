import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useClientAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
  const isAuthenticated = useClientAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/client/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
