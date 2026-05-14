import React, { useState } from 'react';
import { 
  Shield, Scale, FileText, 
  History, Lock, CheckCircle2,
  AlertTriangle, Eye, Download,
  Search, Filter, ExternalLink,
  Users, Database, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/utils';

/**
 * ENTERPRISE COMPLIANCE OPERATIONS CENTER
 * Centralized governance hub for audit readiness, GDPR compliance, and legal hold management.
 */
const ComplianceOperationsCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const auditLogs = [
    { id: 'LOG-9281', action: 'DATA_EXPORT_INITIATED', actor: 'Pranav M.', target: 'Org: Acme Corp', time: '2m ago', severity: 'medium' },
    { id: 'LOG-9280', action: 'PERMISSION_OVERRIDE', actor: 'System Auto', target: 'Role: Admin', time: '15m ago', severity: 'high' },
    { id: 'LOG-9279', action: 'SLA_BREACH_DETECTED', actor: 'SLA Engine', target: 'Project: Delta', time: '1h ago', severity: 'medium' },
  ];

  const MetricCard = ({ label, value, icon: Icon, status, detail }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
       <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
             <Icon className="w-6 h-6" />
          </div>
          <span className={cn(
             "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
             status === 'ready' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
             {status === 'ready' && <CheckCircle2 className="w-3 h-3" />}
             {status}
          </span>
       </div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <div className="flex items-baseline gap-3">
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
          <span className="text-[10px] font-bold text-slate-400">{detail}</span>
       </div>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Governance Platform</span>
                <span className="text-[10px] font-bold text-slate-400">SOC2 Type II • ISO 27001 Ready</span>
             </div>
             <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Compliance<br />& Governance</h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
                <Download className="w-4 h-4 text-slate-400" /> Export Audit Bundle
             </button>
             <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Shield className="w-4 h-4" /> Policy Review
             </button>
          </div>
       </div>

       {/* Governance Metrics */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard label="Compliance Score" value="98%" icon={Shield} status="ready" detail="Nominal" />
          <MetricCard label="Audit Readiness" value="100%" icon={FileText} status="ready" detail="All controls green" />
          <MetricCard label="Data Retention" value="7.2TB" icon={Database} status="ready" detail="Managed policies" />
          <MetricCard label="Risk Exposure" value="Low" icon={AlertTriangle} status="ready" detail="0 Critical Incidents" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Navigation */}
          <div className="lg:col-span-1 space-y-2">
             {[
               { id: 'overview', label: 'Governance Overview', icon: History },
               { id: 'audit', label: 'Audit Log Explorer', icon: Eye },
               { id: 'legal', label: 'Legal Holds', icon: Lock },
               { id: 'gdpr', label: 'GDPR / Privacy', icon: Users },
               { id: 'policies', label: 'Policy Engine', icon: Scale },
             ].map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={cn(
                   "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                   activeTab === item.id ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                 )}
               >
                 <item.icon className="w-4 h-4" />
                 {item.label}
               </button>
             ))}
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                      <History className="w-5 h-5 text-indigo-600" /> Administrative Audit Stream
                   </h3>
                   <div className="relative">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search logs..." 
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold"
                      />
                   </div>
                </div>
                <div className="divide-y divide-slate-50">
                   {auditLogs.map((log, i) => (
                     <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-6">
                           <div className={cn(
                             "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                             log.severity === 'high' ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400"
                           )}>
                              {log.severity === 'high' ? <AlertTriangle className="w-6 h-6" /> : <Database className="w-6 h-6" />}
                           </div>
                           <div>
                              <div className="flex items-center gap-3 mb-1">
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.time} • {log.actor}</p>
                                 <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">ID: {log.id}</span>
                              </div>
                              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                                 {log.action}
                              </h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{log.target}</p>
                           </div>
                        </div>
                        <button className="p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all text-slate-400 hover:text-indigo-600">
                           <ExternalLink className="w-4 h-4" />
                        </button>
                     </div>
                   ))}
                </div>
                <div className="p-8 bg-slate-50 text-center">
                   <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:tracking-[0.2em] transition-all">
                      View Advanced Forensics
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
                   <Lock className="w-10 h-10 text-indigo-400 mb-6" />
                   <h3 className="text-2xl font-black tracking-tight mb-2">Legal Hold</h3>
                   <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                      4 active preservation policies protecting 124 records.
                   </p>
                   <button className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Manage Holds</button>
                </div>
                <div className="bg-emerald-600 p-10 rounded-[3rem] text-white">
                   <Zap className="w-10 h-10 text-emerald-300 mb-6" />
                   <h3 className="text-2xl font-black tracking-tight mb-2">Policy Engine</h3>
                   <p className="opacity-70 text-sm font-medium leading-relaxed mb-8">
                      Automatic enforcement of GDPR and SOC2 standards is active.
                   </p>
                   <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest">Edit Rules</button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ComplianceOperationsCenter;
