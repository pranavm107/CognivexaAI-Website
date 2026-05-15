import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, Search, Filter, Plus, 
  ArrowRight, Users, Clock, CheckCircle2, 
  MessageSquare, MoreHorizontal, LayoutGrid, List
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clientApi } from '../services/api';
import { cn } from '../../admin/utils/utils';

const ProjectCard = ({ project }) => (
  <Link to={`/client/projects/${project._id}`} className="block group">
    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all hover:-translate-y-1">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">{project.title}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{project.status}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-slate-900">{project.progress || 0}%</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Complete</p>
        </div>
      </div>

      <p className="text-sm font-medium text-slate-500 mb-8 line-clamp-2 leading-relaxed">
        {project.description}
      </p>

      <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden mb-8">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${project.progress || 0}%` }}
          className="h-full bg-indigo-600 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
        <div className="flex -space-x-2">
          {project.assignedTeam?.slice(0, 3).map((member, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden" title={member.firstName}>
              {member.avatar ? <img src={member.avatar} alt="avatar" /> : <Users className="w-4 h-4 text-slate-400" />}
            </div>
          ))}
          {(project.assignedTeam?.length > 3) && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
              +{project.assignedTeam.length - 3}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-slate-400">
           <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
             <MessageSquare className="w-3.5 h-3.5" /> 12
           </div>
           <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
             <Clock className="w-3.5 h-3.5" /> {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'TBD'}
           </div>
        </div>
      </div>
    </div>
  </Link>
);

const Projects = () => {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['client-projects'],
    queryFn: clientApi.getProjects
  });

  const projects = projectsData?.results || [];

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Workspaces</h1>
          <p className="text-slate-500 font-medium text-lg">Manage and track all your active enterprise AI projects.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-slate-100 p-1 rounded-xl">
             <button className="p-2 bg-white rounded-lg shadow-sm text-slate-900"><LayoutGrid className="w-4 h-4" /></button>
             <button className="p-2 text-slate-400 hover:text-slate-900"><List className="w-4 h-4" /></button>
           </div>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2 group">
             <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> New Request
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects by title or status..."
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-100 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
           <button className="px-5 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50">
             <Filter className="w-3.5 h-3.5" /> All Status
           </button>
           <button className="px-5 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50">
             <Clock className="w-3.5 h-3.5" /> Recent
           </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-[400px] bg-slate-50 animate-pulse rounded-[3rem]" />
          ))
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <div className="col-span-full py-10 md:py-undefined text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mx-auto mb-8">
              <Box className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No projects found</h3>
            <p className="text-slate-400 font-medium mb-8 max-w-xs mx-auto">You haven't initiated any enterprise projects yet. Start your AI journey today.</p>
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Request Project Launch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
