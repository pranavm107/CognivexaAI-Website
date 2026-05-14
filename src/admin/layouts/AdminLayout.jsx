import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import CommandMenu from '../components/CommandMenu';
import useAuthStore from '../store/authStore';
import useShortcuts from '../hooks/useShortcuts';
import { useSocket } from '../hooks/useSocket';
import GlobalAlertBar from '../components/GlobalAlertBar';

const AdminLayout = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const _hasHydrated = useAuthStore(state => state._hasHydrated);
  
  useShortcuts();
  useSocket();

  // Wait for session to rehydrate from storage
  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <CommandMenu />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
        <GlobalAlertBar />
      </div>
    </div>
  );
};

export default AdminLayout;
