import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Palette, Layout, Type, 
  Globe, Shield, Save,
  Eye, RefreshCcw, Image,
  Monitor, Smartphone, Tablet
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import { toast } from 'react-hot-toast';

const BrandingCenter = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('visuals');
  
  const { data: brandingData } = useQuery({
    queryKey: ['tenant-branding'],
    queryFn: () => adminApi.getTenantBranding()
  });

  const updateMutation = useMutation({
    mutationFn: (data) => adminApi.updateTenantBranding(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tenant-branding']);
      toast.success('Branding Changes Published');
    },
    onError: () => {
      toast.error('Failed to publish changes');
    }
  });

  const branding = brandingData?.data || {};

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">White-Label & Branding</h1>
           <p className="text-slate-500 font-medium mt-1">Customize the enterprise workspace identity and theme.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" /> Preview Workspace
           </button>
           <button 
             onClick={() => updateMutation.mutate(branding)}
             disabled={updateMutation.isLoading}
             className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2"
           >
              {updateMutation.isLoading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Publish Changes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Sidebar Controls */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm inline-flex w-full">
               {['visuals', 'typography', 'domain'].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={cn(
                     "flex-1 py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                     activeTab === tab ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                   )}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
               {activeTab === 'visuals' && (
                 <>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Color</label>
                      <div className="flex items-center gap-4">
                         <input type="color" value={branding.primaryColor || '#6366f1'} className="w-12 h-12 rounded-xl border-none cursor-pointer" />
                         <input type="text" value={branding.primaryColor || '#6366f1'} className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold font-mono" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Theme Mode</label>
                      <div className="grid grid-cols-2 gap-3">
                         {['light', 'dark'].map((mode) => (
                           <button key={mode} className={cn(
                             "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                             branding.theme === mode ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-white border-slate-100 text-slate-400"
                           )}>
                              {mode}
                           </button>
                         ))}
                      </div>
                   </div>
                 </>
               )}
               
               {activeTab === 'typography' && (
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Font Family</label>
                    <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-indigo-600">
                       <option>Inter</option>
                       <option>Outfit</option>
                       <option>Plus Jakarta Sans</option>
                    </select>
                 </div>
               )}

               {activeTab === 'domain' && (
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Custom Subdomain</label>
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3">
                       <input type="text" placeholder="your-company" className="bg-transparent border-none p-0 text-xs font-bold w-full focus:ring-0" />
                       <span className="text-slate-400 text-xs font-bold">.cognivexa.ai</span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-400">DNS propagation may take up to 24 hours.</p>
                 </div>
               )}
            </div>
         </div>

         {/* Live Preview Pane */}
         <div className="lg:col-span-2 bg-slate-50 rounded-[4rem] border-8 border-white shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
               <div className="bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
                  <RefreshCcw className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">Live Previewing</span>
               </div>
            </div>

            <div className="p-12 h-full min-h-[600px] flex flex-col">
               <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl" style={{ backgroundColor: branding.primaryColor || '#6366f1' }} />
                  <div className="h-6 w-32 bg-slate-200 rounded-lg animate-pulse" />
               </div>

               <div className="space-y-8">
                  <div className="h-12 w-2/3 bg-slate-200 rounded-2xl animate-pulse" />
                  <div className="grid grid-cols-2 gap-6">
                     <div className="h-40 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100" />
                        <div className="h-3 w-1/2 bg-slate-100 rounded" />
                        <div className="h-4 w-3/4 bg-slate-100 rounded" />
                     </div>
                     <div className="h-40 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100" />
                        <div className="h-3 w-1/2 bg-slate-100 rounded" />
                        <div className="h-4 w-3/4 bg-slate-100 rounded" />
                     </div>
                  </div>
               </div>

               <div className="mt-auto pt-10 flex justify-center gap-4">
                  <Monitor className="w-5 h-5 text-indigo-600" />
                  <Tablet className="w-5 h-5 text-slate-300" />
                  <Smartphone className="w-5 h-5 text-slate-300" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BrandingCenter;
