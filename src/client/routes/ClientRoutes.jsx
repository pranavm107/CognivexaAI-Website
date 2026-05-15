import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Box, MessageSquare, 
  FileText, Settings, Bell, LogOut,
  Sparkles, User, CreditCard, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientAuthStore } from '../store/authStore';
import ProtectedRoute from './ProtectedRoute';
import { cn } from '../../admin/utils/utils';
import NotificationCenter from '../components/NotificationCenter';
import CommandPalette from '../components/CommandPalette';

// Lazy load pages
const ClientLogin = lazy(() => import('../pages/auth/Login'));
const ClientRegister = lazy(() => import('../pages/auth/Register'));
const ClientDashboard = lazy(() => import('../pages/ClientDashboard'));
const Projects = lazy(() => import('../pages/Projects'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const Messages = lazy(() => import('../pages/Messages'));
const Files = lazy(() => import('../pages/Files'));
const Invoices = lazy(() => import('../pages/Invoices'));
const SettingsPage = lazy(() => import('../pages/Settings'));

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group relative",
      active ? "text-indigo-600 bg-indigo-50/50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-900")} />
    {label}
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
      />
    )}
  </Link>
);

const ClientLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, client, logout } = useClientAuthStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/client/login');
  };

  return (
    <div className="min-h-screen bg-white flex text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <NotificationCenter isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      
      {/* Navigation Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-slate-100 bg-white sticky top-0 min-h-[100svh]">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight leading-none uppercase">CognivexaAI</span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Client Workspace</span>
          </div>
        </div>

        <nav className="px-4 space-y-1 flex-1 overflow-y-auto pt-4">
          <div className="px-4 mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">General</span>
          </div>
          <SidebarLink to="/client/dashboard" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/client/dashboard'} />
          <SidebarLink to="/client/projects" icon={Box} label="Projects" active={location.pathname.startsWith('/client/projects')} />
          <SidebarLink to="/client/messages" icon={MessageSquare} label="Messages" active={location.pathname === '/client/messages'} />
          <SidebarLink to="/client/files" icon={FileText} label="Files" active={location.pathname === '/client/files'} />
          
          <div className="px-4 mb-4 mt-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational</span>
          </div>
          <SidebarLink to="/client/invoices" icon={CreditCard} label="Billing" active={location.pathname === '/client/invoices'} />
          <SidebarLink to="/client/settings" icon={Settings} label="Settings" active={location.pathname === '/client/settings'} />
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-50">
          <div className="p-4 rounded-2xl bg-slate-50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 overflow-hidden shadow-sm">
              {user?.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <User className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-wider">{client?.companyName || 'Company'}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
           <div>
             <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
               {location.pathname.split('/').pop().replace(/-/g, ' ')}
             </h2>
           </div>
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsNotificationsOpen(true)}
               className="w-10 h-10 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 relative transition-colors"
             >
               <Bell className="w-5 h-5" />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
             </button>
             <div className="h-8 w-px bg-slate-100"></div>
             <Link to="/client/projects" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black shadow-lg shadow-slate-100 hover:bg-slate-800 transition-all flex items-center gap-2">
               New Project
             </Link>
           </div>
        </header>

        {/* Page Content */}
        <div className="p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const ClientRoutes = () => {
  return (
    <Routes>
      {/* Public Client Routes */}
      <Route path="login" element={<ClientLogin />} />
      <Route path="register" element={<ClientRegister />} />

      {/* Protected Client Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ClientLayout />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="messages" element={<Messages />} />
          <Route path="files" element={<Files />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
