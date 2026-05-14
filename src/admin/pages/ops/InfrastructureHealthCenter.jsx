import React, { useState, useEffect } from 'react';
import { 
  Activity, Database, Wifi, 
  Cpu, HardDrive, Clock,
  AlertTriangle, CheckCircle2,
  BarChart3, Zap, Shield,
  RefreshCw, Terminal, Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/utils';

/**
 * ENTERPRISE INFRASTRUCTURE HEALTH CENTER
 * High-fidelity observability dashboard for real-time system monitoring.
 */
const InfrastructureHealthCenter = () => {
  const [vitals, setVitals] = useState({
    api: { status: 'nominal', latency: '42ms', throughput: '124 req/s' },
    db: { status: 'nominal', connections: 12, iops: '450' },
    redis: { status: 'nominal', hitRate: '98.2%', memory: '1.2GB' },
    queues: { status: 'nominal', active: 3, waiting: 0, failed: 0 },
    system: { cpu: '12%', memory: '45%', uptime: '99.98%' }
  });

  const [activeTraces, setActiveTraces] = useState([
    { id: 'TR-8291', name: 'CRM_DEAL_WON', duration: '1.2s', status: 'success', timestamp: 'Just now' },
    { id: 'TR-8290', name: 'INVOICE_GEN', duration: '450ms', status: 'success', timestamp: '2m ago' },
    { id: 'TR-8289', name: 'AUTH_SESSION', duration: '12ms', status: 'success', timestamp: '5m ago' },
  ]);

  const MetricCard = ({ label, value, icon: Icon, status, detail }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
       <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
             <Icon className="w-6 h-6" />
          </div>
          <span className={cn(
             "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
             status === 'nominal' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
             <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === 'nominal' ? "bg-emerald-500" : "bg-rose-500")} />
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
                <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Infrastructure Monitor</span>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                   <RefreshCw className="w-3 h-3 animate-spin" /> Live Telemetry
                </span>
             </div>
             <h1 className="text-5xl font-black text-slate-900 tracking-tighter">System Health<br />& Observability</h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Trace Explorer
             </button>
          </div>
       </div>

       {/* Core Vitals */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard label="API Latency" value={vitals.api.latency} icon={Wifi} status="nominal" detail={vitals.api.throughput} />
          <MetricCard label="DB Connections" value={vitals.db.connections} icon={Database} status="nominal" detail={`${vitals.db.iops} IOPS`} />
          <MetricCard label="Cache Hit Rate" value={vitals.redis.hitRate} icon={Zap} status="nominal" detail={vitals.redis.memory} />
          <MetricCard label="Queue Lag" value="0.2ms" icon={BarChart3} status="nominal" detail={`${vitals.queues.active} active workers`} />
          <MetricCard label="System Load" value={vitals.system.cpu} icon={Cpu} status="nominal" detail={vitals.system.uptime} />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Distributed Tracing Table */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                      <Shield className="w-5 h-5 text-indigo-600" /> Distributed Traces
                   </h3>
                   <div className="relative">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Filter by Trace ID..." 
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold"
                      />
                   </div>
                </div>
                <div className="divide-y divide-slate-50">
                   {activeTraces.map((trace, i) => (
                     <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                              <CheckCircle2 className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900 tracking-tight uppercase">{trace.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                 {trace.id} • {trace.timestamp}
                              </p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Duration</p>
                              <p className="text-xs font-black text-slate-900">{trace.duration}</p>
                           </div>
                           <button className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                              <ExternalLink className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="p-6 bg-slate-50/50 text-center">
                   <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:tracking-[0.2em] transition-all">
                      View Service Latency Map
                   </button>
                </div>
             </div>
          </div>

          {/* Infrastructure Alerts */}
          <div className="space-y-8">
             <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-200">
                <AlertTriangle className="w-10 h-10 text-amber-400 mb-6" />
                <h3 className="text-2xl font-black tracking-tight mb-4">Infrastructure Integrity</h3>
                <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                   No anomalies detected across 42 active workers. Cluster synchronization is at 100%.
                </p>
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Node Stability</span>
                      <span className="text-emerald-400">99.9%</span>
                   </div>
                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[99.9%] bg-emerald-500" />
                   </div>
                </div>
             </div>

             <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Service Health</h3>
                <div className="space-y-4">
                   {[
                     { name: 'Auth Domain', status: 'healthy' },
                     { name: 'Finance Engine', status: 'healthy' },
                     { name: 'Workflow Orchestrator', status: 'healthy' },
                     { name: 'SLA Guard', status: 'healthy' },
                   ].map((svc, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{svc.name}</span>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default InfrastructureHealthCenter;
