import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  FileText, ShieldCheck, Calendar, 
  Download, Plus, AlertCircle,
  ArrowUpRight, DollarSign, Clock,
  CheckCircle2, History
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';

const ContractWorkspace = () => {
  // In a real app, this would fetch from a specific contract endpoint
  // Using generic ops dashboard for now
  const { data: opsData } = useQuery({
    queryKey: ['admin-ops-dashboard'],
    queryFn: () => adminApi.getOpsDashboard()
  });

  const metrics = opsData?.data?.metrics?.revenue;

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Contracts & SLA</h1>
           <p className="text-slate-500 font-medium mt-1">Enterprise legal lifecycles and compliance orchestration.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> Draft Agreement
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Compliance Audit
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Active MSA', value: '12', icon: ShieldCheck, color: 'text-indigo-600' },
           { label: 'Pending Renewal', value: '4', icon: History, color: 'text-amber-600' },
           { label: 'SLA Uptime', value: '99.99%', icon: CheckCircle2, color: 'text-emerald-600' },
           { label: 'Total LTV', value: '$2.4M', icon: DollarSign, color: 'text-slate-900' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 mb-4", stat.color)}>
                 <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Agreements</h3>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sort by expiry</span>
               </div>
            </div>
            <div className="divide-y divide-slate-50">
               {[
                 { id: 'MSA-2026-001', title: 'Master Service Agreement', client: 'Aetheris Global', value: '$500,000', status: 'Active', expiry: 'Jan 2027' },
                 { id: 'SOW-2026-AI-01', title: 'Enterprise AI Implementation', client: 'Aetheris Global', value: '$150,000', status: 'Active', expiry: 'Jun 2026' },
               ].map((c, i) => (
                 <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                          <FileText className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{c.id}</p>
                          <h4 className="text-base font-black text-slate-900 tracking-tight">{c.title}</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">{c.client} • {c.value}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expires {c.expiry}</span>
                       <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                          View PDF
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">
               <AlertCircle className="w-10 h-10 text-amber-500 mb-6" />
               <h3 className="text-xl font-black tracking-tight mb-4">SLA Breach Detected</h3>
               <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                  TKT-1102 (SSO Integration) has exceeded the 2-hour response guarantee for Aetheris Global (Enterprise Tier).
               </p>
               <button className="w-full py-4 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl">
                  Resolve Escalation
               </button>
            </div>

            <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl">
               <h3 className="text-lg font-black tracking-tight mb-6">Contractual Revenue</h3>
               <div className="space-y-6">
                  <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">Committed ARR</p>
                     <h4 className="text-2xl font-black">$2,145,000</h4>
                  </div>
                  <div className="p-6 bg-white/10 rounded-2xl border border-white/10">
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">Renewal Velocity</p>
                     <h4 className="text-2xl font-black">94.2%</h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContractWorkspace;
