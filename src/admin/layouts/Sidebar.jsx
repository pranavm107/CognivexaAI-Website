import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Zap, 
  Box,
  Users, 
  MessageSquare, 
  CreditCard,
  BarChart3, 
  Shield,
  FileText,
  Package, 
  Briefcase, 
  Bell,
  Settings, 
  LogOut,
  LayoutDashboard,
  Calendar,
  Palette,
  Tag,
  Layout
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import { cn } from '../utils/utils';

const categories = [
  {
    title: 'Home CMS',
    items: [
      { name: 'Concept Builds', icon: Layout, path: '/admin/home/builds' },
    ]
  },
  {
    title: 'About CMS',
    items: [
      { name: 'Specialized Teams', icon: Users, path: '/admin/about/teams' },
    ]
  },
  {
    title: 'Intelligence',
    items: [
      { name: 'Ops Cockpit', icon: Zap, path: '/admin/ops' },
      { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
      { name: 'Security', icon: Shield, path: '/admin/security' },
      { name: 'Reports', icon: FileText, path: '/admin/reports' },
    ]
  },
  {
    title: 'Enterprise',
    items: [
      { name: 'Workforce', icon: Users, path: '/admin/workforce' },
      { name: 'CRM & Sales', icon: Zap, path: '/admin/crm' },
      { name: 'Support', icon: MessageSquare, path: '/admin/support' },
      { name: 'Contracts', icon: Shield, path: '/admin/contracts' },
    ]
  },
  {
    title: 'Commercial',
    items: [
      { name: 'Branding', icon: Palette, path: '/admin/branding' },
      { name: 'Subscription', icon: CreditCard, path: '/admin/subscription' },
      { name: 'Onboarding', icon: Zap, path: '/admin/onboarding' },
    ]
  },
  {
    title: 'Operations',
    items: [
      { name: 'Clients', icon: Users, path: '/admin/clients' },
      { name: 'Projects', icon: Box, path: '/admin/projects' },
      { name: 'Finance', icon: CreditCard, path: '/admin/finance' },
      { name: 'Bookings', icon: Calendar, path: '/admin/bookings' },
      { name: 'Inquiries', icon: MessageSquare, path: '/admin/inquiries' },
    ]
  },
  {
    title: 'Ecosystem',
    items: [
      { name: 'Services', icon: Package, path: '/admin/services' },
      { name: 'Portfolio', icon: Briefcase, path: '/admin/portfolio' },
      { name: 'Pricing', icon: Tag, path: '/admin/pricing' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ]
  }
];

const Sidebar = () => {
  const logout = useAuthStore(state => state.logout);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Cognivexa AI
        </h1>
        <p className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">
          Operations
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-8 overflow-y-auto pt-4">
        {categories.map((category) => (
          <div key={category.title} className="space-y-2">
            <h3 className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              {category.title}
            </h3>
            <div className="space-y-1">
              {category.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200 group",
                    isActive 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn(
                    "w-3.5 h-3.5 transition-colors",
                    "group-hover:scale-110"
                  )} />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
