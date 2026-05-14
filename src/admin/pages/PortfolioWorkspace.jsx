import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, Search, Filter, ExternalLink, 
  Image as ImageIcon, BarChart3, Briefcase,
  Layers, Settings2, Trash2, Edit3
} from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';

const PortfolioWorkspace = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const queryClient = useQueryClient();

  const { data: result, isLoading } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: () => apiClient.get('/cms/portfolio'),
  });

  const portfolio = result?.results || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portfolio Operations</h1>
          <p className="text-slate-500 font-medium mt-1">Manage case studies, project metrics, and client success stories.</p>
        </div>
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group active:scale-95"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          PUBLISH CASE STUDY
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1,2,3].map(i => <div key={i} className="h-80 bg-slate-100 rounded-[2.5rem] animate-pulse" />)
        ) : (
          portfolio.map((project, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={project._id} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                  <div className="flex gap-3">
                    <button className="p-3 bg-white rounded-2xl text-slate-900 hover:text-indigo-600 shadow-xl transition-all">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-2xl text-slate-900 hover:text-rose-600 shadow-xl transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{project.industry || 'AI Technology'}</span>
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", project.status === 'published' ? "bg-emerald-500" : "bg-amber-500")} />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{project.status}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                <p className="text-slate-500 text-sm font-medium mt-3 line-clamp-2">{project.description}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-4 overflow-x-auto custom-scrollbar-hide pb-2">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100 whitespace-nowrap">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title="Case Study Architecture"
      >
        <p className="text-slate-500 text-sm">Portfolio management form implementation goes here.</p>
      </Drawer>
    </div>
  );
};

export default PortfolioWorkspace;
