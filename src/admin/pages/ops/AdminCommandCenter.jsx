import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Zap, Activity, Shield, 
  CreditCard, Users, Box, 
  Search, Terminal, ArrowUpRight,
  Wifi, Database, HardDrive, Cpu,
  Clock, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import WorkforceOnboardingModal from '../../components/WorkforceOnboardingModal';

const StatCard = ({ label, value, icon: Icon, trend, status, color, onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all group cursor-pointer",
      onClick ? "hover:shadow-xl hover:border-indigo-100" : ""
    )}
  >
    <div className="flex justify-between items-start mb-6">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all", color)}>
        <Icon className="w-6 h-6" />
      </div>
      {status && (
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
          status === 'nominal' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === 'nominal' ? "bg-emerald-500" : "bg-rose-500")} />
          {status}
        </span>
      )}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-end gap-3">
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
      {trend && <span className="text-[10px] font-bold text-emerald-500 mb-2">{trend}</span>}
    </div>
  </div>
);

const AdminCommandCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isWorkforceModalOpen, setIsWorkforceModalOpen] = useState(false);

  const { data: opsData, isLoading: isOpsLoading } = useQuery({
    queryKey: ['admin-ops-dashboard'],
    queryFn: () => adminApi.getOpsDashboard(),
    refetchInterval: 5000
  });

  const { data: activityData, isLoading: isActivityLoading } = useQuery({
    queryKey: ['admin-activity-feed'],
    queryFn: () => adminApi.getActivityFeed(),
    refetchInterval: 5000
  });

  const dashboard = opsData?.data;
  const activities = activityData?.data || [];
  const isLoading = isOpsLoading || isActivityLoading;

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Global Command</span>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
              <RefreshCw className={cn("w-3 h-3", isLoading && "animate-spin")} />
              Syncing live operational data
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Operations<br />Cockpit</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2 group">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span className="flex items-center gap-1.5">
               Command <span className="px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-[10px]">Ctrl K</span>
            </span>
          </button>
          <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
            <Terminal className="w-4 h-4" /> System Logs
          </button>
        </div>
      </div>

      {/* System Health Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: Wifi, label: 'API Gateway', status: dashboard?.systemHealth?.api || 'nominal' },
          { icon: Database, label: 'Postgres Cluster', status: 'nominal' },
          { icon: HardDrive, label: 'Redis Cache', status: 'nominal' },
          { icon: Cpu, label: 'Worker Nodes', status: 'nominal' },
          { icon: Shield, label: 'Security Firewall', status: 'nominal' },
          { icon: Clock, label: 'Queue Latency', status: dashboard?.systemHealth?.latency || '42ms', isValue: true },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 group hover:border-indigo-100 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className={cn("text-xs font-black uppercase tracking-tight", item.status === 'nominal' ? "text-emerald-500" : "text-slate-900")}>
                {item.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Global Revenue (ARR)" 
          value={`$${(dashboard?.metrics?.revenue?.arr || 0).toLocaleString()}`} 
          icon={CreditCard} 
          trend="+12.4% vs last month"
          color="bg-emerald-50 text-emerald-600"
          onClick={() => navigate('/admin/finance')}
        />
        <StatCard 
          label="Active Directives" 
          value={dashboard?.metrics?.operations?.activeProjects || 0} 
          icon={Box} 
          trend="89.2% velocity"
          color="bg-indigo-50 text-indigo-600"
          onClick={() => navigate('/admin/projects')}
        />
        <StatCard 
          label="Enterprise Clients" 
          value={dashboard?.metrics?.operations?.activeClients || 0} 
          icon={Users} 
          status="nominal"
          color="bg-amber-50 text-amber-600"
          onClick={() => navigate('/admin/clients')}
        />
        <StatCard 
          label="Global Health Index" 
          value={`${dashboard?.metrics?.operations?.globalHealthScore || 100}%`} 
          icon={Activity} 
          status={dashboard?.metrics?.operations?.globalHealthScore > 80 ? 'nominal' : 'degraded'}
          color="bg-rose-50 text-rose-600"
          onClick={() => navigate('/admin/support')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Real-time Ops Feed */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-indigo-600" /> Live Operational Stream
                 </h3>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Connected</span>
                 </div>
              </div>
              <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
                 {activities.map((log, i) => (
                   <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                            {log.actorId?.avatar ? (
                              <img src={log.actorId.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Activity className="w-4 h-4 text-slate-400" />
                            )}
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-900 tracking-tight uppercase">
                               {log.action.replace(/_/g, ' ')}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                               {log.clientId?.companyName || 'Global System'} • {log.actorId?.firstName} • {new Date(log.createdAt).toLocaleTimeString()}
                            </p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                            Details
                         </span>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-6 bg-slate-50/50 text-center">
                 <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:tracking-[0.2em] transition-all">
                    View Full Audit History
                 </button>
              </div>
           </div>
        </div>

        {/* Side Actions & Infrastructure */}
        <div className="space-y-8">
           <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-200 overflow-hidden relative group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                 <Shield className="w-10 h-10 text-indigo-400 mb-6" />
                 <h3 className="text-2xl font-black tracking-tight mb-4">Security Command</h3>
                 <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                    0 critical security incidents detected in the last 24 hours. Global auth protocols are nominal.
                 </p>
                 <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl">
                    Launch Security Center
                 </button>
              </div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Onboard Employee', icon: Users, color: 'text-emerald-500', onClick: () => setIsWorkforceModalOpen(true) },
                   { label: 'New Project', icon: Box, color: 'text-indigo-500', onClick: () => navigate('/admin/projects') },
                   { label: 'Ops Cockpit', icon: Terminal, color: 'text-slate-900', onClick: () => navigate('/admin/ops/cockpit') },
                   { label: 'Financials', icon: CreditCard, color: 'text-rose-500', onClick: () => navigate('/admin/finance') },
                 ].map((action, i) => (
                    <button 
                      key={i} 
                      onClick={action.onClick}
                      className="p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-indigo-100/30 transition-all group text-center border border-transparent hover:border-slate-100"
                    >
                       <action.icon className={cn("w-6 h-6 mx-auto mb-3 transition-transform group-hover:scale-110", action.color)} />
                       <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{action.label}</span>
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <WorkforceOnboardingModal 
        isOpen={isWorkforceModalOpen} 
        onClose={() => setIsWorkforceModalOpen(false)} 
      />
    </div>
  );
};

export default AdminCommandCenter;
