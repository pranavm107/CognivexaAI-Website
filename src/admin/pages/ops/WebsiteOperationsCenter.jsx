import React, { useState } from 'react';
import { 
  Globe, Layout, Search, 
  FileText, BarChart3, Settings,
  Eye, CheckCircle2, AlertCircle,
  Plus, ExternalLink, Zap,
  TrendingUp, Users, MessageSquare,
  Sparkles, MousePointer2, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/utils';

/**
 * WEBSITE OPERATIONS CENTER
 * Centralized governance hub for content management, lead intelligence, and conversion orchestration.
 */
const WebsiteOperationsCenter = () => {
  const [activeTab, setActiveTab] = useState('content');

  const visitorAnalytics = [
    { label: 'Active Visitors', value: '42', trend: '+12%', status: 'nominal' },
    { label: 'Avg. Engagement', value: '4m 12s', trend: '+22%', status: 'high' },
    { label: 'Conversion Rate', value: '3.8%', trend: '+5%', status: 'nominal' },
    { label: 'Top Industry', value: 'FinTech', detail: '14 inquiries', status: 'ready' },
  ];

  const recentConversions = [
    { id: 'LD-9281', company: 'Global Tech', type: 'Proposal Request', value: '$85k', score: 92, time: '2m ago' },
    { id: 'BK-9280', company: 'Nexus AI', type: 'Enterprise Demo', value: '$120k', score: 98, time: '15m ago' },
    { id: 'LD-9279', company: 'Starlight Corp', type: 'General Inquiry', value: '$15k', score: 45, time: '1h ago' },
  ];

  const MetricCard = ({ label, value, trend, detail, status }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
       <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
             <TrendingUp className="w-6 h-6" />
          </div>
          <span className={cn(
             "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
             status === 'high' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
          )}>
             {trend}
          </span>
       </div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <div className="flex items-baseline gap-3">
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
          {detail && <span className="text-[10px] font-bold text-slate-400">{detail}</span>}
       </div>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
             <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Website Control</span>
                <span className="text-[10px] font-bold text-slate-400">Cognivexa Real-time Synchronization</span>
             </div>
             <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Experience<br />Operations Center</h1>
          </div>
          <div className="flex items-center gap-3">
             <a 
               href="/" 
               target="_blank"
               className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2 group"
             >
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" /> View Live Site
             </a>
             <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Campaign
             </button>
          </div>
       </div>

       {/* Realtime Website Metrics */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visitorAnalytics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Operations Sidebar */}
          <div className="lg:col-span-1 space-y-2">
             {[
               { id: 'content', label: 'Dynamic Content', icon: Layout },
               { id: 'acquisition', label: 'Lead Intelligence', icon: Target },
               { id: 'orchestration', label: 'Booking Sync', icon: MousePointer2 },
               { id: 'seo', label: 'SEO & Search', icon: Globe },
               { id: 'analytics', label: 'Conversion Funnels', icon: BarChart3 },
             ].map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={cn(
                   "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all text-left",
                   activeTab === item.id ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                 )}
               >
                 <item.icon className="w-4 h-4" />
                 {item.label}
               </button>
             ))}
          </div>

          {/* Main Operational Surface */}
          <div className="lg:col-span-3 space-y-8">
             {activeTab === 'acquisition' && (
               <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                     <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Target className="w-5 h-5 text-indigo-600" /> Lead Intake Stream
                     </h3>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Realtime Processing</span>
                     </div>
                  </div>
                  <div className="divide-y divide-slate-50">
                     {recentConversions.map((lead, i) => (
                       <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                          <div className="flex items-center gap-6">
                             <div className={cn(
                               "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all",
                               lead.score > 90 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-slate-50 text-slate-400"
                             )}>
                                {lead.score}
                             </div>
                             <div>
                                <div className="flex items-center gap-3 mb-1">
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.time} • {lead.type}</p>
                                   {lead.score > 90 && <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[8px] font-black uppercase">High Intent</span>}
                                </div>
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{lead.company}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Est. Opp: {lead.value}</p>
                             </div>
                          </div>
                          <button className="p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all text-slate-400 hover:text-indigo-600">
                             <CheckCircle2 className="w-4 h-4" />
                          </button>
                       </div>
                     ))}
                  </div>
               </div>
             )}

             {activeTab === 'content' && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">
                     <Zap className="w-10 h-10 text-indigo-400 mb-6" />
                     <h3 className="text-2xl font-black tracking-tight mb-4">Content Propagation</h3>
                     <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
                        Website components are now synchronized with administrative services. Changes to services, pricing, or portfolio items propagate instantly.
                     </p>
                     <div className="space-y-3">
                        {['Service Catalog', 'Pricing Engine', 'Portfolio Showcase', 'Team Profiles'].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                             <span className="text-[10px] font-black uppercase tracking-widest">{item}</span>
                             <span className="text-[9px] font-bold text-emerald-400 uppercase">Live & Syncing</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                        <FileText className="w-8 h-8 text-indigo-600 mb-6" />
                        <h3 className="text-xl font-black text-slate-900 mb-2">Version Governance</h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                           Manage drafts, schedule future updates, and rollback content across all public landing pages.
                        </p>
                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Open Version History</button>
                     </div>
                     <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-xl">
                        <Sparkles className="w-8 h-8 text-emerald-200 mb-6" />
                        <h3 className="text-xl font-black mb-2">Smart Personalization</h3>
                        <p className="opacity-70 text-sm font-medium leading-relaxed mb-6">
                           Dynamic CTAs are now active for enterprise visitors based on organizational intent scores.
                        </p>
                        <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest">Configure Rules</button>
                     </div>
                  </div>
               </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default WebsiteOperationsCenter;
