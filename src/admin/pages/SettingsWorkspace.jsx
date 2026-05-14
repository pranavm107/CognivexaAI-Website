import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Settings, Globe, Shield, Bell, 
  Palette, Database, Key, Layout, 
  Mail, Save, CheckCircle2, AlertCircle,
  Zap, Building, Lock, Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';

const tabs = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'auth', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'seo', label: 'SEO', icon: Database },
];

const SettingsWorkspace = () => {
  const [activeTab, setActiveTab] = useState('general');
  const queryClient = useQueryClient();

  const { data: result, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => apiClient.get('/cms/settings'),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => apiClient.patch('/cms/settings', data),
    onSuccess: () => queryClient.invalidateQueries(['admin-settings']),
  });

  const settings = result?.data || {};

  const handleSave = (e) => {
    e.preventDefault();
    // In a real implementation, we'd gather form data here
    updateMutation.mutate(settings);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Configuration</h1>
          <p className="text-slate-500 font-medium">Control global parameters, branding, and enterprise integrations.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] text-sm font-black hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10 active:scale-95 disabled:opacity-50"
        >
          {updateMutation.isPending ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
          SAVE CONFIGURATION
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <aside className="lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all group",
                activeTab === tab.id 
                  ? "bg-white text-indigo-600 shadow-xl shadow-slate-200/50 border border-slate-100" 
                  : "text-slate-400 hover:text-slate-900 hover:bg-white/50"
              )}
            >
              <tab.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === tab.id ? "text-indigo-600" : "text-slate-300")} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-white p-10 lg:p-16 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {activeTab === 'general' && (
                <div className="space-y-10">
                  <div className="pb-8 border-b border-slate-50">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Basic Identity</h3>
                    <p className="text-sm text-slate-400 font-medium mt-2 uppercase tracking-widest">General Platform Parameters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Platform Name</label>
                      <input 
                        defaultValue={settings.general?.platformName} 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Support Channel</label>
                      <input 
                        defaultValue={settings.general?.supportEmail}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'branding' && (
                <div className="space-y-10">
                  <div className="pb-8 border-b border-slate-50">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Visual Identity</h3>
                    <p className="text-sm text-slate-400 font-medium mt-2 uppercase tracking-widest">Brand Tokens & Style Architecture</p>
                  </div>

                  <div className="space-y-10">
                    <div className="flex items-center gap-10 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 border-dashed">
                      <div className="w-24 h-24 bg-white rounded-3xl border border-slate-200 flex items-center justify-center text-slate-300">
                        <Layout className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-black text-slate-900">Platform Logo</h4>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">SVG, PNG or WebP • Max 2MB</p>
                        <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mt-2 hover:underline">Upload New Asset</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                       <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Accent</label>
                        <div className="flex gap-4 items-center">
                          <div className="w-14 h-14 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-200 border-4 border-white" />
                          <input 
                            defaultValue={settings.branding?.accentColor}
                            className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-10">
                  <div className="pb-8 border-b border-slate-50">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic">Enterprise Stack</h3>
                    <p className="text-sm text-slate-400 font-medium mt-2 uppercase tracking-widest">External Services & API Connectors</p>
                  </div>

                  <div className="grid gap-6">
                    {[
                      { name: 'OpenAI Intelligence', icon: Zap, status: 'Connected', key: 'sk-••••••••' },
                      { name: 'Stripe Payments', icon: Building, status: 'Configured', key: 'pk-••••••••' },
                      { name: 'Slack Alerts', icon: Mail, status: 'Not Linked', key: null },
                    ].map((app, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-default group">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm transition-all">
                            <app.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-slate-900">{app.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{app.key || 'Setup Required'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            app.status === 'Not Linked' ? "text-slate-400" : "text-emerald-500"
                          )}>
                            {app.status}
                          </span>
                          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsWorkspace;
