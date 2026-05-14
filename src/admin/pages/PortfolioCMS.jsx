import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search as SearchIcon, 
  LayoutGrid, 
  List, 
  Edit2, 
  Trash2, 
  Sparkles, 
  Eye, 
  X,
  MessageSquare,
  BarChart3,
  Globe,
  Smartphone,
  Cpu,
  Clock,
  ArrowRight,
  Bot,
  Wifi,
  MapPin,
  Check,
  Zap,
  Activity,
  Layers,
  Search
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';

// --- DATA MAPS ---

const iconMap = {
  Bot, MessageSquare, BarChart3, Search, Globe, Cpu, Smartphone, Wifi, MapPin
};
const iconsList = Object.keys(iconMap);

const portfolioGradients = [
  { name: 'Purple', value: 'purple', gradient: 'from-[#7c3aed] to-[#a855f7]' },
  { name: 'Indigo', value: 'indigo', gradient: 'from-[#6366f1] to-[#8b5cf6]' },
  { name: 'Blue', value: 'blue', gradient: 'from-[#3b82f6] to-[#06b6d4]' },
  { name: 'Cyan', value: 'cyan', gradient: 'from-[#06b6d4] to-[#22d3ee]' },
  { name: 'Emerald', value: 'emerald', gradient: 'from-[#10b981] to-[#34d399]' },
  { name: 'Orange', value: 'orange', gradient: 'from-[#f59e0b] to-[#f97316]' },
  { name: 'Pink', value: 'pink', gradient: 'from-[#ec4899] to-[#f43f5e]' }
];

const conceptGradients = {
  purple: 'linear-gradient(135deg, #a855f7, #6366f1)',
  indigo: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  blue: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  cyan: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
  emerald: 'linear-gradient(135deg, #059669, #34d399)',
  orange: 'linear-gradient(135deg, #f97316, #fbbf24)',
  pink: 'linear-gradient(135deg, #db2777, #f472b6)'
};

const previewTypes = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'automation', label: 'Automation' },
  { id: 'saas', label: 'SaaS Landing' },
  { id: 'ui-concept', label: 'UI Concept' }
];

const initialPortfolioForm = {
  title: '',
  slug: '',
  shortDescription: '',
  category: 'AI & Automation',
  technologies: [],
  timeline: '4-6 weeks',
  ctaText: 'Request Solution',
  ctaLink: '/contact',
  icon: 'Bot',
  accentColor: 'purple',
  gradientStyle: 'from-[#7c3aed] to-[#a855f7]',
  featured: false,
  active: true,
  order: 0
};

const initialConceptForm = {
  title: '',
  slug: '',
  category: 'AI AUTOMATION',
  description: '',
  technologies: [],
  gradientTheme: 'purple',
  previewType: 'dashboard',
  badgeLabel: 'CONCEPT',
  ctaText: 'Explore Concept',
  ctaLink: '/contact',
  statusLabel: 'Coming Soon',
  featured: false,
  active: true,
  order: 0
};

// --- PREVIEW COMPONENTS ---

const PortfolioCardPreview = ({ project }) => {
  const IconComponent = iconMap[project.icon] || Bot;
  return (
    <div className="bg-white pt-[16px] pb-[20px] px-[24px] rounded-[24px] border border-[#ede9fe] shadow-[0_4px_24px_rgba(124,58,237,0.07)] flex flex-col h-full w-full max-w-[360px]">
      <div className="absolute top-0 left-6 w-12 h-1 rounded-b-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7]"></div>
      <div className="w-[56px] h-[56px] flex items-center justify-center bg-gradient-to-br from-[#f3e8ff] to-[#ede9fe] border border-[#e9d5ff] rounded-[16px] mb-3 text-[#7c3aed]">
        <IconComponent className="w-6 h-6" />
      </div>
      <div className={`h-[3px] w-12 rounded-full mb-3 bg-gradient-to-r ${project.gradientStyle}`} />
      <h3 className="text-[20px] font-[700] text-[#0a0a0a] mb-2">{project.title || 'Project Title'}</h3>
      <p className="text-[#6b7280] text-[15px] leading-[1.7] mb-3 line-clamp-2">{project.shortDescription || 'Description...'}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {(project.technologies?.length > 0 ? project.technologies : ['React', 'AI']).map(tech => (
          <span key={tech} className="px-[14px] py-[5px] text-[12px] font-[600] text-[#7c3aed] bg-[#faf5ff] border border-[#e9d5ff] rounded-[20px]">{tech}</span>
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-[#f3f4f6] flex items-center justify-between">
        <div className="flex items-center text-[#9ca3af] text-[13px]"><Clock className="w-3.5 h-3.5 mr-1.5" />{project.timeline}</div>
        <button className="inline-flex items-center text-[14px] font-[600] text-[#7c3aed]">{project.ctaText}<ArrowRight className="ml-1 w-4 h-4" /></button>
      </div>
    </div>
  );
};

const ConceptCardPreview = ({ concept }) => {
  const getBadgeStyles = () => "absolute top-4 right-4 z-20 px-3 py-1.5 backdrop-blur-md rounded-[20px] border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg bg-black/35";
  
  return (
    <div className="bg-white border border-[#f0ebff] rounded-[20px] shadow-[0_20px_60px_rgba(124,58,237,0.15)] overflow-hidden flex flex-col w-full max-w-[360px]">
      <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center" style={{ background: conceptGradients[concept.gradientTheme] }}>
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Mockup Placeholder */}
            <div className="w-[85%] h-[75%] bg-white/40 backdrop-blur-md rounded-lg border border-white/30 shadow-2xl flex flex-col overflow-hidden">
                <div className="h-4 bg-white/50 border-b border-white/20 flex items-center px-2 gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#ff5f56]" />
                    <div className="w-1 h-1 rounded-full bg-[#ffbd2e]" />
                    <div className="w-1 h-1 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 p-3 space-y-2">
                    <div className="w-[60%] h-2 bg-white/60 rounded" />
                    <div className="w-[80%] h-2 bg-white/40 rounded" />
                    <div className="w-[40%] h-2 bg-white/20 rounded" />
                </div>
            </div>
        </div>
        <div className={getBadgeStyles()}>{concept.badgeLabel}</div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4"><span className="inline-block bg-[#faf5ff] border border-[#e9d5ff] text-[#7c3aed] text-[11px] font-bold tracking-[0.05em] px-3.5 py-1.5 rounded-[20px] uppercase">{concept.category}</span></div>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-3">{concept.title || 'Concept Title'}</h3>
        <p className="text-[#6b7280] text-[14px] mb-6 leading-[1.7] line-clamp-2">{concept.description || 'Description...'}</p>
        <div className="flex flex-wrap gap-2 mb-8">
            {(concept.technologies?.length > 0 ? concept.technologies : ['Next.js', 'PostgreSQL']).map(tech => (
                <span key={tech} className="px-2.5 py-1 text-[12px] font-medium text-[#374151] bg-[#f8f8f8] border border-[#eeeeee] rounded-[6px]">{tech}</span>
            ))}
        </div>
        <div className="mt-auto pt-6 border-t border-[#f3f0ff] flex items-center justify-between">
            <button className="text-[#7c3aed] text-[13px] font-semibold inline-flex items-center">{concept.ctaText}<ArrowRight className="ml-1.5 w-4 h-4" /></button>
            <div className="bg-[#fef9c3] text-[#854d0e] border border-[#fde68a] text-[11px] font-semibold px-3 py-1 rounded-[20px]">{concept.statusLabel}</div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CMS PAGE ---

const PortfolioCMS = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [formData, setFormData] = useState(initialPortfolioForm);
  const [techInput, setTechInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  // Queries
  const { data: portfolioResult, isLoading: isPortfolioLoading } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: () => apiClient.get('/portfolio-projects'),
  });

  const { data: conceptResult, isLoading: isConceptLoading } = useQuery({
    queryKey: ['admin-concepts'],
    queryFn: () => apiClient.get('/concept-projects'),
  });

  // Mutations
  const mutationConfig = (key) => ({
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
      setIsDrawerOpen(false);
    },
  });

  const createPortfolio = useMutation({ mutationFn: (data) => apiClient.post('/portfolio-projects', data), ...mutationConfig('admin-portfolio') });
  const updatePortfolio = useMutation({ mutationFn: ({ id, data }) => apiClient.put(`/portfolio-projects/${id}`, data), ...mutationConfig('admin-portfolio') });
  const deletePortfolio = useMutation({ mutationFn: (id) => apiClient.delete(`/portfolio-projects/${id}`), ...mutationConfig('admin-portfolio') });

  const createConcept = useMutation({ mutationFn: (data) => apiClient.post('/concept-projects', data), ...mutationConfig('admin-concepts') });
  const updateConcept = useMutation({ mutationFn: ({ id, data }) => apiClient.put(`/concept-projects/${id}`, data), ...mutationConfig('admin-concepts') });
  const deleteConcept = useMutation({ mutationFn: (id) => apiClient.delete(`/concept-projects/${id}`), ...mutationConfig('admin-concepts') });

  const projects = portfolioResult?.results || [];
  const concepts = conceptResult?.results || [];

  const items = activeTab === 'portfolio' ? projects : concepts;
  const filteredItems = items.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({ ...(activeTab === 'portfolio' ? initialPortfolioForm : initialConceptForm), ...item });
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setFormData(activeTab === 'portfolio' ? initialPortfolioForm : initialConceptForm);
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'portfolio') {
      if (selectedItem) updatePortfolio.mutate({ id: selectedItem._id || selectedItem.id, data: formData });
      else createPortfolio.mutate(formData);
    } else {
      if (selectedItem) updateConcept.mutate({ id: selectedItem._id || selectedItem.id, data: formData });
      else createConcept.mutate(formData);
    }
  };

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const addTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(techInput.trim())) {
        updateField('technologies', [...formData.technologies, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const removeTech = (tech) => updateField('technologies', formData.technologies.filter(t => t !== tech));

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portfolio & Concepts CMS</h1>
          <p className="text-slate-500 font-medium mt-1">Manage public projects and engineering concepts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-2xl mr-4">
            <button 
                onClick={() => setActiveTab('portfolio')}
                className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all", activeTab === 'portfolio' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}
            >Portfolio</button>
            <button 
                onClick={() => setActiveTab('concept')}
                className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all", activeTab === 'concept' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500")}
            >Concepts</button>
          </div>

          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none w-48 shadow-sm" />
          </div>
          
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            NEW {activeTab === 'portfolio' ? 'PROJECT' : 'CONCEPT'}
          </button>
        </div>
      </div>

      {/* Grid List Section */}
      {(activeTab === 'portfolio' ? isPortfolioLoading : isConceptLoading) ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 rounded-[2.5rem] animate-pulse" />)}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-slate-200">
          <Sparkles className="w-16 h-16 text-slate-200 mb-6" />
          <h3 className="text-xl font-bold text-slate-900">Nothing Found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, i) => (
            <motion.div 
              key={item._id || item.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-slate-100">
                  {activeTab === 'portfolio' ? (
                      React.createElement(iconMap[item.icon] || Bot, { className: "w-7 h-7" })
                  ) : (
                      <div className={cn("w-full h-full rounded-2xl bg-gradient-to-br", item.gradientTheme === 'purple' ? 'from-purple-500 to-indigo-500' : 'from-blue-500 to-cyan-500')} />
                  )}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => { if (window.confirm('Delete this?')) (activeTab === 'portfolio' ? deletePortfolio : deleteConcept).mutate(item._id || item.id); }} className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-600 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest", item.active ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>{item.active ? 'Active' : 'Inactive'}</span>
                  {item.featured && <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><Sparkles className="w-2 h-2" /> Featured</span>}
                  <span className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest">Order: {item.order}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight mt-3">{item.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</span>
                  {activeTab === 'portfolio' && <><span className="text-slate-300">•</span><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.timeline}</span></>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Editor Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title={selectedItem ? `Edit ${activeTab === 'portfolio' ? 'Project' : 'Concept'}` : `Create ${activeTab === 'portfolio' ? 'Project' : 'Concept'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto pr-4 h-[calc(100vh-120px)] pb-32">
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-indigo-100 pb-2">1. Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                  <input required value={formData.title} onChange={e => { updateField('title', e.target.value); if (!selectedItem) updateField('slug', e.target.value.toLowerCase().replace(/ /g, '-')); }} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Slug</label>
                  <input required value={formData.slug} onChange={e => updateField('slug', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                  <input required value={formData.category} onChange={e => updateField('category', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" placeholder={activeTab === 'portfolio' ? "e.g. AI & Automation" : "e.g. AI AUTOMATION"} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">{activeTab === 'portfolio' ? 'Short Description' : 'Description'}</label>
                  <textarea required value={activeTab === 'portfolio' ? formData.shortDescription : formData.description} onChange={e => updateField(activeTab === 'portfolio' ? 'shortDescription' : 'description', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none h-24" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-indigo-100 pb-2">2. Technologies</h3>
              <div className="space-y-3">
                <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={addTech} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" placeholder="Add tech..." />
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold flex items-center gap-1">{tech}<button type="button" onClick={() => removeTech(tech)}><X className="w-3 h-3" /></button></span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-indigo-100 pb-2">3. Visual System</h3>
              {activeTab === 'portfolio' ? (
                  <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Select Icon</label>
                        <div className="grid grid-cols-5 gap-2">
                            {iconsList.map(icon => (
                                <button key={icon} type="button" onClick={() => updateField('icon', icon)} className={cn("p-3 rounded-xl border flex flex-col items-center gap-1", formData.icon === icon ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-slate-500")}>
                                    {React.createElement(iconMap[icon], { className: "w-5 h-5" })}
                                    <span className="text-[7px] uppercase truncate">{icon}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Theme</label>
                        <div className="grid grid-cols-2 gap-2">
                            {portfolioGradients.map(preset => (
                                <button key={preset.value} type="button" onClick={() => { updateField('accentColor', preset.value); updateField('gradientStyle', preset.gradient); }} className={cn("px-4 py-3 rounded-xl border text-sm font-bold text-left", formData.accentColor === preset.value ? "border-indigo-600 ring-2 ring-indigo-50" : "border-slate-200")}>
                                    <div className={cn("w-full h-2 rounded-full mb-1 bg-gradient-to-r", preset.gradient)} />
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>
                  </div>
              ) : (
                  <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Gradient Theme</label>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.keys(conceptGradients).map(theme => (
                                <button key={theme} type="button" onClick={() => updateField('gradientTheme', theme)} className={cn("h-12 rounded-xl border transition-all", formData.gradientTheme === theme ? "ring-4 ring-indigo-100 border-indigo-600" : "border-slate-200")} style={{ background: conceptGradients[theme] }} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Preview Type</label>
                        <select value={formData.previewType} onChange={e => updateField('previewType', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                            {previewTypes.map(type => <option key={type.id} value={type.id}>{type.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Badge Label</label>
                        <input value={formData.badgeLabel} onChange={e => updateField('badgeLabel', e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                    </div>
                  </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-indigo-100 pb-2">4. Settings & Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase">CTA Text</label><input value={formData.ctaText} onChange={e => updateField('ctaText', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase">CTA Link</label><input value={formData.ctaLink} onChange={e => updateField('ctaLink', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                {activeTab === 'portfolio' ? (
                    <div className="col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Timeline</label><input value={formData.timeline} onChange={e => updateField('timeline', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                ) : (
                    <div className="col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Status Label</label><input value={formData.statusLabel} onChange={e => updateField('statusLabel', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
                )}
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input type="checkbox" checked={formData.active} onChange={e => updateField('active', e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
                    <span className="font-bold text-slate-700 text-sm">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <input type="checkbox" checked={formData.featured} onChange={e => updateField('featured', e.target.checked)} className="w-5 h-5 rounded text-indigo-600" />
                    <span className="font-bold text-slate-700 text-sm">Featured</span>
                </label>
                <div className="col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Order</label><input type="number" value={formData.order} onChange={e => updateField('order', Number(e.target.value))} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" /></div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white p-4 -mx-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              <button type="button" onClick={() => setIsDrawerOpen(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200">Cancel</button>
              <button type="submit" disabled={createPortfolio.isPending || updatePortfolio.isPending || createConcept.isPending || updateConcept.isPending} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg flex items-center gap-2">
                {selectedItem ? 'Update' : 'Create'} {activeTab === 'portfolio' ? 'Project' : 'Concept'}
              </button>
            </div>
          </form>

          <div className="hidden lg:block bg-slate-50 rounded-3xl p-8 border border-slate-200 h-[calc(100vh-120px)] sticky top-0 overflow-y-auto">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2"><Eye className="w-5 h-5 text-indigo-600"/> Live Website Preview</h3>
            <div className="flex justify-center scale-90 origin-top">
              {activeTab === 'portfolio' ? <PortfolioCardPreview project={formData} /> : <ConceptCardPreview concept={formData} />}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PortfolioCMS;
