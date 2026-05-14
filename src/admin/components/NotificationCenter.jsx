import React, { useState } from 'react';
import { 
  Bell, Mail, MessageSquare, 
  CheckCircle2, AlertCircle, X,
  Filter, MoreHorizontal, Search,
  ChevronRight, Inbox, Zap, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/utils';

/**
 * ENTERPRISE NOTIFICATION CENTER
 * A centralized, high-fidelity communication hub for organizational alerts and workflow updates.
 */
const NotificationCenter = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Contract Approved', message: 'MSA: Acme Corp - Phase 1 has been signed by the client.', type: 'success', time: '2m ago', read: false },
    { id: 2, title: 'SLA Breach Warning', message: 'Project: Delta v2 is 2 hours away from an SLA violation.', type: 'warning', time: '15m ago', read: false },
    { id: 3, title: 'New Support Escalation', message: 'A critical ticket has been escalated to Engineering.', type: 'error', time: '1h ago', read: true },
    { id: 4, title: 'System Health Update', message: 'Infrastructure cluster synchronization complete.', type: 'info', time: '3h ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 pb-20">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Enterprise Inbox</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                     {unreadCount} NEW MESSAGES
                  </span>
                )}
             </div>
             <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Communication<br />& Orchestration</h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" /> Filter View
             </button>
             <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2">
                Mark All Read
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-2">
                {[
                  { id: 'all', label: 'All Activity', icon: Inbox },
                  { id: 'approvals', label: 'Approvals', icon: CheckCircle2 },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'finance', label: 'Financials', icon: Zap },
                  { id: 'system', label: 'Infrastructure', icon: AlertCircle },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                      filter === item.id ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
             </div>

             <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100">
                <Zap className="w-8 h-8 mb-4 opacity-50" />
                <h4 className="text-xl font-black tracking-tight mb-2">Real-time Sync</h4>
                <p className="text-indigo-100 text-xs font-medium leading-relaxed">
                   Your notification stream is synchronized across all active sessions.
                </p>
             </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
             <AnimatePresence mode="popLayout">
                {notifications.map((notif, i) => (
                  <motion.div
                    key={notif.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    className={cn(
                      "relative p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden cursor-pointer",
                      !notif.read && "border-l-4 border-l-indigo-600"
                    )}
                  >
                     <div className="flex items-start justify-between">
                        <div className="flex items-start gap-6">
                           <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                             notif.type === 'success' ? "bg-emerald-50 text-emerald-600" :
                             notif.type === 'warning' ? "bg-amber-50 text-amber-600" :
                             notif.type === 'error' ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                           )}>
                              {notif.type === 'success' && <CheckCircle2 className="w-6 h-6" />}
                              {notif.type === 'warning' && <AlertCircle className="w-6 h-6" />}
                              {notif.type === 'error' && <X className="w-6 h-6" />}
                              {notif.type === 'info' && <Bell className="w-6 h-6" />}
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notif.time}</span>
                                 {!notif.read && <span className="w-2 h-2 bg-indigo-600 rounded-full" />}
                              </div>
                              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                                 {notif.title}
                              </h3>
                              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xl">
                                 {notif.message}
                              </p>
                           </div>
                        </div>
                        <div className="flex flex-col items-end gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                           <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors">
                              <ChevronRight className="w-5 h-5" />
                           </button>
                           <button className="text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-rose-500 transition-colors">
                              Archive
                           </button>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </AnimatePresence>

             <div className="py-10 text-center">
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 hover:tracking-[0.2em] transition-all">
                   View Notification Archive
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default NotificationCenter;
