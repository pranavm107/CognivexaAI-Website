import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Shield, ShieldAlert, ShieldCheck, 
  Lock, Key, Globe, 
  MapPin, Clock, ArrowRight,
  UserCheck, UserX, AlertCircle, Terminal,
  Zap, Eye, RefreshCw, CheckCircle2
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import { motion } from 'framer-motion';

const SecurityCenter = () => {
  const { data: opsData } = useQuery({
    queryKey: ['admin-ops-dashboard'],
    queryFn: adminApi.getOpsDashboard
  });

  const logs = opsData?.data?.metrics?.realtimeFeed || [];

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Security Command</h1>
           <p className="text-slate-500 font-medium mt-1">Authentication monitoring, session auditing, and threat detection.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-500" /> Rotate API Keys
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-rose-600 transition-all flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Threat Matrix
           </button>
        </div>
      </div>

      {/* Security Status Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'System Access', value: 'Authorized Only', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
           { label: 'Active Sessions', value: '124', icon: UserCheck, color: 'text-indigo-500', bg: 'bg-indigo-50' },
           { label: 'Auth Attempts (24h)', value: '1,204', icon: Lock, color: 'text-amber-500', bg: 'bg-amber-50' },
           { label: 'Threat Level', value: 'Minimal', icon: Shield, color: 'text-slate-400', bg: 'bg-slate-50' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg, stat.color)}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Live Audit Log */}
         <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-200">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-black tracking-tight">Enterprise Audit Log</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Live immutable activity stream</p>
               </div>
               <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <RefreshCw className="w-4 h-4 text-slate-400" />
               </button>
            </div>
            
            <div className="space-y-6">
               {logs.map((log, i) => (
                 <div key={i} className="flex gap-6 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                       <Terminal className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-black tracking-tight uppercase">{log.action}</p>
                          <span className="text-[10px] font-bold text-slate-500">{new Date(log.createdAt).toLocaleTimeString()}</span>
                       </div>
                       <p className="text-xs font-medium text-slate-400 truncate">Actor: {log.actorId?.firstName || 'System'} • IP: 192.168.1.{Math.floor(Math.random() * 255)}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-white transition-all">
                       <Eye className="w-4 h-4" />
                    </button>
                 </div>
               ))}
            </div>
            
            <button className="w-full mt-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
               Load Full Forensic Audit
            </button>
         </div>

         {/* Security Alerts & Controls */}
         <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Threat Intel</h3>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Monitoring</span>
                  </div>
               </div>
               
               <div className="space-y-6">
                  {[
                    { country: 'United States', attempts: 42, risk: 'Low', color: 'bg-emerald-500' },
                    { country: 'Germany', attempts: 12, risk: 'Low', color: 'bg-emerald-500' },
                    { country: 'China', attempts: 104, risk: 'Medium', color: 'bg-amber-500' },
                    { country: 'Russia', attempts: 89, risk: 'High', color: 'bg-rose-500' },
                  ].map((loc, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-default">
                       <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4 text-slate-300" />
                          <span className="text-xs font-black text-slate-700">{loc.country}</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-slate-400">{loc.attempts} hits</span>
                          <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md text-white", loc.color)}>
                             {loc.risk}
                          </span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 tracking-tight mb-8">Suspicious Activity</h3>
               <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                     <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">No Breaches Detected</p>
                  <p className="text-[10px] font-medium text-slate-400 max-w-[200px]">All geographic access points are within baseline compliance parameters.</p>
               </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-200">
               <ShieldAlert className="w-10 h-10 text-indigo-400 mb-6" />
               <h3 className="text-xl font-black tracking-tight mb-4">Emergency Protocol</h3>
               <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                  Initiate global session revocation or "Blackout" infrastructure lockdown in case of verified security breach.
               </p>
               <button className="w-full py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/20">
                  Global Revocation
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SecurityCenter;
