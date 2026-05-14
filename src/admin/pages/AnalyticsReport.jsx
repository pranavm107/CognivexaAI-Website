import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, Users, Target, Calendar, ChevronLeft, Download, Filter, 
  ArrowUpRight, Zap, ShieldCheck, Building2, Trophy, Clock, RefreshCw,
  MoreVertical, Mail, Video, AlertCircle, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import { useSocket } from '../hooks/useSocket';

dayjs.extend(relativeTime);

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const AnalyticsReport = () => {
  // useSocket(); // Now handled globally in AdminLayout
  const [range, setRange] = useState('30');
  const queryClient = useQueryClient();
  
  const { data: report, isLoading, isFetching } = useQuery({
    queryKey: ['admin-full-report', range],
    queryFn: () => apiClient.get(`/analytics/report?range=${range}`),
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries(['admin-full-report']);
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-[3px] border-slate-100 rounded-2xl" />
            <div className="absolute top-0 left-0 w-16 h-16 border-[3px] border-indigo-600 border-t-transparent rounded-2xl animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-slate-900 font-black text-sm uppercase tracking-[0.3em]">Operational Intelligence</p>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 animate-pulse">Aggregating Enterprise Metrics...</p>
          </div>
        </div>
      </div>
    );
  }

  const funnel = report?.funnel || { total: 0, qualified: 0, converted: 0, lost: 0 };
  const conversionRate = funnel.total > 0 ? ((funnel.converted / funnel.total) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-700">
      {/* Header Command Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link to="/admin" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase tracking-widest transition-all mb-3 group">
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Control Center
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Business Intelligence</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Sync</span>
            </div>
          </div>
          <p className="text-slate-500 font-medium">Enterprise operational performance and conversion architecture.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className={cn(
              "p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all shadow-sm",
              isFetching && "animate-spin text-indigo-600"
            )}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex bg-white p-1.5 rounded-[1.25rem] border border-slate-200 shadow-sm">
            {[
              { label: '7D', value: '7' },
              { label: '30D', value: '30' },
              { label: '90D', value: '90' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRange(opt.value)}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-black transition-all",
                  range === opt.value ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-400 hover:text-slate-900"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group">
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            EXPORT REPORT
          </button>
        </div>
      </div>

      {/* KPI Command Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Conversion ROI', value: `${conversionRate}%`, sub: 'Inquiry to Meeting', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Revenue Est', value: `$${(report?.revenue || 0).toLocaleString()}`, sub: `+${report?.growth}% Growth`, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Active Pipeline', value: funnel.total, sub: 'Qualified Opportunities', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Service Velocity', value: report?.services?.[0]?.count || 0, sub: `Lead: ${report?.services?.[0]?.name || 'N/A'}`, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all cursor-default group"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500", kpi.bg)}>
              <kpi.icon className={cn("w-7 h-7", kpi.color)} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{kpi.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1.5 tracking-tight">{kpi.value}</h3>
            <div className="flex items-center gap-1.5 mt-3">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Primary Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Area Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-[0.03] scale-150 rotate-12">
            <TrendingUp className="w-64 h-64 text-indigo-600" />
          </div>
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Booking Volume Trend</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">Temporal Operational Analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bookings</span>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={report?.trends || []}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="timestamp" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} 
                  dy={10}
                  tickFormatter={(val) => dayjs(val).format(range === '7' ? 'ddd HH:mm' : 'MMM DD')}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '16px' }}
                  labelStyle={{ fontWeight: 900, color: '#fff', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  itemStyle={{ fontWeight: 700, color: '#818cf8', fontSize: '11px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Realtime Activity Feed */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] rounded-full" />
          
          <div className="flex items-center justify-between mb-8 relative">
            <h3 className="text-lg font-black text-white tracking-tight">Realtime Activity</h3>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto pr-2 custom-scrollbar relative">
            <AnimatePresence mode="popLayout">
              {(report?.activity || []).map((item, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item._id} 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-default group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-[10px]">
                      {item.clientName?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-black text-white truncate">{item.clientName}</p>
                        <p className="text-[9px] font-bold text-slate-500">{dayjs(item.updatedAt).fromNow(true)}</p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-amber-500" />
                        Status changed to <span className="text-indigo-400 uppercase">{item.status}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button className="w-full mt-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
            Open Activity Center
          </button>
        </div>
      </div>

      {/* Advanced Metrics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Service Intelligence */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Service Demand Intelligence</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">Vertical Performance & Conversion</p>
            </div>
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-8">
            {(report?.services || []).map((service, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end mb-3">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{service.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{service.count} Total Opportunities</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-600">{service.rate}%</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</p>
                  </div>
                </div>
                <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${service.rate}%` }}
                    transition={{ duration: 1.5, delay: i * 0.1 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acquisition Funnel */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full opacity-50 blur-3xl" />
          
          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-10">Lifecycle Conversion Funnel</h3>
          
          <div className="relative space-y-4">
            {[
              { label: 'Market Inquiries', value: funnel.total, color: 'bg-slate-900', p: 100 },
              { label: 'Qualified Pipeline', value: funnel.qualified, color: 'bg-indigo-600', p: (funnel.qualified / (funnel.total || 1)) * 100 },
              { label: 'Operational Conversions', value: funnel.converted, color: 'bg-emerald-500', p: (funnel.converted / (funnel.total || 1)) * 100 },
              { label: 'Opportunity Loss', value: funnel.lost, color: 'bg-rose-500', p: (funnel.lost / (funnel.total || 1)) * 100 },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-6"
              >
                <div className="w-32 text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{step.label}</p>
                </div>
                <div className="flex-1 h-14 bg-slate-50 rounded-2xl p-1 relative group cursor-default">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${step.p}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.2 }}
                    className={cn("h-full rounded-xl flex items-center justify-end px-4 transition-shadow group-hover:shadow-lg", step.color)}
                  >
                    <span className="text-white font-black text-xs">{step.value}</span>
                  </motion.div>
                </div>
                <div className="w-16">
                  <p className="text-sm font-black text-slate-900">{step.p.toFixed(0)}%</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-6 p-6 bg-slate-900 rounded-[2rem] text-white">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Operational Strategy</p>
              <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">
                Your funnel shows <span className="text-white font-bold">{conversionRate}% overall conversion</span>. 
                Optimization of the "Proposal Sent" phase could yield an estimated 15% growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;
