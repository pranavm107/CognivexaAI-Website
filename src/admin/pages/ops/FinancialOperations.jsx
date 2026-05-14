import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  CreditCard, TrendingUp, DollarSign, 
  ArrowUpRight, ArrowDownRight, ArrowRight, Filter,
  Download, Calendar, BarChart3, PieChart,
  Zap, Clock, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon: Icon, trend, trendType }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
    <div className="flex justify-between items-start mb-6">
       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
          <Icon className="w-6 h-6" />
       </div>
       {trend && (
         <div className={cn(
           "flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
           trendType === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
         )}>
           {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
           {trend}
         </div>
       )}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
  </div>
);

const FinancialOperations = () => {
  const { data: opsData } = useQuery({
    queryKey: ['admin-ops-dashboard'],
    queryFn: adminApi.getOpsDashboard
  });

  const metrics = opsData?.data?.metrics?.revenue;

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Financial Operations</h1>
           <p className="text-slate-500 font-medium mt-1">Enterprise revenue analytics, MRR tracking, and cashflow oversight.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
              <Download className="w-4 h-4" /> Export Ledger
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all">
              Payout Operations
           </button>
        </div>
      </div>

      {/* Primary Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard label="Total Revenue (LTV)" value={`$${(metrics?.total || 0).toLocaleString()}`} icon={DollarSign} trend="+14.2%" trendType="up" />
         <StatCard label="Monthly Recurring (MRR)" value={`$${(metrics?.mrr || 0).toLocaleString()}`} icon={TrendingUp} trend="+8.4%" trendType="up" />
         <StatCard label="Annual Recurring (ARR)" value={`$${(metrics?.arr || 0).toLocaleString()}`} icon={Zap} trend="+12.1%" trendType="up" />
         <StatCard label="Accounts Receivable" value={`$${(metrics?.outstanding || 0).toLocaleString()}`} icon={Clock} trend="-2.4%" trendType="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Revenue Graph Placeholder */}
         <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Revenue Trajectory</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Rolling 30-day performance</p>
               </div>
               <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-xl">
                  {['Revenue', 'Projection', 'Churn'].map((t, i) => (
                    <button key={i} className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", i === 0 ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-900")}>
                       {t}
                    </button>
                  ))}
               </div>
            </div>
            
            <div className="h-80 flex items-end justify-between gap-4 px-4">
               {[40, 65, 45, 90, 55, 75, 40, 85, 95, 60, 45, 80].map((v, i) => (
                 <div key={i} className="flex-1 group relative">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${v}%` }}
                      className="w-full bg-slate-50 group-hover:bg-indigo-600 rounded-t-xl transition-all"
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all">
                       <span className="px-2 py-1 bg-slate-900 text-white rounded text-[10px] font-bold">${v}k</span>
                    </div>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-6 px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
               <span>Jan</span>
               <span>Mar</span>
               <span>May</span>
               <span>Jul</span>
               <span>Sep</span>
               <span>Nov</span>
            </div>
         </div>

         {/* Secondary Stats */}
         <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 tracking-tight mb-8">Financial Health</h3>
               <div className="space-y-6">
                  {[
                    { label: 'Collection Rate', value: '98.2%', icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: 'Net Churn (Monthly)', value: '1.4%', icon: ArrowDownRight, color: 'text-rose-500' },
                    { label: 'Avg Contract Value', value: '$12,450', icon: BarChart3, color: 'text-indigo-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all">
                       <div className="flex items-center gap-4">
                          <div className={cn("w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center", item.color)}>
                             <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                             <h4 className="text-sm font-black text-slate-900">{item.value}</h4>
                          </div>
                       </div>
                       <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-slate-900 transition-colors" />
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-100">
               <h3 className="text-xl font-black tracking-tight mb-4">Q3 Projection</h3>
               <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed">
                  System forecasts a 22% growth in MRR based on current conversion rates and enterprise pipeline velocity.
               </p>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                     <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Est. Revenue</p>
                     <h4 className="text-xl font-black">$2.4M - $2.8M</h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FinancialOperations;
