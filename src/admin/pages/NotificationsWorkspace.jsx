import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Bell, BellOff, CheckCircle2, AlertCircle, 
  Clock, Zap, ShieldAlert, Mail, MessageSquare,
  Calendar, ArrowRight, Trash2, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import { useSocket } from '../hooks/useSocket';

const NotificationsWorkspace = () => {
  useSocket();
  const queryClient = useQueryClient();

  const { data: result, isLoading } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: () => apiClient.get('/cms/notifications'),
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => apiClient.patch(`/cms/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries(['admin-notifications']),
  });

  const notifications = result?.results || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-center">
              <Bell className="w-8 h-8 text-indigo-600" />
            </div>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white shadow-lg">
                {unreadCount}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notification Center</h1>
            <p className="text-slate-500 font-medium">Real-time operational alerts and system signals.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            Mark all read
          </button>
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <BellOff className="w-16 h-16 text-slate-100 mb-6" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Operational Silence</h3>
            <p className="text-slate-500 mt-2 max-w-xs">Everything is running smooth. New alerts will appear here in real-time.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            <AnimatePresence mode="popLayout">
              {notifications.map((note, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={note._id}
                  className={cn(
                    "p-8 flex items-start gap-6 transition-all group hover:bg-slate-50/50",
                    !note.read && "bg-indigo-50/30"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-110",
                    note.type === 'booking.created' ? "bg-emerald-100 text-emerald-600" :
                    note.type === 'lead.created' ? "bg-indigo-100 text-indigo-600" :
                    "bg-amber-100 text-amber-600"
                  )}>
                    {note.type === 'booking.created' ? <Calendar className="w-6 h-6" /> :
                     note.type === 'lead.created' ? <Zap className="w-6 h-6" /> :
                     <AlertCircle className="w-6 h-6" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{note.type.replace('.', ' ')}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{dayjs(note.createdAt).fromNow()}</span>
                        {!note.read && (
                          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">{note.title}</h3>
                    <p className="text-slate-600 text-sm font-medium mt-1 leading-relaxed">{note.message}</p>
                    
                    <div className="mt-6 flex items-center gap-3">
                      {!note.read && (
                        <button 
                          onClick={() => markReadMutation.mutate(note._id)}
                          className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                        >
                          Archive Alert
                        </button>
                      )}
                      <button className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational Signals Engine v1.0</p>
      </div>
    </div>
  );
};

export default NotificationsWorkspace;
