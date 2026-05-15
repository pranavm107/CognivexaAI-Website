import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  CreditCard, Search, Filter, Download, 
  ExternalLink, ArrowUpRight, CheckCircle2, Clock,
  ShieldCheck, ArrowRight, Zap, RefreshCw
} from 'lucide-react';
import { clientApi } from '../services/api';
import { cn } from '../../admin/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Invoices = () => {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: invoicesData, isLoading } = useQuery({
    queryKey: ['client-invoices'],
    queryFn: () => clientApi.getInvoices()
  });

  const payMutation = useMutation({
    mutationFn: clientApi.payInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries(['client-invoices']);
      queryClient.invalidateQueries(['client-dashboard']);
    }
  });

  const invoices = invoicesData?.results || [];
  
  const filteredInvoices = invoices.filter(inv => 
    filterStatus === 'all' ? true : inv.status === filterStatus
  );

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  const totalPending = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((acc, inv) => acc + inv.totalAmount, 0);

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Billing Center</h1>
          <p className="text-slate-500 font-medium text-lg">Manage enterprise subscriptions, transaction history, and fiscal records.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2 group">
             <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /> Refresh Data
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2 group">
             <CreditCard className="w-4 h-4" /> Manage Methods
           </button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="p-10 bg-slate-900 rounded-[3rem] text-white shadow-2xl shadow-slate-200 relative overflow-hidden group"
         >
           <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-150 transition-transform duration-1000">
              <Zap className="w-32 h-32" />
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Total Invested</p>
           <h2 className="text-5xl font-black tracking-tighter mb-4">${totalPaid.toLocaleString()}</h2>
           <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
             <CheckCircle2 className="w-3.5 h-3.5" /> Fiscal Accuracy Verified
           </div>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm relative overflow-hidden group"
         >
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Pending Settlement</p>
           <h2 className="text-5xl font-black tracking-tighter mb-4 text-slate-900">${totalPending.toLocaleString()}</h2>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
             <Clock className="w-3.5 h-3.5" /> Due within 14 days
           </p>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="p-10 bg-indigo-600 rounded-[3rem] text-white shadow-2xl shadow-indigo-100 flex flex-col justify-between"
         >
           <div className="flex justify-between items-start">
             <div>
               <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.3em] mb-6">Next Billing Cycle</p>
               <h2 className="text-3xl font-black tracking-tighter">June 01, 2026</h2>
             </div>
             <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
               <ShieldCheck className="w-7 h-7" />
             </div>
           </div>
           <button className="w-full mt-10 py-5 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
             Advanced Settings <ArrowRight className="w-4 h-4" />
           </button>
         </motion.div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Financial Records</h3>
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                 {['all', 'pending', 'paid'].map((status) => (
                   <button 
                     key={status}
                     onClick={() => setFilterStatus(status)}
                     className={cn(
                       "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                       filterStatus === status ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                     )}
                   >
                     {status}
                   </button>
                 ))}
              </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Filter ID..."
                 className="bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-100"
               />
             </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Identity</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Project Context</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Timestamp</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Amount</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Status</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                [1, 2, 3, 4].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-10 py-10 h-20 bg-slate-50/20"></td>
                  </tr>
                ))
              ) : filteredInvoices.length > 0 ? filteredInvoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-10 py-8">
                    <span className="text-sm font-black text-slate-900">#{inv.invoiceNumber}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-bold text-slate-500">{inv.project?.title || 'General Allocation'}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-bold text-slate-400">{new Date(inv.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-lg font-black text-slate-900">${inv.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2",
                      inv.status === 'paid' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      <div className={cn("w-1.5 h-1.5 rounded-full", inv.status === 'paid' ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                       <button className="w-12 h-12 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm transition-all flex items-center justify-center">
                         <Download className="w-5 h-5" />
                       </button>
                       {inv.status === 'pending' && (
                         <button 
                           onClick={() => payMutation.mutate(inv._id)}
                           disabled={payMutation.isPending}
                           className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-xl shadow-slate-100 disabled:bg-slate-200 disabled:shadow-none"
                         >
                           {payMutation.isPending ? 'Processing...' : 'Settle Now'} <ArrowUpRight className="w-4 h-4" />
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-10 py-10 md:py-undefined text-center text-slate-400 font-bold">
                    No fiscal records matched your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
