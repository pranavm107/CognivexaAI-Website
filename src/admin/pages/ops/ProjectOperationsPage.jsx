import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, Search, Filter, 
  AlertTriangle, CheckCircle2, Clock,
  ArrowRight, Users, Layout, BarChart3,
  Flame, ShieldAlert, Zap
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import { motion } from 'framer-motion';

const ProjectOperationsPage = () => {
  const { data: monitorData, isLoading } = useQuery({
    queryKey: ['admin-project-monitor'],
    queryFn: adminApi.getProjectMonitor,
    refetchInterval: 10000
  });

  const projects = monitorData?.data?.projects || [];
  const alerts = monitorData?.data?.criticalAlerts || [];

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Global Project Monitor</h1>
           <p className="text-slate-500 font-medium mt-1">Real-time delivery pipeline and operational risk monitoring.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" /> Resource Allocation
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all">
              Delivery Pipeline
           </button>
        </div>
      </div>

      {/* Critical Alerts Strip */}
      {alerts.length > 0 && (
        <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-6 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-100">
                 <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="text-sm font-black text-rose-900 uppercase tracking-widest">Operational Criticality Detected</h4>
                 <p className="text-rose-600/70 text-xs font-bold mt-0.5">{alerts.length} projects are currently operating at high risk levels.</p>
              </div>
           </div>
           <button className="px-6 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all">
              Review Blockers
           </button>
        </div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {projects.map((project) => (
           <div key={project._id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all group relative overflow-hidden">
              {project.riskLevel === 'high' && (
                <div className="absolute top-0 right-0 p-6">
                   <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                </div>
              )}
              
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                       <Box className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="text-sm font-black text-slate-900 tracking-tight">{project.title}</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{project.client?.companyName || 'Enterprise'}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                      project.healthScore > 80 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                       {project.healthScore}% Health
                    </span>
                 </div>
              </div>

              <div className="space-y-6 mb-8">
                 <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Progress</span>
                    <span className="text-slate-900">{project.progress}%</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000", project.healthScore > 80 ? "bg-indigo-600" : "bg-rose-500")} 
                      style={{ width: `${project.progress}%` }} 
                    />
                 </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                 <div className="flex -space-x-2">
                    {project.assignedTeam?.slice(0, 3).map((member, i) => (
                      <img key={i} src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.firstName}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="team" />
                    ))}
                    {project.assignedTeam?.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">
                         +{project.assignedTeam.length - 3}
                      </div>
                    )}
                 </div>
                 <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:gap-3 transition-all">
                    Open Workspace <ArrowRight className="w-3 h-3" />
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default ProjectOperationsPage;
