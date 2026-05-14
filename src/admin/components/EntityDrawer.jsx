import React, { useState, useEffect } from 'react';
import { 
  X, Activity, Link as LinkIcon, 
  History, Shield, Zap,
  ExternalLink, ChevronRight,
  Clock, User, FileText, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/utils';

/**
 * ENTERPRISE ENTITY DRAWER
 * A standardized slide-over interface for deep entity inspection and orchestration.
 */
const EntityDrawer = ({ isOpen, onClose, entityType, entityId, data }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'dependencies', label: 'Dependencies', icon: LinkIcon },
    { id: 'history', label: 'History', icon: History },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex justify-end">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Drawer Content */}
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col"
        >
           {/* Header */}
           <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                       {entityType}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {entityId}</span>
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{data?.name || data?.title || 'Entity Details'}</h2>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-full transition-colors">
                 <X className="w-6 h-6 text-slate-400" />
              </button>
           </div>

           {/* Tabs */}
           <div className="flex px-8 border-b border-slate-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-5 text-[10px] font-black uppercase tracking-widest transition-all relative",
                    activeTab === tab.id ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                  )}
                </button>
              ))}
           </div>

           {/* Scrollable Content */}
           <div className="flex-1 overflow-y-auto p-10 space-y-10">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-3xl">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span className="text-sm font-black text-slate-900 uppercase">{data?.status || 'Active'}</span>
                         </div>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-3xl">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Sync</p>
                         <span className="text-sm font-black text-slate-900 uppercase">2m ago</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Metadata</h4>
                      <div className="divide-y divide-slate-50 border-y border-slate-50">
                         {Object.entries(data || {}).filter(([k]) => typeof data[k] !== 'object').map(([key, value]) => (
                           <div key={key} className="py-4 flex justify-between items-center text-sm">
                              <span className="text-slate-400 font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                              <span className="text-slate-900 font-bold">{String(value)}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'dependencies' && (
                <div className="space-y-6">
                   <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-center gap-4">
                      <Zap className="w-6 h-6 text-amber-500" />
                      <p className="text-xs font-bold text-amber-700 leading-tight">
                         Modifying this {entityType.toLowerCase()} may affect 3 linked entities including 2 pending invoices.
                      </p>
                   </div>
                   
                   <div className="space-y-4">
                      {[
                        { label: 'Primary Client', icon: User, value: 'Acme Corp' },
                        { label: 'Draft Contract', icon: FileText, value: 'MSA-2026-001' },
                        { label: 'Unpaid Invoice', icon: CreditCard, value: '$12,400.00' },
                      ].map((dep, i) => (
                        <div key={i} className="p-6 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:border-indigo-100 transition-all cursor-pointer">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                 <dep.icon className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{dep.label}</p>
                                 <p className="text-sm font-black text-slate-900">{dep.value}</p>
                              </div>
                           </div>
                           <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-indigo-600 transition-all" />
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>

           {/* Footer Actions */}
           <div className="p-8 border-t border-slate-50 flex gap-4">
              <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                 Execute Workflow
              </button>
              <button className="flex-1 py-4 bg-white border border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                 View Full Record
              </button>
           </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EntityDrawer;
