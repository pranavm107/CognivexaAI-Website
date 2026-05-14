import React, { useState } from 'react';
import { 
  Code2, Key, Globe, 
  BarChart3, Settings, Play,
  Copy, CheckCircle2, AlertCircle,
  Plus, Terminal, Zap, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/utils';

/**
 * ENTERPRISE DEVELOPER PORTAL
 * A centralized hub for API management, webhook configuration, and ecosystem extensibility.
 */
const DeveloperPortal = () => {
  const [activeTab, setActiveTab] = useState('keys');

  const apiKeys = [
    { id: 'ak_live_9281...', name: 'Production Dashboard', created: '2026-05-01', lastUsed: 'Just now', status: 'active' },
    { id: 'ak_test_1280...', name: 'Staging Environment', created: '2026-04-15', lastUsed: '2d ago', status: 'active' },
  ];

  const webhooks = [
    { id: 'wh_9281', url: 'https://api.acme.com/webhooks', events: ['PROJECT_CREATED', 'INVOICE_PAID'], status: 'active' },
  ];

  const MetricCard = ({ label, value, detail, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <div className="flex items-baseline gap-3">
          <h3 className={cn("text-3xl font-black tracking-tighter", color)}>{value}</h3>
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
                <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Platform Cloud</span>
                <span className="text-[10px] font-bold text-slate-400">v2.4.0 • Enterprise SDK</span>
             </div>
             <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Developer<br />Control Center</h1>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2 group">
                <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" /> API Docs
             </button>
             <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create App
             </button>
          </div>
       </div>

       {/* Platform Usage */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard label="API Requests" value="1.2M" detail="+12% volume" color="text-slate-900" />
          <MetricCard label="Webhook Delivery" value="99.9%" detail="0.1ms latency" color="text-emerald-500" />
          <MetricCard label="Active Apps" value="14" detail="Internal & Client" color="text-indigo-600" />
          <MetricCard label="Rate Limit" value="0.2%" detail="Capacity utilization" color="text-amber-500" />
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
             {[
               { id: 'keys', label: 'API Keys', icon: Key },
               { id: 'webhooks', label: 'Webhooks', icon: Globe },
               { id: 'explorer', label: 'API Explorer', icon: Terminal },
               { id: 'analytics', label: 'Usage Analytics', icon: BarChart3 },
               { id: 'settings', label: 'Platform Settings', icon: Settings },
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

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
             {activeTab === 'keys' && (
               <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">Access Credentials</h3>
                     <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Generate Key</button>
                  </div>
                  <div className="divide-y divide-slate-50">
                     {apiKeys.map((key, i) => (
                       <div key={i} className="p-8 flex items-center justify-between group hover:bg-slate-50 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                <Key className="w-6 h-6" />
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{key.name}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                   <code className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md font-mono text-slate-500">{key.id}</code>
                                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">• Created {key.created}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                             <button className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all text-slate-400 hover:text-indigo-600">
                                <Copy className="w-4 h-4" />
                             </button>
                             <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             )}

             {activeTab === 'webhooks' && (
               <div className="space-y-6">
                  <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-200">
                     <Globe className="w-10 h-10 text-indigo-400 mb-6" />
                     <h3 className="text-2xl font-black tracking-tight mb-4">Event Stream</h3>
                     <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                        Configure HTTP endpoints to receive real-time updates when operational events occur across your organization.
                     </p>
                     <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl">
                        Add Webhook Endpoint
                     </button>
                  </div>

                  <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                     {webhooks.map((wh, i) => (
                       <div key={i} className="p-8 flex items-center justify-between border-b border-slate-50 last:border-0">
                          <div>
                             <p className="text-sm font-black text-slate-900 mb-1">{wh.url}</p>
                             <div className="flex flex-wrap gap-2">
                                {wh.events.map((e, j) => (
                                  <span key={j} className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                     {e}
                                  </span>
                                ))}
                             </div>
                          </div>
                          <button className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-400">
                             <Settings className="w-4 h-4" />
                          </button>
                       </div>
                     ))}
                  </div>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default DeveloperPortal;
