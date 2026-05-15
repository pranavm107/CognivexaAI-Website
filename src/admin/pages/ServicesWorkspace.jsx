import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Globe, Sparkles, LayoutGrid, List, Edit2, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';
import { ServiceCard } from '../../components/services/ServiceCard';
import ShowcaseCard from '../../components/services/ShowcaseCard';

const gradients = [
  { label: 'Purple', value: 'from-purple-500 to-purple-400', bg: 'bg-purple-50', text: 'text-purple-600' },
  { label: 'Indigo', value: 'from-indigo-500 to-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  { label: 'Blue', value: 'from-blue-500 to-blue-400', bg: 'bg-blue-50', text: 'text-blue-600' },
  { label: 'Teal', value: 'from-teal-500 to-teal-400', bg: 'bg-teal-50', text: 'text-teal-600' },
  { label: 'Orange', value: 'from-orange-500 to-orange-400', bg: 'bg-orange-50', text: 'text-orange-600' },
  { label: 'Pink', value: 'from-pink-500 to-pink-400', bg: 'bg-pink-50', text: 'text-pink-600' },
  { label: 'Emerald', value: 'from-emerald-500 to-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { label: 'Cyan', value: 'from-cyan-500 to-cyan-400', bg: 'bg-cyan-50', text: 'text-cyan-600' },
];

const iconsList = ['Bot', 'Code2', 'Globe', 'Smartphone', 'Rocket', 'Zap', 'Cpu', 'Layout', 'Cloud', 'Boxes'];

const initialForm = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  icon: 'Globe',
  iconColor: 'text-blue-600',
  backgroundColor: 'bg-blue-50',
  accentGradient: 'from-blue-500 to-blue-400',
  category: 'General',
  offerings: [''],
  technologies: [],
  featured: false,
  active: true,
  order: 0,
  pricing: { starter: '', growth: '', enterprise: '' },
  metrics: { projectsCompleted: 0, automationRate: '', avgDelivery: '' },
  ctaText: 'Explore Service',
  seoTitle: '',
  seoDescription: ''
};

const initialShowcaseForm = {
  title: '',
  slug: '',
  shortDescription: '',
  image: '',
  category: 'AI',
  technologies: [],
  ctaText: 'View Case Study',
  ctaLink: '#',
  featured: false,
  active: true,
  order: 0
};

const ServicesWorkspace = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('services');
  const [viewMode, setViewMode] = useState('grid');
  const [formData, setFormData] = useState(initialForm);
  const [techInput, setTechInput] = useState('');
  
  const queryClient = useQueryClient();

  // ... (useQuery and useMutation hooks stay as they are)

  const { data: servicesResult, isLoading: isServicesLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: () => apiClient.get('/services'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => apiClient.post('/services', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-services']);
      setIsDrawerOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-services']);
      setIsDrawerOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/services/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['admin-services']),
  });

  const { data: showcaseResult, isLoading: isShowcaseLoading } = useQuery({
    queryKey: ['admin-showcase'],
    queryFn: () => apiClient.get('/showcase-projects'),
  });

  const createShowcaseMutation = useMutation({
    mutationFn: (data) => apiClient.post('/showcase-projects', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-showcase']);
      setIsDrawerOpen(false);
    },
  });

  const updateShowcaseMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.put(`/showcase-projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-showcase']);
      setIsDrawerOpen(false);
    },
  });

  const deleteShowcaseMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/showcase-projects/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['admin-showcase']),
  });

  const services = servicesResult?.data?.results || servicesResult?.results || [];
  const showcaseProjects = showcaseResult?.data?.results || showcaseResult?.results || [];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({ ...(activeTab === 'services' ? initialForm : initialShowcaseForm), ...item });
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setFormData(activeTab === 'services' ? initialForm : initialShowcaseForm);
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'services') {
      if (selectedItem) {
        updateMutation.mutate({ id: selectedItem._id || selectedItem.id, data: formData });
      } else {
        createMutation.mutate(formData);
      }
    } else {
      if (selectedItem) {
        updateShowcaseMutation.mutate({ id: selectedItem._id || selectedItem.id, data: formData });
      } else {
        createShowcaseMutation.mutate(formData);
      }
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOfferingChange = (index, value) => {
    const newOfferings = [...formData.offerings];
    newOfferings[index] = value;
    updateField('offerings', newOfferings);
  };

  const addOffering = () => {
    updateField('offerings', [...formData.offerings, '']);
  };

  const removeOffering = (index) => {
    const newOfferings = formData.offerings.filter((_, i) => i !== index);
    updateField('offerings', newOfferings);
  };

  const addTech = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies.includes(techInput.trim())) {
        updateField('technologies', [...formData.technologies, techInput.trim()]);
      }
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    updateField('technologies', formData.technologies.filter(t => t !== tech));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {activeTab === 'services' ? 'Services CMS' : 'Showcase Projects CMS'}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {activeTab === 'services' ? 'Manage dynamic website service offerings' : 'Manage "Work That Speaks" portfolio cards'}
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('services')}
              className={cn(
                "px-6 py-2 rounded-xl text-xs font-black transition-all",
                activeTab === 'services' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              SERVICES
            </button>
            <button 
              onClick={() => setActiveTab('showcase')}
              className={cn(
                "px-6 py-2 rounded-xl text-xs font-black transition-all",
                activeTab === 'showcase' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              SHOWCASE
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group active:scale-95"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              {activeTab === 'services' ? 'NEW SERVICE' : 'NEW PROJECT'}
            </button>
          </div>
        </div>
      </div>

      {(activeTab === 'services' ? isServicesLoading : isShowcaseLoading) ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="h-64 bg-slate-100 rounded-[2.5rem] animate-pulse" />
          ))}
        </div>
      ) : (activeTab === 'services' ? services.length === 0 : showcaseProjects.length === 0) ? (
        <div className="py-10 md:py-undefined flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-slate-200">
          <Sparkles className="w-16 h-16 text-slate-200 mb-6" />
          <h3 className="text-xl font-bold text-slate-900">No {activeTab === 'services' ? 'Services' : 'Projects'}</h3>
          <p className="text-slate-500 mt-2">Create a {activeTab === 'services' ? 'service' : 'project'} to display on the website.</p>
        </div>
      ) : (
        <div className={cn(
          "grid gap-8",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
        )}>
          {(activeTab === 'services' ? services : showcaseProjects).map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={item._id || item.id} 
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${item.backgroundColor || 'bg-slate-100'} rounded-2xl flex items-center justify-center ${item.iconColor || 'text-slate-600'}`}>
                  {activeTab === 'services' ? <Globe className="w-7 h-7" /> : <img src={item.image} alt="" className="w-full h-full object-cover rounded-2xl" />}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm transition-all">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this?')) {
                        if (activeTab === 'services') deleteMutation.mutate(item._id || item.id);
                        else deleteShowcaseMutation.mutate(item._id || item.id);
                      }
                    }} 
                    className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-600 shadow-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                    item.active ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                  {item.featured && (
                    <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-2 h-2" /> Featured
                    </span>
                  )}
                  <span className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                    Order: {item.order}
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight mt-3">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium line-clamp-2 mt-2">{item.shortDescription}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title={selectedItem ? `Edit ${activeTab === 'services' ? 'Service' : 'Project'}` : `Create ${activeTab === 'services' ? 'Service' : 'Project'}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto pr-4 h-[calc(100vh-120px)] pb-32">
            
            {activeTab === 'services' ? (
              <>
                {/* Section 1 - Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">1. Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                      <input required value={formData.title} onChange={e => {
                        updateField('title', e.target.value);
                        if (!selectedItem) {
                          updateField('slug', e.target.value.toLowerCase().replace(/ /g, '-'));
                        }
                      }} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Slug</label>
                      <input required value={formData.slug} onChange={e => updateField('slug', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Short Description</label>
                      <textarea required value={formData.shortDescription} onChange={e => updateField('shortDescription', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none h-24" />
                    </div>
                  </div>
                </div>

                {/* Section 2 - Visual System */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">2. Visual System</h3>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Icon</label>
                    <div className="flex flex-wrap gap-2">
                      {iconsList.map(icon => (
                        <button key={icon} type="button" onClick={() => updateField('icon', icon)} className={cn("px-3 py-1.5 rounded-lg border text-sm font-medium", formData.icon === icon ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-white border-slate-200 text-slate-600")}>
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Color Theme</label>
                    <div className="grid grid-cols-2 gap-2">
                      {gradients.map(grad => (
                        <button key={grad.label} type="button" onClick={() => {
                          updateField('accentGradient', grad.value);
                          updateField('backgroundColor', grad.bg);
                          updateField('iconColor', grad.text);
                        }} className={cn("px-3 py-2 rounded-lg border text-sm font-medium text-left", formData.accentGradient === grad.value ? "border-indigo-500 ring-1 ring-indigo-500" : "border-slate-200")}>
                          <div className={cn("w-full h-2 rounded-full mb-1 bg-gradient-to-r", grad.value)} />
                          {grad.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 3 - Offerings */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">3. Offerings</h3>
                  <div className="space-y-2">
                    {formData.offerings.map((offering, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input value={offering} onChange={e => handleOfferingChange(index, e.target.value)} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" placeholder="e.g. AI Chatbots & Virtual Assistants" />
                        <button type="button" onClick={() => removeOffering(index)} className="p-3 text-rose-500 bg-rose-50 rounded-xl hover:bg-rose-100"><X className="w-5 h-5"/></button>
                      </div>
                    ))}
                    <button type="button" onClick={addOffering} className="text-sm font-bold text-indigo-600 hover:text-indigo-800">+ Add Offering</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Showcase Project Form */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">1. Project Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                      <input required value={formData.title} onChange={e => {
                        updateField('title', e.target.value);
                        if (!selectedItem) {
                          updateField('slug', e.target.value.toLowerCase().replace(/ /g, '-'));
                        }
                      }} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Slug</label>
                      <input required value={formData.slug} onChange={e => updateField('slug', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                      <input required value={formData.category} onChange={e => updateField('category', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" placeholder="e.g. AI, SAAS, MOBILE" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Short Description</label>
                      <textarea required value={formData.shortDescription} onChange={e => updateField('shortDescription', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none h-24" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">2. Media & Links</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase">Image URL</label>
                      <input required value={formData.image} onChange={e => updateField('image', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" placeholder="/images/portfolio/project.png" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">CTA Text</label>
                        <input value={formData.ctaText} onChange={e => updateField('ctaText', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">CTA Link</label>
                        <input value={formData.ctaLink} onChange={e => updateField('ctaLink', e.target.value)} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">3. Technologies</h3>
                  <div className="space-y-3">
                    <input 
                      value={techInput} 
                      onChange={e => setTechInput(e.target.value)} 
                      onKeyDown={addTech}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" 
                      placeholder="Type and press Enter..." 
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold flex items-center gap-1">
                          {tech}
                          <button type="button" onClick={() => removeTech(tech)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Section 4 - Status (Common) */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">{activeTab === 'services' ? '4. Status & Order' : '4. Status & Display'}</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.active} onChange={e => updateField('active', e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="font-medium text-slate-700">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={e => updateField('featured', e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="font-medium text-slate-700">Featured</span>
                </label>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Display Order</label>
                  <input type="number" value={formData.order} onChange={e => updateField('order', Number(e.target.value))} className="w-full mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white p-4 -mx-4 rounded-t-2xl shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              <button type="button" onClick={() => setIsDrawerOpen(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">Cancel</button>
              <button 
                type="submit" 
                disabled={createMutation.isPending || updateMutation.isPending || createShowcaseMutation.isPending || updateShowcaseMutation.isPending} 
                className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
              >
                {selectedItem ? `Update ${activeTab === 'services' ? 'Service' : 'Project'}` : `Create ${activeTab === 'services' ? 'Service' : 'Project'}`}
              </button>
            </div>
          </form>

          <div className="hidden lg:block bg-slate-50 rounded-3xl p-8 border border-slate-200 h-[calc(100vh-120px)] sticky top-0 overflow-hidden">
            <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2"><Eye className="w-5 h-5 text-indigo-600"/> Live Website Preview</h3>
            <div className="max-w-sm mx-auto pointer-events-none scale-90 origin-top">
              {activeTab === 'services' ? (
                <ServiceCard service={formData} />
              ) : (
                <div className="w-[400px]">
                  <ShowcaseCard project={formData} index={0} />
                </div>
              )}
            </div>
            <p className="text-center text-slate-400 text-sm mt-8">This is exactly how it will appear on the public Services page.</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ServicesWorkspace;
