import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit2, Trash2, Eye, X, 
  Check, ArrowRight, Save, Layout, 
  Image as ImageIcon, CheckCircle2, 
  Layers, ExternalLink, Activity
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';

const initialForm = {
  title: '',
  slug: '',
  badge: 'CONCEPT BUILD',
  description: '',
  image: '',
  statusTitle: '',
  statusSubtitle: '',
  ctaText: 'Explore This Build →',
  ctaLink: '/portfolio',
  alignment: 'left',
  featured: false,
  active: true,
  order: 0
};

// --- PREVIEW COMPONENT ---

const BuildPreview = ({ build, isLeft = true }) => {
  return (
    <div className="bg-white p-12 overflow-hidden w-full max-w-5xl mx-auto rounded-[2rem] border border-slate-100 shadow-2xl">
      <div className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 md:gap-undefined lg:gap-6 md:p-undefined`}>
        <div className="w-full lg:w-3/5 group relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-200/20 blur-[80px] rounded-full -z-10 opacity-100"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-md p-2 border border-white/20">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-100/80 backdrop-blur-sm border-b border-gray-200/50 rounded-t-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl bg-gray-50">
                <img src={build.image || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80'} alt={build.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          <div className={`absolute ${isLeft ? '-right-6 -bottom-6' : '-left-6 -bottom-6'} flex items-center gap-3 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-xl z-20`}>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                  <div className="text-lg font-bold text-gray-900 leading-none">{build.statusTitle || 'Production Ready'}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{build.statusSubtitle || 'STATUS'}</div>
              </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 space-y-8">
            <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                    {build.badge}
                </span>
            </div>
            <div className="space-y-4 text-left">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight leading-[1.1]">{build.title || 'Build Title'}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{build.description || 'Build description goes here...'}</p>
            </div>
            <div className="pt-4 text-left">
                <div className="inline-flex items-center text-gray-900 font-bold text-lg border-b-2 border-purple-600 pb-1">{build.ctaText}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CMS PAGE ---

const ConceptBuildCMS = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data: buildsRes, isLoading } = useQuery({ 
    queryKey: ['admin-concept-builds'], 
    queryFn: () => apiClient.get('/concept-builds') 
  });

  const mutation = useMutation({
    mutationFn: (data) => data._id ? apiClient.put(`/concept-builds/${data._id}`, data) : apiClient.post('/concept-builds', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-concept-builds']);
      setIsDrawerOpen(false);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'An error occurred';
      alert(`Error: ${msg}`);
    }
  });

  const deleteMut = useMutation({
    mutationFn: (id) => apiClient.delete(`/concept-builds/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['admin-concept-builds'])
  });

  const builds = buildsRes?.results || [];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setFormData(initialForm);
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
        alert('Please provide an image URL');
        return;
    }
    mutation.mutate(formData);
  };

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Concept Builds CMS</h1>
          <p className="text-slate-500 font-medium mt-2">Manage homepage "How We Build Real Impact" showcase builds</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1"
        >
          <Plus className="w-5 h-5" /> NEW BUILD
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {builds.map(build => (
          <div key={build._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all">
            <div className="aspect-[16/10] relative overflow-hidden">
              <img src={build.image} alt={build.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                {build.featured && <span className="px-2 py-1 bg-amber-400 text-amber-900 text-[10px] font-black uppercase rounded-lg">Featured</span>}
                <span className={cn("px-2 py-1 text-[10px] font-black uppercase rounded-lg", build.active ? "bg-emerald-400 text-emerald-950" : "bg-slate-400 text-white")}>{build.active ? 'Active' : 'Hidden'}</span>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{build.badge}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">#{build.order}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 line-clamp-1">{build.title}</h3>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <Layout className="w-4 h-4" /> {build.alignment}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                    <CheckCircle2 className="w-4 h-4" /> {build.statusTitle}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => handleEdit(build)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 text-xs font-black rounded-xl hover:bg-slate-100"><Edit2 className="w-4 h-4" /> EDIT</button>
                <button onClick={() => { if(window.confirm('Delete build?')) deleteMut.mutate(build._id); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 text-xs font-black rounded-xl hover:bg-rose-100"><Trash2 className="w-4 h-4" /> DELETE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title={selectedItem ? 'Edit Concept Build' : 'Create Concept Build'}
        size="full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
            <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto pr-6 h-[calc(100vh-120px)] pb-32">
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">1. Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Title</label>
                          <input 
                            value={formData.title} 
                            onChange={e => { 
                              const val = e.target.value;
                              updateField('title', val); 
                              if(!selectedItem) {
                                const baseSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                                updateField('slug', baseSlug); 
                              }
                            }} 
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" 
                            placeholder="Enter build title..."
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Slug (Must be unique)</label>
                          <div className="relative">
                            <input 
                              value={formData.slug} 
                              onChange={e => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))} 
                              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-mono text-xs" 
                            />
                            {!selectedItem && (
                              <button 
                                type="button" 
                                onClick={() => updateField('slug', `${formData.slug}-${Math.floor(Math.random() * 1000)}`)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors"
                              >
                                RANDOMIZE
                              </button>
                            )}
                          </div>
                          <p className="text-[9px] text-slate-400 mt-1 font-medium italic">The slug is used for the URL and must be unique across all builds.</p>
                        </div>
                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Badge</label><input value={formData.badge} onChange={e => updateField('badge', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                        <div className="col-span-2"><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Description</label><textarea value={formData.description} onChange={e => updateField('description', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 h-24" /></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">2. Media & Image</h3>
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Image URL</label><input value={formData.image} onChange={e => updateField('image', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">3. Status Floating Card</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Status Title</label><input value={formData.statusTitle} onChange={e => updateField('statusTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Status Subtitle</label><input value={formData.statusSubtitle} onChange={e => updateField('statusSubtitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">4. Call to Action</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">CTA Text</label><input value={formData.ctaText} onChange={e => updateField('ctaText', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">CTA Link</label><input value={formData.ctaLink} onChange={e => updateField('ctaLink', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">5. Layout & Visibility</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Alignment</label>
                            <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl">
                                <button type="button" onClick={() => updateField('alignment', 'left')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all", formData.alignment === 'left' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>IMAGE LEFT</button>
                                <button type="button" onClick={() => updateField('alignment', 'right')} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all", formData.alignment === 'right' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400")}>CONTENT LEFT</button>
                            </div>
                        </div>
                        <div><label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Order</label><input type="number" value={formData.order} onChange={e => updateField('order', Number(e.target.value))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" /></div>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                <input type="checkbox" checked={formData.featured} onChange={e => updateField('featured', e.target.checked)} className="w-6 h-6 rounded-lg text-amber-500" />
                                <div className="flex flex-col"><span className="text-sm font-black text-slate-700">Featured</span><span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Show highlighted</span></div>
                            </label>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                <input type="checkbox" checked={formData.active} onChange={e => updateField('active', e.target.checked)} className="w-6 h-6 rounded-lg text-emerald-500" />
                                <div className="flex flex-col"><span className="text-sm font-black text-slate-700">Active</span><span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Public Visibility</span></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex gap-4 sticky bottom-0 bg-white pb-10 border-t border-slate-50">
                    <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200">CANCEL</button>
                    <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all">SAVE BUILD</button>
                </div>
            </form>

            {/* Live Preview */}
            <div className="hidden lg:block bg-slate-50 rounded-[3rem] p-12 border border-slate-200 h-[calc(100vh-120px)] sticky top-0 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-slate-900 flex items-center gap-3 text-2xl"><Eye className="w-8 h-8 text-indigo-600"/> Live Preview</h3>
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest"><Activity className="w-3.5 h-3.5 animate-pulse" /> Real-time</div>
                </div>
                <div className="flex justify-center scale-75 origin-top mt-10">
                    <BuildPreview build={formData} isLeft={formData.alignment === 'left'} />
                </div>
                <div className="mt-12 p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                    <p className="text-xs text-amber-700 font-bold leading-relaxed italic">"The preview above renders exactly how the concept build will appear on the homepage, including alternating layouts and glassmorphism effects."</p>
                </div>
            </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ConceptBuildCMS;
