import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Edit2, Trash2, Eye, X, 
  Check, ArrowRight, Save, Layout, 
  Brain, Monitor, Wifi, Palette, Cpu,
  CheckCircle2, Layers, Activity, PlusCircle,
  Hash, Users, Target
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';

const iconMap = { Brain, Monitor, Wifi, Palette, Cpu };

const themeMap = {
  purple: { gradient: "from-purple-600 to-indigo-600", lightBg: "from-purple-50 to-indigo-50", border: "border-purple-200", glow: "rgba(124,58,237,0.15)" },
  blue: { gradient: "from-blue-600 to-cyan-500", lightBg: "from-blue-50 to-cyan-50", border: "border-blue-200", glow: "rgba(59,130,246,0.15)" },
  teal: { gradient: "from-teal-600 to-green-500", lightBg: "from-teal-50 to-green-50", border: "border-teal-200", glow: "rgba(13,148,136,0.15)" },
  pink: { gradient: "from-pink-600 to-rose-500", lightBg: "from-pink-50 to-rose-50", border: "border-pink-200", glow: "rgba(236,72,153,0.15)" },
  orange: { gradient: "from-orange-600 to-amber-500", lightBg: "from-orange-50 to-amber-50", border: "border-orange-200", glow: "rgba(245,158,11,0.15)" },
  green: { gradient: "from-green-600 to-emerald-500", lightBg: "from-green-50 to-emerald-50", border: "border-green-200", glow: "rgba(16,185,129,0.15)" }
};

const initialForm = {
  name: '',
  slug: '',
  shortTitle: '',
  tagline: '',
  description: '',
  icon: 'Cpu',
  theme: 'purple',
  expertiseAreas: [],
  workflowTags: [],
  teamRoles: [],
  optionalHighlights: [],
  active: true,
  order: 0
};

// --- PREVIEW COMPONENT ---

const TeamPreview = ({ team }) => {
  const IconComponent = iconMap[team.icon] || Cpu;
  const style = themeMap[team.theme] || themeMap.purple;

  return (
    <div className={cn("relative rounded-3xl border overflow-hidden bg-white w-full max-w-4xl mx-auto")}
      style={{ borderColor: style.border, boxShadow: `0 32px 80px ${style.glow}` }}
    >
      <div className={cn("h-1.5 w-full bg-gradient-to-r", style.gradient)} />
      <div className={cn("p-8 md:p-10 bg-gradient-to-br", style.lightBg)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <div className="text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-lg text-white", style.gradient)}>
                <IconComponent size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">{team.name || 'Team Name'}</h3>
                <p className={cn("text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent", style.gradient)}>
                  {team.tagline || 'Team tagline goes here...'}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">{team.description || 'Professional team description...'}</p>
            {team.optionalHighlights?.length > 0 && (
              <div className="flex gap-6 md:gap-8 mb-8">
                {team.optionalHighlights.map((stat, i) => (
                  <div key={i}>
                    <div className={cn("text-2xl font-black bg-gradient-to-r bg-clip-text text-transparent", style.gradient)}>{stat.value}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {(team.expertiseAreas || []).map((tag, i) => (
                <span key={i} className={cn("text-xs font-semibold px-3 py-1.5 rounded-full border bg-white text-gray-700", style.border)}>{tag}</span>
              ))}
            </div>
          </div>
          {/* RIGHT */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Team Roles</h4>
            {(team.teamRoles || []).map((role, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-200">
                <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white font-bold text-sm", style.gradient)}>{i + 1}</div>
                <div>
                  <h5 className="text-[14px] font-bold text-gray-900">{role.title}</h5>
                  <p className="text-[13px] text-gray-400 mt-0.5 leading-relaxed">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CMS PAGE ---

const SpecializedTeamsCMS = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const queryClient = useQueryClient();

  const { data: teamsRes, isLoading } = useQuery({ 
    queryKey: ['admin-specialized-teams'], 
    queryFn: () => apiClient.get('/specialized-teams') 
  });

  const mutation = useMutation({
    mutationFn: (data) => data._id ? apiClient.put(`/specialized-teams/${data._id}`, data) : apiClient.post('/specialized-teams', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-specialized-teams']);
      setIsDrawerOpen(false);
    },
    onError: (err) => alert(err.response?.data?.message || 'Error saving team')
  });

  const deleteMut = useMutation({
    mutationFn: (id) => apiClient.delete(`/specialized-teams/${id}`),
    onSuccess: () => queryClient.invalidateQueries(['admin-specialized-teams'])
  });

  const teams = teamsRes?.results || [];

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

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const addItem = (field, template) => updateField(field, [...(formData[field] || []), template]);
  const removeItem = (field, index) => updateField(field, formData[field].filter((_, i) => i !== index));
  const updateItem = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = typeof value === 'object' ? { ...updated[index], ...value } : value;
    updateField(field, updated);
  };

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Specialized Teams CMS</h1>
          <p className="text-slate-500 font-medium mt-2">Manage professional expertise teams for About page</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" /> NEW TEAM
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map(team => {
          const IconComp = iconMap[team.icon] || Cpu;
          const style = themeMap[team.theme] || themeMap.purple;
          return (
            <div key={team._id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all">
              <div className={cn("h-2 bg-gradient-to-r", style.gradient)} />
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white", style.gradient)}>
                    <IconComp size={24} />
                  </div>
                  <div className="flex gap-2">
                    <span className={cn("px-2 py-1 text-[9px] font-black uppercase rounded-lg", team.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")}>{team.active ? 'Active' : 'Hidden'}</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">#{team.order}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{team.name}</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">{team.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-50 px-2 py-1 rounded-lg"><Users size={12}/> {team.teamRoles?.length || 0} Roles</span>
                  <span className="flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-50 px-2 py-1 rounded-lg"><Target size={12}/> {team.expertiseAreas?.length || 0} Expertise</span>
                </div>
                <div className="flex gap-3 pt-4 border-t border-slate-50">
                  <button onClick={() => handleEdit(team)} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 text-xs font-black rounded-xl hover:bg-slate-100 transition-colors"><Edit2 className="w-4 h-4" /> EDIT</button>
                  <button onClick={() => { if(window.confirm('Delete team?')) deleteMut.mutate(team._id); }} className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 text-xs font-black rounded-xl hover:bg-rose-100 transition-colors"><Trash2 className="w-4 h-4" /> DELETE</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title={selectedItem ? 'Edit Specialized Team' : 'Create Specialized Team'}
        size="full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
            <div className="space-y-10 overflow-y-auto pr-6 h-[calc(100vh-160px)] pb-20 scrollbar-hide">
                {/* Section 1 */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-indigo-500 pl-4">1. Basic Info</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Team Name</label>
                          <input value={formData.name} onChange={e => { updateField('name', e.target.value); if(!selectedItem) updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')); }} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" placeholder="e.g. AI & Automation" />
                        </div>
                        <div className="col-span-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Slug</label>
                          <input value={formData.slug} onChange={e => updateField('slug', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-mono text-xs" />
                        </div>
                        <div className="col-span-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Short Title</label>
                          <input value={formData.shortTitle} onChange={e => updateField('shortTitle', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" placeholder="e.g. AI Systems" />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Tagline</label>
                          <input value={formData.tagline} onChange={e => updateField('tagline', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" />
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Description</label>
                          <textarea value={formData.description} onChange={e => updateField('description', e.target.value)} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 h-24 text-sm leading-relaxed" />
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-indigo-500 pl-4">2. Identity & Theme</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block">Icon</label>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(iconMap).map(icon => {
                                    const Icon = iconMap[icon];
                                    return (
                                        <button key={icon} type="button" onClick={() => updateField('icon', icon)} className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all", formData.icon === icon ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110" : "bg-slate-100 text-slate-400 hover:bg-slate-200")}>
                                            <Icon size={20} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block">Theme Color</label>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(themeMap).map(color => (
                                    <button key={color} type="button" onClick={() => updateField('theme', color)} className={cn("w-8 h-8 rounded-full border-2 transition-all", formData.theme === color ? "border-indigo-600 scale-125" : "border-transparent")}>
                                        <div className={cn("w-full h-full rounded-full bg-gradient-to-br", themeMap[color].gradient)} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">3. Expertise Areas</h3>
                        <button type="button" onClick={() => addItem('expertiseAreas', '')} className="text-indigo-600 hover:text-indigo-700 transition-colors"><PlusCircle size={20}/></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.expertiseAreas.map((area, i) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
                                <input value={area} onChange={e => updateItem('expertiseAreas', i, e.target.value)} className="bg-transparent outline-none text-xs font-bold w-32" />
                                <button type="button" onClick={() => removeItem('expertiseAreas', i)} className="text-slate-400 hover:text-rose-500"><X size={14}/></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 4 */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">4. Workflow Tags</h3>
                        <button type="button" onClick={() => addItem('workflowTags', '')} className="text-indigo-600 hover:text-indigo-700 transition-colors"><PlusCircle size={20}/></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.workflowTags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-1">
                                <Hash size={10} className="text-indigo-400" />
                                <input value={tag} onChange={e => updateItem('workflowTags', i, e.target.value)} className="bg-transparent outline-none text-xs font-bold text-indigo-700 w-24" />
                                <button type="button" onClick={() => removeItem('workflowTags', i)} className="text-indigo-400 hover:text-rose-500"><X size={14}/></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 5 */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">5. Team Roles</h3>
                        <button type="button" onClick={() => addItem('teamRoles', { title: '', description: '', order: formData.teamRoles.length + 1 })} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-[10px] font-black"><PlusCircle size={16}/> ADD ROLE</button>
                    </div>
                    <div className="space-y-4">
                        {formData.teamRoles.map((role, i) => (
                            <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 relative group/role">
                                <button type="button" onClick={() => removeItem('teamRoles', i)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover/role:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-3">
                                        <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Role Title</label>
                                        <input value={role.title} onChange={e => updateItem('teamRoles', i, { title: e.target.value })} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none text-sm font-bold" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Order</label>
                                        <input type="number" value={role.order} onChange={e => updateItem('teamRoles', i, { order: Number(e.target.value) })} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none text-sm font-bold" />
                                    </div>
                                    <div className="col-span-4">
                                        <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block">Description</label>
                                        <input value={role.description} onChange={e => updateItem('teamRoles', i, { description: e.target.value })} className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none text-sm" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 6 */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">6. Optional Highlights</h3>
                        <button type="button" onClick={() => addItem('optionalHighlights', { label: '', value: '' })} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-[10px] font-black"><PlusCircle size={16}/> ADD HIGHLIGHT</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {formData.optionalHighlights.map((hl, i) => (
                            <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                <div className="flex-1 space-y-1">
                                    <input value={hl.label} onChange={e => updateItem('optionalHighlights', i, { label: e.target.value })} placeholder="Label" className="w-full bg-transparent outline-none text-[10px] font-black uppercase text-slate-400" />
                                    <input value={hl.value} onChange={e => updateItem('optionalHighlights', i, { value: e.target.value })} placeholder="Value" className="w-full bg-transparent outline-none text-sm font-black text-slate-700" />
                                </div>
                                <button type="button" onClick={() => removeItem('optionalHighlights', i)} className="text-slate-300 hover:text-rose-500"><Trash2 size={14}/></button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 7 */}
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-indigo-500 pl-4">7. Status & Ordering</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block">Display Order</label>
                            <input type="number" value={formData.order} onChange={e => updateField('order', Number(e.target.value))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200 h-full">
                                <input type="checkbox" checked={formData.active} onChange={e => updateField('active', e.target.checked)} className="w-6 h-6 rounded-lg text-emerald-500" />
                                <div className="flex flex-col"><span className="text-sm font-black text-slate-700">Active</span><span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Public Visibility</span></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="pt-10 flex gap-4 sticky bottom-0 bg-white pb-10 border-t border-slate-50">
                    <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200">CANCEL</button>
                    <button onClick={() => mutation.mutate(formData)} className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:scale-[1.02] transition-all">SAVE TEAM</button>
                </div>
            </div>

            {/* Live Preview */}
            <div className="hidden lg:block bg-slate-50 rounded-[3rem] p-12 border border-slate-200 h-[calc(100vh-160px)] sticky top-0 overflow-y-auto">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="font-black text-slate-900 flex items-center gap-3 text-2xl"><Eye className="w-8 h-8 text-indigo-600"/> Real-time Preview</h3>
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse"><Activity className="w-3.5 h-3.5" /> Synchronized</div>
                </div>
                <div className="scale-90 origin-top">
                    <TeamPreview team={formData} />
                </div>
                <div className="mt-12 p-8 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-slate-200">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic text-center italic">"This preview reflects the professional structure and realistic capabilities of your specialized teams as they will appear to your high-value enterprise clients."</p>
                </div>
            </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SpecializedTeamsCMS;
