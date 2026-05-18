import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';

const AVAILABLE_ICONS = [
  "Zap", "Cpu", "Shield", "Layers", "Activity", "Database", "Cloud", 
  "Settings", "Terminal", "Code", "Server", "Workflow", "TrendingUp", 
  "Search", "User", "Globe", "MessageSquare", "Lock"
];

const STATUS_COLORS = [
  { value: "green", label: "Emerald Green" },
  { value: "blue", label: "Ocean Blue" },
  { value: "purple", label: "Royal Purple" },
  { value: "amber", label: "Amber Yellow" },
  { value: "rose", label: "Coral Rose" },
  { value: "indigo", label: "Deep Indigo" }
];

const AUTOFILL_SERVICES = [
  "AI & Automation",
  "Custom Software",
  "Web Development",
  "Mobile App",
  "IoT Solutions",
  "UI/UX Design",
  "DevOps",
  "Startup MVP",
  "Other"
];

const AUTOFILL_BUDGETS = [
  "< $5k",
  "$5k - $20k",
  "$20k - $50k",
  "$50k+"
];

const AUTOFILL_TIMELINES = [
  "Immediate",
  "1-3 Months",
  "3-6 Months",
  "Just Exploring"
];

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
  order: 0,

  // Hero Section
  heroTitle: '',
  heroDescription: '',
  heroBadge: 'CONCEPT BUILD',
  heroImage: '',
  heroButtonText: 'Inquire for Similar Solution',

  // Production Status Card
  productionStatusTitle: 'Production Status',
  productionStatusLabel: 'Battle-Ready',
  productionStatusIcon: 'Zap',
  productionStatusColor: 'green',

  // Engineering Standards Section
  engineeringSectionTitle: 'Engineering Standards',
  engineeringSectionDescription: 'Every build follows our core architectural principles.',

  // Engineering Cards Repeater Array
  engineeringCards: [
    { icon: 'Zap', title: 'Optimized Performance', description: 'Edge-ready execution with sub-200ms latency.' }
  ],

  // Business CTA Section
  businessCtaTitle: 'Ready to see this in your business?',
  businessCtaDescription: 'This concept represents our engineering quality. We can architect and deploy a custom version of this solution tailored to your data and operations.',
  businessCtaButtonText: 'Request Case Study & Quote',

  // Inquiry Autofill Configuration
  contactService: '',
  contactBudget: '',
  contactTimeline: '',
  contactMessage: '',

  // Portfolio Metadata
  buildType: '',
  industry: '',
  deploymentType: '',
  architectureType: '',
  readinessLevel: '',

  // SEO
  metaTitle: '',
  metaDescription: ''
};

// --- REAL-TIME HIGH-FIDELITY SIDEBAR PREVIEW ---
const DetailPreview = ({ build }) => {
  const getStatusColorClasses = (colorName) => {
    const colors = {
      green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100',
      amber: 'bg-amber-50 text-amber-600 border-amber-100',
      rose: 'bg-rose-50 text-rose-600 border-rose-100',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    };
    return colors[colorName?.toLowerCase()] || colors.green;
  };

  const heroTitle = build.heroTitle || build.title || 'Build Title';
  const heroDescription = build.heroDescription || build.description || 'Description goes here...';
  const heroBadge = build.heroBadge || build.badge || 'CONCEPT BUILD';
  const heroImage = build.heroImage || build.image || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80';
  const heroButtonText = build.heroButtonText || 'Inquire for Similar Solution';

  const productionStatusTitle = build.productionStatusTitle || 'Production Status';
  const productionStatusLabel = build.productionStatusLabel || 'Battle-Ready';
  const productionStatusIconName = build.productionStatusIcon || 'Zap';
  const StatusIconComponent = Icons[productionStatusIconName] || Icons.Zap;

  const engineeringSectionTitle = build.engineeringSectionTitle || 'Engineering Standards';
  const engineeringSectionDescription = build.engineeringSectionDescription || 'Every build follows our core architectural principles.';
  const engineeringCards = build.engineeringCards || [];

  const businessCtaTitle = build.businessCtaTitle || 'Ready to see this in your business?';
  const businessCtaDescription = build.businessCtaDescription || 'This concept represents our engineering quality. We can architect and deploy a custom version...';
  const businessCtaButtonText = build.businessCtaButtonText || 'Request Case Study & Quote';

  const hasMetadata = build.buildType || build.industry || build.deploymentType || build.architectureType || build.readinessLevel;

  return (
    <div className="bg-white text-slate-800 w-full rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden text-xs text-left max-w-lg mx-auto">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 border-b border-gray-200">
        <div className="w-2 h-2 rounded-full bg-red-400"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
        <div className="w-2 h-2 rounded-full bg-green-400"></div>
        <span className="ml-3 font-mono text-[8px] text-gray-400 select-none truncate">cognivexa.ai/portfolio/{build.slug || 'slug'}</span>
      </div>

      {/* Detail Hero Section */}
      <div className="relative p-6 overflow-hidden bg-white border-b border-slate-50">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-1 bg-purple-50 text-purple-600 text-[8px] font-black uppercase tracking-wider rounded-full">
              {heroBadge}
            </span>
            <h1 className="text-xl font-black text-slate-900 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-slate-500 text-[9px] leading-relaxed line-clamp-3">
              {heroDescription}
            </p>
            <button type="button" className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg text-[8px] flex items-center gap-1 cursor-not-allowed">
              {heroButtonText}
              <Icons.ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>

          <div className="relative mt-2">
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-100 aspect-[16/10] bg-slate-50">
              <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
            </div>
            
            {/* Status Card */}
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg border border-slate-50 z-20 flex items-center gap-2">
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center border", getStatusColorClasses(build.productionStatusColor))}>
                <StatusIconComponent className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{productionStatusTitle}</div>
                <div className="text-[10px] font-black text-slate-900 leading-none mt-0.5">{productionStatusLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Metadata Panel */}
      {hasMetadata && (
        <div className="bg-slate-50 p-4 border-b border-slate-100">
          <div className="grid grid-cols-2 gap-3 text-[9px]">
            {build.buildType && (
              <div>
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Build Type</span>
                <span className="block font-bold text-slate-900">{build.buildType}</span>
              </div>
            )}
            {build.industry && (
              <div>
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Industry</span>
                <span className="block font-bold text-slate-900">{build.industry}</span>
              </div>
            )}
            {build.deploymentType && (
              <div>
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Deployment</span>
                <span className="block font-bold text-slate-900">{build.deploymentType}</span>
              </div>
            )}
            {build.architectureType && (
              <div>
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Architecture</span>
                <span className="block font-bold text-slate-900">{build.architectureType}</span>
              </div>
            )}
            {build.readinessLevel && (
              <div className="col-span-2">
                <span className="block text-[7px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Readiness</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded text-[8px] border border-emerald-100 mt-0.5">
                  {build.readinessLevel}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Engineering Standards */}
      <div className="p-6 bg-slate-50/50 border-b border-slate-100">
        <div className="text-center mb-4">
          <h2 className="text-sm font-black text-slate-900">{engineeringSectionTitle}</h2>
          <p className="text-slate-500 text-[8px] mt-0.5">{engineeringSectionDescription}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {engineeringCards.map((card, idx) => {
            const CardIcon = Icons[card.icon] || Icons.Zap;
            return (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-left">
                <div className="w-6 h-6 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-2">
                  <CardIcon className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-slate-900 text-[9px] leading-tight mb-1">{card.title || 'Standard'}</h4>
                <p className="text-slate-500 text-[8px] leading-relaxed line-clamp-2">{card.description || 'Description...'}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Business CTA */}
      <div className="p-6 text-center bg-white">
        <h2 className="text-sm font-black text-slate-900 mb-1">{businessCtaTitle}</h2>
        <p className="text-slate-500 text-[8px] max-w-xs mx-auto mb-3 line-clamp-2">{businessCtaDescription}</p>
        <button type="button" className="px-4 py-2 bg-purple-600 text-white font-black rounded-lg text-[8px] cursor-not-allowed w-full">
          {businessCtaButtonText}
        </button>
      </div>
    </div>
  );
};// --- MAIN CMS MANAGEMENT SYSTEM ---
const ConceptBuildCMS = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  
  // Custom Workspace States
  const [autosaveState, setAutosaveState] = useState('saved'); // 'saved' | 'saving' | 'unsaved'
  const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  // Accordion open/close state (matching 8 sections)
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    heroConfig: false,
    productionStatus: false,
    engineeringStandards: false,
    architectureDetails: false,
    inquiryAutofill: false,
    ctaConfig: false,
    seoMetadata: false
  });

  const toggleSection = (sec) => {
    setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

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
    setFormData({
      ...initialForm,
      ...item,
      engineeringCards: item.engineeringCards || []
    });
    setOpenSections({
      basicInfo: true,
      heroConfig: false,
      productionStatus: false,
      engineeringStandards: false,
      architectureDetails: false,
      inquiryAutofill: false,
      ctaConfig: false,
      seoMetadata: false
    });
    setAutosaveState('saved');
    setIsDrawerOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setFormData(initialForm);
    setOpenSections({
      basicInfo: true,
      heroConfig: false,
      productionStatus: false,
      engineeringStandards: false,
      architectureDetails: false,
      inquiryAutofill: false,
      ctaConfig: false,
      seoMetadata: false
    });
    setAutosaveState('saved');
    setIsDrawerOpen(true);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.title) {
        alert('Please provide a title');
        return;
    }
    if (!formData.slug) {
        alert('Please provide a slug');
        return;
    }
    if (!formData.image) {
        alert('Please provide a primary image URL');
        return;
    }
    mutation.mutate(formData);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setAutosaveState('unsaved');
  };

  // Autosave Simulator Engine
  React.useEffect(() => {
    if (autosaveState === 'unsaved') {
      const timer = setTimeout(() => {
        setAutosaveState('saving');
        const saveTimer = setTimeout(() => {
          setAutosaveState('saved');
          setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 800);
        return () => clearTimeout(saveTimer);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [autosaveState]);

  // Engineering cards repeater actions
  const addEngineeringCard = () => {
    setFormData(prev => ({
      ...prev,
      engineeringCards: [
        ...(prev.engineeringCards || []),
        { icon: 'Zap', title: '', description: '' }
      ]
    }));
    setAutosaveState('unsaved');
  };

  const removeEngineeringCard = (index) => {
    setFormData(prev => ({
      ...prev,
      engineeringCards: (prev.engineeringCards || []).filter((_, idx) => idx !== index)
    }));
    setAutosaveState('unsaved');
  };

  const updateEngineeringCard = (index, field, value) => {
    setFormData(prev => {
      const cards = [...(prev.engineeringCards || [])];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, engineeringCards: cards };
    });
    setAutosaveState('unsaved');
  };

  const moveEngineeringCard = (index, direction) => {
    setFormData(prev => {
      const cards = [...(prev.engineeringCards || [])];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= cards.length) return prev;
      
      const temp = cards[index];
      cards[index] = cards[targetIndex];
      cards[targetIndex] = temp;
      
      return { ...prev, engineeringCards: cards };
    });
    setAutosaveState('unsaved');
  };

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto animate-in fade-in duration-700 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Concept Builds CMS</h1>
          <p className="text-slate-500 font-medium mt-2">Manage portfolio details, architectural standards, auto-inquiry workflows, and hero configurations.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1"
        >
          <Icons.Plus className="w-5 h-5" /> NEW ENTERPRISE BUILD
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {builds.map(build => (
          <div key={build._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all flex flex-col justify-between h-full">
            <div>
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
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{build.description}</p>
                
                {/* Spec tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {build.buildType && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded">{build.buildType}</span>}
                  {build.industry && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded">{build.industry}</span>}
                </div>
              </div>
            </div>
            
            <div className="px-8 pb-8 space-y-4">
              <div className="flex gap-3 pt-4 border-t border-slate-50">
                <button onClick={() => handleEdit(build)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 text-xs font-black rounded-xl hover:bg-slate-100"><Icons.Edit2 className="w-4 h-4" /> EDIT</button>
                <button onClick={() => { if(window.confirm('Delete build?')) deleteMut.mutate(build._id); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 text-xs font-black rounded-xl hover:bg-rose-100"><Icons.Trash2 className="w-4 h-4" /> DELETE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bespoke Premium Full-Screen Editor Workspace */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-[4px] flex items-center justify-center overflow-hidden">
            {/* Main overlay modal sheet */}
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 220 }}
              className="bg-white w-full h-full flex flex-col relative shadow-[0_-20px_50px_rgba(0,0,0,0.15)]"
            >
              
              {/* 1. TOP STICKY HEADER (72px) */}
              <div className="h-[72px] bg-white/90 backdrop-blur-md border-b border-slate-200/70 flex items-center justify-between px-8 z-30 sticky top-0 shrink-0">
                {/* Left info stack */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shadow-sm hidden md:flex">
                    <Icons.Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
                      {selectedItem ? `Edit: ${formData.title || 'Enterprise Build'}` : 'Create Enterprise Concept Build'}
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-md text-[9px] font-black uppercase tracking-wider">
                        Cognivexa AI CMS
                      </span>
                      <span className="text-[10px] text-slate-300 font-bold">•</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        {formData.active ? (
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>Published</span>
                        ) : (
                          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span>Draft</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle: Simulated Autosave Status */}
                <div className="flex items-center gap-3">
                  {autosaveState === 'saving' && (
                    <div className="flex items-center gap-1.5 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-100 animate-pulse">
                      <Icons.RotateCw className="w-3 h-3 animate-spin text-purple-500" />
                      Autosaving...
                    </div>
                  )}
                  {autosaveState === 'saved' && (
                    <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 transition-all duration-300">
                      <Icons.Check className="w-3 h-3 text-emerald-500 font-extrabold" />
                      Saved
                    </div>
                  )}
                  {autosaveState === 'unsaved' && (
                    <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100 transition-all duration-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                      Unsaved changes
                    </div>
                  )}
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider hidden lg:inline bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">
                    Last sync: {lastSavedTime}
                  </span>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsDrawerOpen(false)}
                    className="h-11 px-5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all font-bold text-xs uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { updateField('active', false); setTimeout(() => handleSubmit(), 50); }}
                    className="h-11 px-5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                  >
                    Save Draft
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { updateField('active', true); setTimeout(() => handleSubmit(), 50); }}
                    className="h-11 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center gap-2 hover:-translate-y-[1px] active:translate-y-0"
                  >
                    <Icons.Save className="w-4 h-4" /> Publish Changes
                  </button>
                </div>
              </div>

              {/* MAIN CONTENT SPLIT AREA */}
              <div className="flex flex-col lg:flex-row flex-grow h-[calc(100vh-72px)] overflow-hidden w-full">
                
                {/* 2. LEFT EDITING PANEL (70% WIDTH) */}
                <div className="w-full lg:w-[70%] h-full overflow-y-auto px-6 py-8 lg:px-12 lg:py-12 space-y-8 pb-36 text-slate-800">
                  
                  {/* Introduction banner */}
                  <div className="p-6 bg-gradient-to-br from-violet-500/[0.03] to-indigo-500/[0.03] border border-slate-200/50 rounded-3xl relative overflow-hidden flex items-center justify-between">
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-200/10 rounded-full blur-[80px] pointer-events-none" />
                    <div>
                      <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><Icons.Sparkles className="w-5 h-5 text-purple-600" /> Enterprise Workspace</h3>
                      <p className="text-slate-400 text-[11px] font-semibold mt-1 uppercase tracking-wider">Deploy battle-tested AI and Cloud software architectures to the showcase directory.</p>
                    </div>
                    <div className="px-4 py-2 bg-white/80 border border-slate-200/60 rounded-2xl text-[10px] font-black uppercase tracking-widest text-purple-600 shadow-sm hidden md:block">
                      Framer CMS Engine
                    </div>
                  </div>

                  {/* 8 EDITING ACCORDION MODULES */}
                  <div className="space-y-6">

                    {/* SECTION 1: BASIC INFORMATION */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.basicInfo ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('basicInfo')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.basicInfo ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.basicInfo ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.Layout className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">1. Basic Information & showcase Settings</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Configure page metadata, directory listings, and alignments</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.basicInfo ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.basicInfo && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-6">
                              {/* Grid row 1: Title & Slug */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Title</label>
                                  <input 
                                    required 
                                    value={formData.title} 
                                    onChange={e => { 
                                      const val = e.target.value;
                                      updateField('title', val); 
                                      if(!selectedItem) {
                                        const baseSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                                        updateField('slug', baseSlug); 
                                      }
                                    }} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="Enter case study title..."
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Slug</label>
                                  <input 
                                    required 
                                    value={formData.slug} 
                                    onChange={e => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-mono text-xs text-slate-700 transition-all duration-200" 
                                    placeholder="smart-ai-agents"
                                  />
                                </div>
                              </div>

                              {/* Grid row 2: Badge & Showcase Alignment */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Badge Label</label>
                                  <input 
                                    value={formData.badge} 
                                    onChange={e => updateField('badge', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="CONCEPT BUILD"
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Showcase Alignment</label>
                                  <div className="flex gap-1.5 p-1 bg-slate-100/60 border border-slate-200/50 rounded-2xl h-14 items-center">
                                    <button 
                                      type="button" 
                                      onClick={() => updateField('alignment', 'left')}
                                      className={cn(
                                        "flex-1 h-full rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5",
                                        formData.alignment === 'left' ? "bg-white text-purple-600 shadow-sm border border-slate-200/30" : "text-slate-500 hover:text-slate-700"
                                      )}
                                    >
                                      <Icons.AlignLeft className="w-4 h-4" /> Image Left
                                    </button>
                                    <button 
                                      type="button" 
                                      onClick={() => updateField('alignment', 'right')}
                                      className={cn(
                                        "flex-1 h-full rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5",
                                        formData.alignment === 'right' ? "bg-white text-purple-600 shadow-sm border border-slate-200/30" : "text-slate-500 hover:text-slate-700"
                                      )}
                                    >
                                      <Icons.AlignRight className="w-4 h-4" /> Content Left
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Row 3: Image URL & Rank */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative group md:col-span-2">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Primary Showcase Image URL</label>
                                  <input 
                                    value={formData.image} 
                                    onChange={e => { updateField('image', e.target.value); updateField('heroImage', e.target.value); }} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-medium text-xs text-slate-700 transition-all duration-200" 
                                    placeholder="https://images.unsplash.com/photo-..."
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Display Order Rank</label>
                                  <input 
                                    type="number" 
                                    value={formData.order} 
                                    onChange={e => updateField('order', Number(e.target.value))} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  />
                                </div>
                              </div>

                              {/* Row 4: Toggles */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <label className="flex items-center gap-4 cursor-pointer p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all group shadow-sm hover:shadow">
                                  <input 
                                    type="checkbox" 
                                    checked={formData.featured} 
                                    onChange={e => updateField('featured', e.target.checked)} 
                                    className="w-5 h-5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" 
                                  />
                                  <div className="flex flex-col text-left">
                                    <span className="text-xs font-black text-slate-700 group-hover:text-purple-600 transition-colors">Homepage Spotlight</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Spotlight this concept on the home landing showcase</span>
                                  </div>
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all group shadow-sm hover:shadow">
                                  <input 
                                    type="checkbox" 
                                    checked={formData.active} 
                                    onChange={e => updateField('active', e.target.checked)} 
                                    className="w-5 h-5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" 
                                  />
                                  <div className="flex flex-col text-left">
                                    <span className="text-xs font-black text-slate-700 group-hover:text-purple-600 transition-colors">Published Status</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Control live public visibility across the application</span>
                                  </div>
                                </label>
                              </div>

                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Overview Description (Listing Cards)</label>
                                <textarea 
                                  required 
                                  value={formData.description} 
                                  onChange={e => updateField('description', e.target.value)} 
                                  className="w-full min-h-[140px] p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-medium text-xs text-slate-700 transition-all duration-200 leading-relaxed" 
                                  placeholder="Provide a quick high-level summary of the build for cards and SEO cards..."
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SECTION 2: HERO CONFIGURATION */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.heroConfig ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('heroConfig')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.heroConfig ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.heroConfig ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">2. Hero Configuration</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Design the landing experience at the top of the detail page</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.heroConfig ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.heroConfig && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-6">
                              {/* Hero Title */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Hero Main Headline Title</label>
                                <input 
                                  value={formData.heroTitle} 
                                  onChange={e => updateField('heroTitle', e.target.value)} 
                                  className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  placeholder="e.g. Next-Generation NLP Agents For Enterprise Scale"
                                />
                              </div>

                              {/* Row 2: Hero Badge & Button Text */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Hero Pill Badge</label>
                                  <input 
                                    value={formData.heroBadge} 
                                    onChange={e => updateField('heroBadge', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="e.g. LIVE DEMO READY"
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Hero CTA Button Text</label>
                                  <input 
                                    value={formData.heroButtonText} 
                                    onChange={e => updateField('heroButtonText', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="Inquire for Similar Solution"
                                  />
                                </div>
                              </div>

                              {/* Hero Description */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Hero Long-form Description</label>
                                <textarea 
                                  value={formData.heroDescription} 
                                  onChange={e => updateField('heroDescription', e.target.value)} 
                                  className="w-full min-h-[140px] p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-medium text-xs text-slate-700 transition-all duration-200 leading-relaxed" 
                                  placeholder="Enter detailed sub-headline explaining the architecture, performance improvements, and business case..."
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SECTION 3: PRODUCTION STATUS */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.productionStatus ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('productionStatus')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.productionStatus ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.productionStatus ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.Activity className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">3. Production Status Card</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Manage live system readiness and status tags visually</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.productionStatus ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.productionStatus && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-6">
                              {/* Title & Label Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Status Card Headline</label>
                                  <input 
                                    value={formData.productionStatusTitle} 
                                    onChange={e => { updateField('productionStatusTitle', e.target.value); updateField('statusTitle', e.target.value); }} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="Production Status"
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Status Label Tag</label>
                                  <input 
                                    value={formData.productionStatusLabel} 
                                    onChange={e => { updateField('productionStatusLabel', e.target.value); updateField('statusSubtitle', e.target.value); }} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="Battle-Ready"
                                  />
                                </div>
                              </div>

                              {/* Swatch-based Color Picker */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Status Color Theme Swatches</label>
                                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3 leading-tight">Select color template for the live status badge</p>
                                <div className="flex flex-wrap gap-3 p-4 bg-slate-50/60 border border-slate-200/50 rounded-2xl">
                                  {STATUS_COLORS.map(col => {
                                    const swatchColors = {
                                      green: '#10b981',
                                      blue: '#3b82f6',
                                      purple: '#8b5cf6',
                                      amber: '#f59e0b',
                                      rose: '#f43f5e',
                                      indigo: '#6366f1'
                                    };
                                    const hex = swatchColors[col.value] || '#10b981';
                                    return (
                                      <button 
                                        type="button"
                                        key={col.value}
                                        onClick={() => updateField('productionStatusColor', col.value)}
                                        className={cn(
                                          "w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center shadow-sm relative group/swatch active:scale-95",
                                          formData.productionStatusColor === col.value 
                                            ? "border-slate-800 scale-110 ring-4 ring-purple-100" 
                                            : "border-white hover:scale-105"
                                        )}
                                        style={{ backgroundColor: hex }}
                                        title={col.label}
                                      >
                                        {formData.productionStatusColor === col.value && (
                                          <Icons.Check className="w-5 h-5 text-white drop-shadow-md font-black" />
                                        )}
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold py-1 px-2 rounded opacity-0 group-hover/swatch:opacity-100 pointer-events-none transition-opacity uppercase tracking-wider whitespace-nowrap shadow z-50">
                                          {col.label}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Dynamic Visual Status Icon Grid */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Status Icon Selector</label>
                                <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2.5 p-5 bg-slate-50/60 border border-slate-200/50 rounded-2xl">
                                  {AVAILABLE_ICONS.map(i => {
                                    const IconComp = Icons[i] || Icons.Zap;
                                    const isSelected = formData.productionStatusIcon === i;
                                    return (
                                      <button 
                                        type="button"
                                        key={i}
                                        onClick={() => updateField('productionStatusIcon', i)}
                                        className={cn(
                                          "p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95",
                                          isSelected 
                                            ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10 scale-105" 
                                            : "bg-white text-slate-500 border-slate-200/60 hover:bg-slate-50 hover:text-slate-700"
                                        )}
                                      >
                                        <IconComp className="w-5 h-5" />
                                        <span className="text-[7px] font-black uppercase tracking-wider truncate w-full text-center">{i}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SECTION 4: ENGINEERING STANDARDS */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.engineeringStandards ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('engineeringStandards')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.engineeringStandards ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.engineeringStandards ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.Cpu className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">4. Engineering Standards & Dynamic Card Builder</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Manage modular specifications and build custom draggable cards</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.engineeringStandards ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.engineeringStandards && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-8">
                              {/* Section Title & Description */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Module Header Title</label>
                                  <input 
                                    value={formData.engineeringSectionTitle} 
                                    onChange={e => updateField('engineeringSectionTitle', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="Engineering Standards"
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Module Header Description</label>
                                  <input 
                                    value={formData.engineeringSectionDescription} 
                                    onChange={e => updateField('engineeringSectionDescription', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="Every build follows our core architectural principles."
                                  />
                                </div>
                              </div>

                              {/* DYNAMIC VISUAL CARD BUILDER */}
                              <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Dynamic Visual Card Builder</h4>
                                  <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-wider leading-none">
                                    Blocks Count: {formData.engineeringCards?.length || 0}
                                  </span>
                                </div>

                                <div className="space-y-6">
                                  {(formData.engineeringCards || []).map((card, index) => (
                                    <div 
                                      key={index} 
                                      className="p-6 bg-slate-50/40 border border-slate-200/80 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 relative group/block space-y-4"
                                    >
                                      {/* Block Toolbar Header */}
                                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                        <div className="flex items-center gap-2">
                                          <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-slate-200/60 rounded text-slate-400 hover:text-slate-600 transition-all">
                                            <Icons.GripVertical className="w-4 h-4" />
                                          </div>
                                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Engineering Card #{index + 1}</span>
                                        </div>
                                        
                                        {/* Block reorder / delete controls */}
                                        <div className="flex items-center gap-1.5">
                                          <button 
                                            type="button" 
                                            onClick={() => moveEngineeringCard(index, 'up')}
                                            disabled={index === 0}
                                            className="w-7 h-7 bg-white border border-slate-200 text-slate-500 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 hover:text-slate-800 transition-all disabled:pointer-events-none"
                                            title="Move Card Up"
                                          >
                                            <Icons.ArrowUp className="w-3.5 h-3.5" />
                                          </button>
                                          <button 
                                            type="button" 
                                            onClick={() => moveEngineeringCard(index, 'down')}
                                            disabled={index === (formData.engineeringCards || []).length - 1}
                                            className="w-7 h-7 bg-white border border-slate-200 text-slate-500 rounded-lg flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 hover:text-slate-800 transition-all disabled:pointer-events-none"
                                            title="Move Card Down"
                                          >
                                            <Icons.ArrowDown className="w-3.5 h-3.5" />
                                          </button>
                                          <div className="w-px h-5 bg-slate-200 mx-1"></div>
                                          <button 
                                            type="button" 
                                            onClick={() => removeEngineeringCard(index)}
                                            className="w-7 h-7 bg-rose-50 border border-rose-100 text-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-100 transition-all shadow-sm"
                                            title="Delete Block"
                                          >
                                            <Icons.Trash className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </div>

                                      {/* Block Content Grid */}
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Inline visual icon selector */}
                                        <div className="col-span-1">
                                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Card Icon</label>
                                          <div className="grid grid-cols-4 gap-1.5 p-2 bg-white border border-slate-200 rounded-2xl max-h-[140px] overflow-y-auto custom-scrollbar">
                                            {AVAILABLE_ICONS.map(i => {
                                              const IconC = Icons[i] || Icons.Zap;
                                              const isIconSelected = card.icon === i;
                                              return (
                                                <button 
                                                  key={i}
                                                  type="button" 
                                                  onClick={() => updateEngineeringCard(index, 'icon', i)}
                                                  className={cn(
                                                    "p-2 rounded-lg flex items-center justify-center transition-all",
                                                    isIconSelected 
                                                      ? "bg-purple-600 text-white shadow-md scale-105" 
                                                      : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                                  )}
                                                  title={i}
                                                >
                                                  <IconC className="w-4 h-4" />
                                                </button>
                                              );
                                            })}
                                          </div>
                                        </div>

                                        {/* Card text inputs */}
                                        <div className="col-span-1 md:col-span-2 space-y-4">
                                          <div className="relative group">
                                            <label className="text-[9px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-1.5 block transition-colors duration-200">Card Title</label>
                                            <input 
                                              value={card.title} 
                                              onChange={e => updateEngineeringCard(index, 'title', e.target.value)} 
                                              className="w-full h-11 px-4 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 font-extrabold text-xs text-slate-800 transition-all" 
                                              placeholder="Optimized Edge Performance"
                                            />
                                          </div>
                                          <div className="relative group">
                                            <label className="text-[9px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-1.5 block transition-colors duration-200">Card Description</label>
                                            <textarea 
                                              value={card.description} 
                                              onChange={e => updateEngineeringCard(index, 'description', e.target.value)} 
                                              className="w-full h-16 p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 font-medium text-xs text-slate-700 transition-all leading-normal" 
                                              placeholder="Edge-ready execution with sub-200ms latency across Global CDN..."
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Add engineering card trigger */}
                                <button 
                                  type="button" 
                                  onClick={addEngineeringCard}
                                  className="w-full py-4 border-2 border-dashed border-purple-200 hover:border-purple-500 rounded-[2rem] flex items-center justify-center gap-2 text-purple-600 bg-purple-50/20 hover:bg-purple-50 transition-all font-black text-xs tracking-wider shadow-sm hover:shadow active:scale-[0.99] mt-4"
                                >
                                  <Icons.Plus className="w-4 h-4" /> ADD SYSTEM SPECIFICATION CARD
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SECTION 5: ARCHITECTURE DETAILS */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.architectureDetails ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('architectureDetails')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.architectureDetails ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.architectureDetails ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">5. Architecture Details</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Define cloud specs, industries, and system performance details</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.architectureDetails ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.architectureDetails && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-6">
                              {/* Row 1: Build Type & Industry */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Build Type</label>
                                  <input 
                                    placeholder="e.g. AI Customer Service" 
                                    value={formData.buildType} 
                                    onChange={e => updateField('buildType', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Target Industry</label>
                                  <input 
                                    placeholder="e.g. Enterprise Fintech" 
                                    value={formData.industry} 
                                    onChange={e => updateField('industry', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  />
                                </div>
                              </div>

                              {/* Row 2: Deployment & Architecture */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Deployment Model</label>
                                  <input 
                                    placeholder="e.g. Edge Sync / VPC Sync" 
                                    value={formData.deploymentType} 
                                    onChange={e => updateField('deploymentType', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Architecture Type</label>
                                  <input 
                                    placeholder="e.g. Microservices-First" 
                                    value={formData.architectureType} 
                                    onChange={e => updateField('architectureType', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  />
                                </div>
                              </div>

                              {/* Row 3: Readiness Level */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Readiness Level</label>
                                <input 
                                  placeholder="e.g. Battle-Ready Production MVP" 
                                  value={formData.readinessLevel} 
                                  onChange={e => updateField('readinessLevel', e.target.value)} 
                                  className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SECTION 6: INQUIRY AUTOFILL */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.inquiryAutofill ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('inquiryAutofill')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.inquiryAutofill ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.inquiryAutofill ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.Workflow className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">6. Inquiry Autofill Configuration</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Preload CRM state parameters dynamically for booking clients</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.inquiryAutofill ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.inquiryAutofill && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-6">
                              {/* AI Callout Banner */}
                              <div className="bg-indigo-50/60 p-5 border border-indigo-100/70 rounded-2xl flex gap-3 text-indigo-900 leading-relaxed shadow-sm">
                                <div className="w-7 h-7 shrink-0 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5">
                                  <Icons.Sparkles className="w-4 h-4" />
                                </div>
                                <div className="text-[11px] font-bold">
                                  💡 Interactive Leads integration:
                                  <p className="text-[10px] text-indigo-700/80 mt-1 font-medium leading-relaxed">When clients click "Inquire" on this case study, their contact request form is instantly preloaded with these customized operational targets!</p>
                                </div>
                              </div>

                              {/* Service selection dropdown */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Auto-Selected Service Target</label>
                                <select 
                                  value={formData.contactService} 
                                  onChange={e => updateField('contactService', e.target.value)} 
                                  className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-black text-xs text-slate-800 transition-all cursor-pointer"
                                >
                                  <option value="">-- Select Preloaded Service --</option>
                                  {AUTOFILL_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </div>

                              {/* Budget & Timeline Dropdowns */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Auto-Selected Budget Tier</label>
                                  <select 
                                    value={formData.contactBudget} 
                                    onChange={e => updateField('contactBudget', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-black text-xs text-slate-800 transition-all cursor-pointer"
                                  >
                                    <option value="">-- Select Preloaded Budget --</option>
                                    {AUTOFILL_BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                                  </select>
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Auto-Selected Project Timeline</label>
                                  <select 
                                    value={formData.contactTimeline} 
                                    onChange={e => updateField('contactTimeline', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-black text-xs text-slate-800 transition-all cursor-pointer"
                                  >
                                    <option value="">-- Select Preloaded Timeline --</option>
                                    {AUTOFILL_TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                                  </select>
                                </div>
                              </div>

                              {/* Autofill message textarea */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Auto-Generated Inquiry Message Prompt</label>
                                <textarea 
                                  value={formData.contactMessage} 
                                  onChange={e => updateField('contactMessage', e.target.value)} 
                                  className="w-full min-h-[140px] p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-medium text-xs text-slate-700 transition-all duration-200 leading-relaxed" 
                                  placeholder="I'm interested in deploying a custom AI customer support solution matching the Smart AI Agents case study..."
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SECTION 7: CTA CONFIGURATION */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.ctaConfig ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('ctaConfig')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.ctaConfig ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.ctaConfig ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.MessageSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">7. Call-to-Action (CTA) Configuration</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Design the conversion banner shown at the bottom of the page</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.ctaConfig ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.ctaConfig && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-6">
                              {/* CTA Title */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">CTA Main Banner Title</label>
                                <input 
                                  value={formData.businessCtaTitle} 
                                  onChange={e => updateField('businessCtaTitle', e.target.value)} 
                                  className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  placeholder="Ready to see this in your business?"
                                />
                              </div>

                              {/* CTA Button Text & Target Link */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">CTA Action Button Text</label>
                                  <input 
                                    value={formData.businessCtaButtonText} 
                                    onChange={e => updateField('businessCtaButtonText', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="Request Case Study & Quote"
                                  />
                                </div>
                                <div className="relative group">
                                  <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">CTA Destination Link URL</label>
                                  <input 
                                    value={formData.ctaLink} 
                                    onChange={e => updateField('ctaLink', e.target.value)} 
                                    className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                    placeholder="/contact"
                                  />
                                </div>
                              </div>

                              {/* CTA Description */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">CTA Detail Body Description</label>
                                <textarea 
                                  value={formData.businessCtaDescription} 
                                  onChange={e => updateField('businessCtaDescription', e.target.value)} 
                                  className="w-full min-h-[140px] p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-medium text-xs text-slate-700 transition-all duration-200 leading-relaxed" 
                                  placeholder="Provide descriptive details highlighting engineering standards, setup speeds, custom deployment configurations, or operational options..."
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* SECTION 8: SEO METADATA */}
                    <div className={cn(
                      "bg-white rounded-[2rem] border overflow-hidden transition-all duration-300",
                      openSections.seoMetadata ? "border-purple-200 shadow-[0_15px_30px_rgba(124,58,237,0.03)]" : "border-slate-200/70 shadow-sm hover:shadow-md"
                    )}>
                      <button 
                        type="button" 
                        onClick={() => toggleSection('seoMetadata')}
                        className={cn(
                          "w-full flex items-center justify-between p-6 text-left transition-colors",
                          openSections.seoMetadata ? "bg-purple-50/20 border-b border-purple-100/40" : "bg-slate-50/30 hover:bg-slate-50/70"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
                            openSections.seoMetadata ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/10" : "bg-white text-slate-500 border-slate-200"
                          )}>
                            <Icons.Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight leading-none">8. Search Engine Optimization (SEO)</h3>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1.5">Improve search index results with targeted meta tags and titles</p>
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 transition-transform duration-300 shadow-sm",
                          openSections.seoMetadata ? "rotate-180 border-purple-100 text-purple-500" : ""
                        )}>
                          <Icons.ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSections.seoMetadata && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="p-8 space-y-6">
                              {/* Meta Title */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Google Meta Title (SEO)</label>
                                <input 
                                  value={formData.metaTitle} 
                                  onChange={e => updateField('metaTitle', e.target.value)} 
                                  className="w-full h-14 px-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-bold text-slate-800 transition-all duration-200" 
                                  placeholder="Smart AI Agents | Enterprise Case Study | Cognivexa AI"
                                />
                              </div>

                              {/* Meta Description */}
                              <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-purple-600 uppercase tracking-widest mb-2 block transition-colors duration-200">Google Meta Description (SEO)</label>
                                <textarea 
                                  value={formData.metaDescription} 
                                  onChange={e => updateField('metaDescription', e.target.value)} 
                                  className="w-full min-h-[140px] p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.03)] font-medium text-xs text-slate-700 transition-all duration-200 leading-relaxed" 
                                  placeholder="Deploy Event-Driven smart conversational LLM systems synced locally to secure VPC resources, achieving sub-200ms latency..."
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* 3. RIGHT PREVIEW PANEL (30% WIDTH) */}
                <div className="hidden lg:flex w-[30%] h-full bg-slate-50 border-l border-slate-200/60 overflow-y-auto p-8 flex-col items-center select-none sticky top-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
                  
                  {/* Preview Title & Badge */}
                  <div className="w-full flex items-center justify-between mb-6">
                    <h3 className="font-extrabold text-slate-900 flex items-center gap-2 text-sm">
                      <Icons.Eye className="w-4.5 h-4.5 text-indigo-600" /> 
                      Live Simulator
                    </h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-200 shadow-sm leading-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span> Live sync
                    </div>
                  </div>

                  {/* Responsive Switcher Bar */}
                  <div className="w-full bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex items-center mb-6 h-12">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={cn(
                        "flex-1 h-full rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all",
                        previewDevice === 'desktop' ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105" : "text-slate-400 hover:text-slate-700"
                      )}
                    >
                      <Icons.Laptop className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('tablet')}
                      className={cn(
                        "flex-1 h-full rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all",
                        previewDevice === 'tablet' ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105" : "text-slate-400 hover:text-slate-700"
                      )}
                    >
                      <Icons.Tablet className="w-3.5 h-3.5" /> Tablet
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={cn(
                        "flex-1 h-full rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all",
                        previewDevice === 'mobile' ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105" : "text-slate-400 hover:text-slate-700"
                      )}
                    >
                      <Icons.Smartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>

                  {/* Device mockups rendered using scaling */}
                  <div className="w-full flex-1 flex flex-col items-center justify-start py-4">
                    
                    {previewDevice === 'desktop' && (
                      <div className="w-full flex justify-center h-[550px] overflow-hidden relative">
                        <div 
                          className="w-[1100px] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden origin-top scale-[0.38] xl:scale-[0.41] transition-transform duration-300 absolute"
                        >
                          {/* Safari Browser Header */}
                          <div className="flex items-center gap-2 px-4 py-3 bg-slate-100/90 border-b border-slate-200">
                            <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-400"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex-1 max-w-md mx-auto bg-white/70 py-1.5 px-4 rounded-lg text-center text-[10px] text-slate-400 font-bold font-mono select-none truncate border border-slate-200/50">
                              cognivexa.ai/portfolio/{formData.slug || 'slug'}
                            </div>
                          </div>
                          
                          {/* Mock Content */}
                          <div className="h-[1000px] overflow-y-auto bg-white">
                            <DetailPreview build={formData} />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {previewDevice === 'tablet' && (
                      <div className="w-full flex justify-center h-[550px] overflow-hidden relative">
                        <div 
                          className="w-[720px] bg-white border-[14px] border-slate-900 rounded-[36px] shadow-2xl overflow-hidden origin-top scale-[0.55] xl:scale-[0.6] transition-all duration-300 absolute"
                        >
                          <div className="h-[750px] overflow-y-auto bg-white">
                            <DetailPreview build={formData} />
                          </div>
                        </div>
                      </div>
                    )}

                    {previewDevice === 'mobile' && (
                      <div className="w-full flex justify-center h-[550px] relative">
                        <div 
                          className="w-[320px] bg-white border-[10px] border-slate-950 rounded-[44px] shadow-2xl overflow-hidden relative h-[510px] flex flex-col transition-all duration-300"
                        >
                          {/* iPhone Dynamic Island */}
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-950 rounded-full z-50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 absolute right-4"></div>
                          </div>
                          {/* iPhone Status Bar */}
                          <div className="h-8 bg-white shrink-0 w-full flex items-center justify-between px-6 text-[8px] font-black text-slate-700 select-none pt-2">
                            <span>9:41</span>
                            <div className="flex items-center gap-1.5">
                              <Icons.Wifi className="w-2.5 h-2.5" />
                              <div className="w-3.5 h-2 bg-slate-700 rounded-sm"></div>
                            </div>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto bg-white">
                            <DetailPreview build={formData} />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConceptBuildCMS;
