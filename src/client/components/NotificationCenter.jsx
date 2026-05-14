import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Bell, X, Check, ExternalLink, 
  Clock, AlertCircle, Info, CheckCircle2,
  Package, CreditCard, MessageSquare
} from 'lucide-react';
import { clientApi } from '../services/api';
import { cn } from '../../admin/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationCenter = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const { data: notificationsData } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => clientApi.getNotifications(),
    enabled: isOpen
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => clientApi.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  const notifications = notificationsData?.results || [];
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type) => {
    switch (type) {
      case 'task': return <Package className="w-4 h-4 text-indigo-600" />;
      case 'billing': return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'meeting': return <Clock className="w-4 h-4 text-amber-600" />;
      case 'mention': return <MessageSquare className="w-4 h-4 text-rose-600" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-100 shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Intelligence Hub</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {unreadCount} UNREAD NOTIFICATIONS
                </p>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-30">
                  <Bell className="w-12 h-12" />
                  <p className="text-sm font-black uppercase tracking-widest">System Clear</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <motion.div 
                    key={n._id}
                    layout
                    className={cn(
                      "p-6 rounded-3xl border border-slate-100 transition-all group relative",
                      n.isRead ? "bg-white opacity-60" : "bg-slate-50 border-indigo-100 shadow-lg shadow-indigo-100/10"
                    )}
                  >
                    {!n.isRead && <div className="absolute top-6 right-6 w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />}
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-black text-slate-900 truncate">{n.title}</h4>
                          <span className="text-[9px] font-bold text-slate-400">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">{n.message}</p>
                        
                        <div className="flex items-center gap-3">
                           {n.metadata?.actionUrl && (
                             <a href={n.metadata.actionUrl} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2">
                               Take Action <ExternalLink className="w-3 h-3" />
                             </a>
                           )}
                           {!n.isRead && (
                             <button 
                               onClick={() => markReadMutation.mutate(n._id)}
                               className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                             >
                               <Check className="w-4 h-4" />
                             </button>
                           )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-8 border-t border-slate-50">
               <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-indigo-100 hover:text-indigo-600 transition-all">
                 Mark All As Read
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
