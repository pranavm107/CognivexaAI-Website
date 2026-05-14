import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  CreditCard, Zap, ShieldCheck, 
  ArrowUpRight, CheckCircle2, History,
  DollarSign, BarChart3, AlertCircle,
  Package, Layers, Sparkles
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';

const SubscriptionCenter = () => {
  // Using ops dashboard for placeholder metrics
  const { data: opsData } = useQuery({
    queryKey: ['admin-ops-dashboard'],
    queryFn: () => adminApi.getOpsDashboard()
  });

  const plans = [
    { name: 'Starter', price: '$499', features: ['5 Users', '10 Projects', '5GB Storage'], current: true },
    { name: 'Professional', price: '$1,249', features: ['20 Users', '50 Projects', '50GB Storage', 'Priority Support'], current: false, recommended: true },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited Users', 'Unlimited Projects', '1TB Storage', 'Dedicated Manager', 'SLA Guarantee'], current: false },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Subscription & Billing</h1>
           <p className="text-slate-500 font-medium mt-1">Manage enterprise plans, usage limits, and recurring revenue.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-600" /> Billing History
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Manage Payment Method
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={cn(
            "p-10 rounded-[3.5rem] border-2 transition-all relative overflow-hidden",
            plan.current ? "bg-white border-indigo-600" : "bg-white border-slate-100",
            plan.recommended ? "shadow-2xl shadow-indigo-100" : "shadow-sm"
          )}>
            {plan.recommended && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-8 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
                Recommended
              </div>
            )}
            
            <div className="flex items-center justify-between mb-8">
               <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", plan.current ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400")}>
                  {plan.name === 'Enterprise' ? <ShieldCheck className="w-7 h-7" /> : <Zap className="w-7 h-7" />}
               </div>
               {plan.current && (
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active Plan
                 </span>
               )}
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
               <span className="text-4xl font-black text-slate-900">{plan.price}</span>
               {plan.price !== 'Custom' && <span className="text-sm font-bold text-slate-400">/mo</span>}
            </div>

            <div className="space-y-4 mb-10">
               {plan.features.map((f, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-600">{f}</span>
                 </div>
               ))}
            </div>

            <button className={cn(
              "w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
              plan.current ? "bg-slate-100 text-slate-400 cursor-default" : "bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-slate-100"
            )}>
              {plan.current ? 'Current Plan' : 'Upgrade Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/10 skew-x-12 translate-x-12" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
               <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Enterprise Add-on</span>
               </div>
               <h2 className="text-4xl font-black tracking-tighter mb-4 leading-tight">
                  Autonomous Intelligence <br/> & Custom Workflows
               </h2>
               <p className="text-slate-400 text-lg font-medium max-w-md mb-8">
                  Unlock white-label workspaces, custom domains, and our advanced AI automation engine.
               </p>
               <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-2xl">
                  Contact Sales for Access
               </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
               {[
                 { label: 'Seats Occupied', value: '18 / 20', color: 'text-indigo-400' },
                 { label: 'Storage Used', value: '12.4 GB', color: 'text-indigo-400' },
                 { label: 'API Usage', value: '45.2K / 100K', color: 'text-indigo-400' },
                 { label: 'Automation Runs', value: '892 / 1000', color: 'text-indigo-400' },
               ].map((stat, i) => (
                 <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                    <h4 className="text-xl font-black text-white">{stat.value}</h4>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SubscriptionCenter;
