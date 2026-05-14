import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  AlertCircle, ShieldAlert, Zap, 
  X, ChevronRight, Bell, Clock,
  CheckCircle2, Info
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../utils/utils';
import { toast } from 'react-hot-toast';

const GlobalAlertBar = () => {
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpanded] = useState(false);

  // In a real system, we'd fetch alerts here
  // For now, let's simulate the active alert queue
  const alerts = [
    { id: 1, severity: 'critical', title: 'SLA Breach Detected', dept: 'Support', time: '2m ago' },
    { id: 2, severity: 'high', title: 'Unusual Login Activity', dept: 'Security', time: '14m ago' },
    { id: 3, severity: 'medium', title: 'Overdue Invoice: #INV-402', dept: 'Finance', time: '1h ago' }
  ];

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-6 animate-in slide-in-from-bottom-8 duration-500">
      <div className={cn(
        "bg-slate-900 text-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden transition-all duration-500",
        isExpanded ? "p-4" : "p-2"
      )}>
        {!isExpanded ? (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-between px-6 py-4 group"
          >
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Bell className="w-5 h-5 text-indigo-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-slate-900" />
               </div>
               <p className="text-sm font-black tracking-tight">
                  <span className="text-rose-500 mr-2 uppercase tracking-widest text-[10px]">{alerts[0].severity}</span>
                  {alerts[0].title}
               </p>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{alerts.length} active alerts</span>
               <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ) : (
          <div className="space-y-4">
             <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Operational Alerts</h4>
                <button onClick={() => setIsExpanded(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                   <X className="w-4 h-4 text-slate-400" />
                </button>
             </div>
             
             <div className="max-h-[300px] overflow-y-auto px-2 space-y-2">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                     <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          alert.severity === 'critical' ? "bg-rose-500/20 text-rose-500" :
                          alert.severity === 'high' ? "bg-amber-500/20 text-amber-500" : "bg-indigo-500/20 text-indigo-500"
                        )}>
                           {alert.severity === 'critical' ? <ShieldAlert className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        </div>
                        <div>
                           <p className="text-xs font-black tracking-tight">{alert.title}</p>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{alert.dept} • {alert.time}</p>
                        </div>
                     </div>
                     <button className="px-4 py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white text-slate-900 transition-all opacity-0 group-hover:opacity-100">
                        Resolve
                     </button>
                  </div>
                ))}
             </div>

             <div className="p-4 text-center">
                <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                   View All Operational Hazards
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalAlertBar;
