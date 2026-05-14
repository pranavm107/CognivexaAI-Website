import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit2, Trash2, Sparkles, Eye, X, 
  Check, ArrowRight, Layers, Tag, Settings, Save,
  MoreVertical, Clock, BadgeCheck, Zap
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';

// --- DATA MAPS ---

const themePresets = [
  { name: 'Purple', value: 'purple', gradient: 'from-[#7c3aed] to-[#a855f7]', color: '#7c3aed' },
  { name: 'Teal', value: 'teal', gradient: 'from-[#0d9488] to-[#14b8a6]', color: '#14b8a6' },
  { name: 'Indigo', value: 'indigo', gradient: 'from-[#6366f1] to-[#8b5cf6]', color: '#6366f1' },
  { name: 'Blue', value: 'blue', gradient: 'from-[#3b82f6] to-[#06b6d4]', color: '#3b82f6' },
  { name: 'Emerald', value: 'emerald', gradient: 'from-[#10b981] to-[#34d399]', color: '#10b981' },
  { name: 'Orange', value: 'orange', gradient: 'from-[#f59e0b] to-[#f97316]', color: '#f59e0b' },
  { name: 'Pink', value: 'pink', gradient: 'from-[#ec4899] to-[#f43f5e]', color: '#ec4899' },
  { name: 'Neutral', value: 'neutral', gradient: 'from-slate-700 to-slate-900', color: '#64748b' }
];

const initialCategoryForm = { name: '', slug: '', tagline: '', order: 0, active: true };
const initialPlanForm = {
  categoryId: '', title: '', subtitle: '', badge: '', priceText: '', 
  timeline: '', features: [], ctaText: 'Get Started →', ctaLink: '/contact',
  isPopular: false, theme: 'purple', active: true, order: 0
};

// --- PREVIEW COMPONENTS ---

const PricingCardPreview = ({ plan }) => {
  const theme = themePresets.find(p => p.value === plan.theme) || themePresets[0];
  const isTeal = plan.theme === 'teal';

  return (
    <div className={cn(
        "relative rounded-[20px] p-8 transition-all duration-300 w-full max-w-[340px]",
        plan.isPopular 
            ? (isTeal ? "border-2 border-[#14b8a6] bg-[rgba(20,184,166,0.03)] shadow-xl" : "border-2 border-[#7c3aed] bg-[rgba(124,58,237,0.03)] shadow-xl")
            : "border border-[#e5e7eb] bg-white shadow-md"
    )}>
      {plan.isPopular ? (
        <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
          <span className={cn("text-[10px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full text-white", isTeal ? "bg-[#14b8a6]" : "bg-[#7c3aed]")}>MOST POPULAR</span>
        </div>
      ) : (
        <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md mb-6 bg-[#f8fafc] text-[#64748b] border border-[#e5e7eb]">
          {plan.badge || 'BADGE'}
        </span>
      )}

      <h3 className="text-2xl font-[800] tracking-wide mb-2 text-[#0f172a]">{plan.title || 'Plan Title'}</h3>
      <p className="text-sm text-[#64748b] mb-6 pb-6 border-b border-[#e5e7eb]">Best for: {plan.subtitle || 'Sub-description'}</p>

      <div className="mb-6">
        <span className={cn("text-3xl font-[800] tracking-tight", isTeal ? "text-[#14b8a6]" : "text-[#7c3aed]")}>{plan.priceText || '₹0'}</span>
      </div>

      <ul className="space-y-4 mb-8">
        {(plan.features?.length > 0 ? plan.features : ['Feature 1', 'Feature 2']).map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#475569] font-medium">
            <Check className={cn("w-5 h-5 shrink-0", isTeal ? "text-[#14b8a6]" : "text-[#7c3aed]")} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="text-sm text-[#64748b] mb-6 flex items-center gap-2 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" /> Timeline: {plan.timeline || 'Duration'}
      </div>

      <div className={cn(
        "block w-full text-center py-3.5 rounded-[12px] font-semibold",
        plan.isPopular ? `bg-gradient-to-br ${theme.gradient} text-white` : "bg-white text-[#0f172a] border border-[#e5e7eb]"
      )}>
        {plan.ctaText}
      </div>
    </div>
  );
};

// --- MAIN CMS PAGE ---

const PricingCMS = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [featureInput, setFeatureInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  // Queries
  const { data: catRes, isLoading: isCatLoading } = useQuery({ queryKey: ['admin-pricing-cats'], queryFn: () => apiClient.get('/pricing-categories') });
  const { data: planRes, isLoading: isPlanLoading } = useQuery({ queryKey: ['admin-pricing-plans'], queryFn: () => apiClient.get('/pricing-plans') });
  const { data: smartRes, isLoading: isSmartLoading } = useQuery({ queryKey: ['admin-smart-package'], queryFn: () => apiClient.get('/smart-package') });

  // Mutations
  const mutation = (method, url, key) => useMutation({
    mutationFn: (data) => data._id ? apiClient.put(`${url}/${data._id}`, data) : apiClient.post(url, data),
    onSuccess: () => { queryClient.invalidateQueries([key]); setIsDrawerOpen(false); }
  });

  const catMut = mutation('post', '/pricing-categories', 'admin-pricing-cats');
  const planMut = mutation('post', '/pricing-plans', 'admin-pricing-plans');
  const smartMut = useMutation({
    mutationFn: (data) => apiClient.put(`/smart-package/${data._id}`, data),
    onSuccess: () => queryClient.invalidateQueries(['admin-smart-package'])
  });

  const delCatMut = useMutation({ mutationFn: (id) => apiClient.delete(`/pricing-categories/${id}`), onSuccess: () => queryClient.invalidateQueries(['admin-pricing-cats']) });
  const delPlanMut = useMutation({ mutationFn: (id) => apiClient.delete(`/pricing-plans/${id}`), onSuccess: () => queryClient.invalidateQueries(['admin-pricing-plans']) });

  const categories = catRes?.results || [];
  const plans = planRes?.results || [];
  const smartPackage = smartRes?.data || {};

  const handleEdit = (item, type) => {
    setSelectedItem(item);
    setFormData(item);
    setActiveTab(type);
    setIsDrawerOpen(true);
  };

  const handleCreate = (type) => {
    setSelectedItem(null);
    setFormData(type === 'categories' ? initialCategoryForm : initialPlanForm);
    setActiveTab(type);
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'categories') catMut.mutate(formData);
    else if (activeTab === 'plans') planMut.mutate(formData);
  };

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const addFeature = (e) => {
    if (e.key === 'Enter' && featureInput.trim()) {
      e.preventDefault();
      updateField('features', [...(formData.features || []), featureInput.trim()]);
      setFeatureInput('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pricing CMS</h1>
          <p className="text-slate-500 font-medium mt-1">Manage pricing categories, plans, and premium packages</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button onClick={() => setActiveTab('categories')} className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all", activeTab === 'categories' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}>Categories</button>
            <button onClick={() => setActiveTab('plans')} className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all", activeTab === 'plans' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}>Plans</button>
            <button onClick={() => setActiveTab('smart')} className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all", activeTab === 'smart' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}>Smart Package</button>
          </div>
          <button 
            onClick={() => handleCreate(activeTab)} 
            className={cn("flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 shadow-lg", activeTab === 'smart' && "hidden")}
          >
            <Plus className="w-4 h-4" /> NEW {activeTab === 'categories' ? 'CATEGORY' : 'PLAN'}
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div key={cat._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">{cat.order}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(cat, 'categories')} className="p-2 bg-slate-50 rounded-xl hover:text-indigo-600"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => { if(window.confirm('Delete category?')) delCatMut.mutate(cat._id); }} className="p-2 bg-slate-50 rounded-xl hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{cat.name}</h3>
              <p className="text-slate-400 text-sm mt-1">{cat.tagline || 'No tagline'}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-black uppercase", cat.active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500")}>{cat.active ? 'Active' : 'Inactive'}</span>
                <span className="text-[9px] font-bold text-slate-300 uppercase">/{cat.slug}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase", themePresets.find(t => t.value === plan.theme)?.gradient, "bg-gradient-to-r text-white")}>{plan.theme}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(plan, 'plans')} className="p-2 bg-slate-50 rounded-xl hover:text-indigo-600"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => { if(window.confirm('Delete plan?')) delPlanMut.mutate(plan._id); }} className="p-2 bg-slate-50 rounded-xl hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-indigo-500 uppercase">{plan.categoryId?.name}</span>
                {plan.isPopular && <BadgeCheck className="w-4 h-4 text-amber-500" />}
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">{plan.title}</h3>
              <p className="text-2xl font-black text-slate-900 mt-4">{plan.priceText}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[9px] font-black uppercase">{plan.timeline}</span>
                <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md text-[9px] font-black uppercase">{plan.features?.length} Features</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'smart' && (
        <div className="max-w-4xl bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">Smart System Package Editor</h2>
                    <p className="text-slate-500">Configure the premium add-on section</p>
                </div>
                <button onClick={() => smartMut.mutate(smartPackage)} className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:scale-105 transition-all">
                    <Save className="w-5 h-5" /> SAVE CHANGES
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div><label className="text-xs font-black text-slate-400 uppercase mb-2 block">Title</label><input value={smartPackage.title} onChange={e => { const newP = {...smartPackage, title: e.target.value}; queryClient.setQueryData(['admin-smart-package'], { success: true, data: newP }); }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                    <div><label className="text-xs font-black text-slate-400 uppercase mb-2 block">Subtitle</label><textarea value={smartPackage.subtitle} onChange={e => { const newP = {...smartPackage, subtitle: e.target.value}; queryClient.setQueryData(['admin-smart-package'], { success: true, data: newP }); }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 h-24" /></div>
                    <div><label className="text-xs font-black text-slate-400 uppercase mb-2 block">Pricing Text</label><input value={smartPackage.pricingText} onChange={e => { const newP = {...smartPackage, pricingText: e.target.value}; queryClient.setQueryData(['admin-smart-package'], { success: true, data: newP }); }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Tags (Comma separated)</label>
                        <input value={smartPackage.tags?.join(', ')} onChange={e => { const newP = {...smartPackage, tags: e.target.value.split(',').map(s => s.trim())}; queryClient.setQueryData(['admin-smart-package'], { success: true, data: newP }); }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-xs font-black text-slate-400 uppercase mb-2 block">CTA Text</label><input value={smartPackage.ctaText} onChange={e => { const newP = {...smartPackage, ctaText: e.target.value}; queryClient.setQueryData(['admin-smart-package'], { success: true, data: newP }); }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                        <div><label className="text-xs font-black text-slate-400 uppercase mb-2 block">CTA Link</label><input value={smartPackage.ctaLink} onChange={e => { const newP = {...smartPackage, ctaLink: e.target.value}; queryClient.setQueryData(['admin-smart-package'], { success: true, data: newP }); }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                    </div>
                    <div className="pt-4"><label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={smartPackage.active} onChange={e => { const newP = {...smartPackage, active: e.target.checked}; queryClient.setQueryData(['admin-smart-package'], { success: true, data: newP }); }} className="w-6 h-6 rounded-lg text-indigo-600" /><span className="font-black text-slate-700">Active on Website</span></label></div>
                </div>
            </div>
        </div>
      )}

      {/* Editor Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={selectedItem ? `Edit ${activeTab === 'categories' ? 'Category' : 'Plan'}` : `Create ${activeTab === 'categories' ? 'Category' : 'Plan'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto pr-4 h-[calc(100vh-120px)] pb-32">
                {activeTab === 'categories' ? (
                    <div className="space-y-6">
                        <div className="p-6 bg-slate-50 rounded-[2rem] space-y-4">
                            <h3 className="font-black text-slate-900 border-b border-slate-200 pb-2">Category Info</h3>
                            <div><label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Name</label><input value={formData.name} onChange={e => { updateField('name', e.target.value); if(!selectedItem) updateField('slug', e.target.value.toLowerCase().replace(/ /g, '-')); }} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500" /></div>
                            <div><label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Slug</label><input value={formData.slug} onChange={e => updateField('slug', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500" /></div>
                            <div><label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Tagline</label><input value={formData.tagline} onChange={e => updateField('tagline', e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Order</label><input type="number" value={formData.order} onChange={e => updateField('order', Number(e.target.value))} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500" /></div>
                                <div className="flex items-end pb-3"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={formData.active} onChange={e => updateField('active', e.target.checked)} className="w-5 h-5 rounded text-indigo-600" /><span className="text-xs font-bold text-slate-700">Active</span></label></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-black text-slate-900 border-b border-indigo-100 pb-2">1. Plan Basics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase">Category</label><select value={formData.categoryId} onChange={e => updateField('categoryId', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"><option value="">Select Category</option>{categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
                                <div className="col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase">Title</label><input value={formData.title} onChange={e => updateField('title', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                                <div className="col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase">Subtitle (Best For)</label><input value={formData.subtitle} onChange={e => updateField('subtitle', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                                <div><label className="text-[10px] font-black text-slate-400 uppercase">Price Text</label><input value={formData.priceText} onChange={e => updateField('priceText', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                                <div><label className="text-[10px] font-black text-slate-400 uppercase">Badge</label><input value={formData.badge} onChange={e => updateField('badge', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-black text-slate-900 border-b border-indigo-100 pb-2">2. Features</h3>
                            <div className="space-y-3">
                                <input value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={addFeature} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Type feature and press Enter..." />
                                <div className="space-y-2">
                                    {formData.features?.map((f, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl text-sm font-medium">
                                            <div className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-500" /> {f}</div>
                                            <button type="button" onClick={() => updateField('features', formData.features.filter((_, idx) => idx !== i))} className="text-slate-300 hover:text-rose-500"><X className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-black text-slate-900 border-b border-indigo-100 pb-2">3. Theme & CTA</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block">Color Theme</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {themePresets.map(t => (
                                            <button key={t.value} type="button" onClick={() => updateField('theme', t.value)} className={cn("p-2 rounded-xl border flex flex-col items-center gap-1 transition-all", formData.theme === t.value ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200")}>
                                                <div className={cn("w-full h-1.5 rounded-full bg-gradient-to-r", t.gradient)} />
                                                <span className="text-[8px] font-black uppercase">{t.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div><label className="text-[10px] font-black text-slate-400 uppercase">CTA Text</label><input value={formData.ctaText} onChange={e => updateField('ctaText', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                                <div><label className="text-[10px] font-black text-slate-400 uppercase">CTA Link</label><input value={formData.ctaLink} onChange={e => updateField('ctaLink', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-black text-slate-900 border-b border-indigo-100 pb-2">4. Settings & Status</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-[10px] font-black text-slate-400 uppercase">Timeline</label><input value={formData.timeline} onChange={e => updateField('timeline', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                                <div><label className="text-[10px] font-black text-slate-400 uppercase">Display Order</label><input type="number" value={formData.order} onChange={e => updateField('order', Number(e.target.value))} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                                <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                    <input type="checkbox" checked={formData.isPopular} onChange={e => updateField('isPopular', e.target.checked)} className="w-6 h-6 rounded-lg text-amber-500" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-700">Most Popular</span>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase">Badge + Highlight</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                    <input type="checkbox" checked={formData.active} onChange={e => updateField('active', e.target.checked)} className="w-6 h-6 rounded-lg text-indigo-600" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-slate-700">Active</span>
                                        <span className="text-[9px] text-slate-400 font-bold uppercase">Public Visibility</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                <div className="pt-6 sticky bottom-0 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] -mx-4 px-4 flex gap-3">
                    <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl">CANCEL</button>
                    <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100">SAVE {activeTab === 'categories' ? 'CATEGORY' : 'PLAN'}</button>
                </div>
            </form>

            <div className="hidden lg:block bg-slate-50 rounded-[3rem] p-8 border border-slate-200 h-[calc(100vh-120px)] sticky top-0 overflow-y-auto">
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 text-xl"><Eye className="w-6 h-6 text-indigo-600"/> Live Card Preview</h3>
                <div className="flex justify-center scale-95 origin-top">
                    {activeTab === 'plans' ? <PricingCardPreview plan={formData} /> : (
                        <div className="bg-white p-12 rounded-[2rem] shadow-xl text-center w-full">
                            <h4 className="text-3xl font-black text-slate-900">{formData.name || 'Category Name'}</h4>
                            <p className="text-slate-400 mt-2 font-medium italic">"{formData.tagline || 'Tagline goes here'}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PricingCMS;
