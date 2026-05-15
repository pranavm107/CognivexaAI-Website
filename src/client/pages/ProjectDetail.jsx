import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Clock, CheckCircle2, FileText, Calendar, 
  MessageSquare, CreditCard, ChevronRight,
  Layout, ArrowLeft, MoreHorizontal, Users,
  BarChart3, Plus, ExternalLink, Download,
  Kanban, Star, Video, Send, Paperclip, MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clientApi } from '../services/api';
import { useClientAuthStore } from '../store/authStore';
import { cn } from '../../admin/utils/utils';
import KanbanBoard from '../components/KanbanBoard';

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2.5 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden",
      active ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
    )}
  >
    <Icon className="w-4 h-4" />
    {label}
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
      />
    )}
  </button>
);

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <ChevronRight className="w-4 h-4 text-slate-200 group-hover:translate-x-1 transition-transform" />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{value}</h4>
  </div>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useClientAuthStore();

  const { data: projectData, isLoading } = useQuery({
    queryKey: ['client-project', id],
    queryFn: () => clientApi.getProject(id)
  });

  const { data: tasksData } = useQuery({
    queryKey: ['project-tasks', id],
    queryFn: () => clientApi.getTasks(id),
    enabled: !!id
  });

  const project = projectData?.data;

  if (isLoading) return (
    <div className="max-w-[1400px] mx-auto p-12 space-y-12 animate-pulse">
      <div className="h-10 w-40 bg-slate-50 rounded-xl" />
      <div className="h-24 w-full bg-slate-50 rounded-[3rem]" />
      <div className="grid grid-cols-4 gap-6 h-12" />
    </div>
  );

  if (!project) return <div>Project not found</div>;

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link to="/client/projects" className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:shadow-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">{project.status}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-3 h-3" /> Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{project.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
             <Download className="w-4 h-4" /> Export Report
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2">
             <MessageSquare className="w-4 h-4" /> Message Team
           </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
        <TabButton active={activeTab === 'overview'} label="Overview" icon={Layout} onClick={() => setActiveTab('overview')} />
        <TabButton active={activeTab === 'pipeline'} label="Pipeline" icon={Kanban} onClick={() => setActiveTab('pipeline')} />
        <TabButton active={activeTab === 'timeline'} label="Timeline" icon={Clock} onClick={() => setActiveTab('timeline')} />
        <TabButton active={activeTab === 'deliverables'} label="Deliverables" icon={CheckCircle2} onClick={() => setActiveTab('deliverables')} />
        <TabButton active={activeTab === 'files'} label="Files" icon={FileText} onClick={() => setActiveTab('files')} />
        <TabButton active={activeTab === 'meetings'} label="Meetings" icon={Calendar} onClick={() => setActiveTab('meetings')} />
        <TabButton active={activeTab === 'messages'} label="Messages" icon={MessageSquare} onClick={() => setActiveTab('messages')} />
        <TabButton active={activeTab === 'billing'} label="Invoices" icon={CreditCard} onClick={() => setActiveTab('billing')} />
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="min-h-[500px]"
        >
          {activeTab === 'overview' && (
            <div className="space-y-12">
               {/* Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard label="Overall Progress" value={`${project.progress}%`} icon={BarChart3} color="text-indigo-600" />
                 <StatCard label="Active Directives" value={tasksData?.results?.length || 0} icon={Kanban} color="text-amber-600" />
                 <StatCard label="Team Members" value={project.assignedTeam?.length || 0} icon={Users} color="text-emerald-600" />
                 <StatCard label="Days Until Milestone" value="12" icon={Clock} color="text-rose-600" />
               </div>

               {/* Health Score & High Level Overview */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                     <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6 text-center">Project Health Index</h3>
                        <div className="flex flex-col items-center gap-6">
                           <div className="relative w-48 h-48 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                 <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-50" />
                                 <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" 
                                   strokeDasharray={552} 
                                   strokeDashoffset={552 - (552 * (project.healthScore || 100)) / 100} 
                                   className={cn("transition-all duration-1000", (project.healthScore || 100) > 80 ? "text-emerald-500" : (project.healthScore || 100) > 50 ? "text-amber-500" : "text-rose-500")} 
                                 />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                 <span className="text-5xl font-black text-slate-900 tracking-tighter">{project.healthScore || 100}</span>
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Score</span>
                              </div>
                           </div>
                           <div className="text-center">
                              <p className={cn(
                                "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-block",
                                (project.riskLevel || 'low') === 'low' ? "bg-emerald-50 text-emerald-600" : 
                                project.riskLevel === 'medium' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                              )}>
                                Risk Level: {project.riskLevel || 'low'}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Active Milestones</h3>
                       <div className="space-y-6">
                          {(project.milestones || []).map((ms, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-100 hover:bg-white transition-all">
                              <div className="flex items-center gap-4">
                                <div className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                  ms.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-white text-slate-400 shadow-sm group-hover:bg-indigo-50 group-hover:text-indigo-600"
                                )}>
                                  {ms.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                </div>
                                <div>
                                  <h4 className="text-sm font-black text-slate-900">{ms.title}</h4>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{ms.dueDate ? new Date(ms.dueDate).toLocaleDateString() : 'TBD'}</p>
                                </div>
                              </div>
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                ms.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                              )}>
                                {ms.status}
                              </span>
                            </div>
                          ))}
                       </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-200">
                        <h4 className="text-lg font-black tracking-tight mb-6">AI Strategic Insight</h4>
                        <div className="space-y-6">
                           <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                              <p className="text-xs font-medium text-slate-300 leading-relaxed">
                                 {project.healthScore > 80 
                                   ? "Analysis shows high team velocity. Recommendation: Proceed with Beta phase deployment ahead of schedule."
                                   : "System detected potential blockers in development phase. Suggesting tactical meeting with core engineering team."}
                              </p>
                           </div>
                           <button className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all">
                              Generate AI Report
                           </button>
                        </div>
                     </div>

                     <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                       <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Assigned Team</h3>
                       <div className="space-y-4">
                          {project.assignedTeam?.map((member, i) => (
                            <div key={i} className="flex items-center gap-3">
                               <img src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.firstName}`} className="w-10 h-10 rounded-xl border border-slate-100" alt="avatar" />
                               <div>
                                 <h4 className="text-sm font-black text-slate-900">{member.firstName} {member.lastName}</h4>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.role?.replace('_', ' ')}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <KanbanBoard projectId={id} />
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm max-w-4xl mx-auto">
               <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                  {(project.timeline || []).map((event, i) => (
                    <div key={i} className="flex gap-10 relative">
                       <div className={cn(
                         "w-12 h-12 rounded-2xl flex items-center justify-center z-10 shrink-0 shadow-xl",
                         event.type === 'milestone' ? "bg-indigo-600 text-white" : "bg-white text-slate-900 border border-slate-100"
                       )}>
                         {event.type === 'milestone' ? <Star className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                       </div>
                       <div>
                         <div className="flex items-center gap-3 mb-2">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(event.date).toLocaleDateString()}</span>
                           <span className={cn(
                             "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em]",
                             event.type === 'milestone' ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"
                           )}>{event.type}</span>
                         </div>
                         <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2">{event.title}</h4>
                         <p className="text-slate-500 font-medium text-sm leading-relaxed">{event.description}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {(project.deliverables || []).map((dl, i) => (
                 <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all group">
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                          <FileText className="w-6 h-6" />
                       </div>
                       <div className="text-right">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                            dl.status === 'approved' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>{dl.status}</span>
                       </div>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2">{dl.title}</h4>
                    <p className="text-sm font-medium text-slate-500 mb-8 line-clamp-2">{dl.description}</p>
                    <div className="flex items-center gap-2">
                       <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                          <Download className="w-3.5 h-3.5" /> Download
                       </button>
                       <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-all">
                          <ExternalLink className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Project Assets</h3>
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2">
                     <Plus className="w-4 h-4" /> Upload
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50/50">
                           <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                           <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                           <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size</th>
                           <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                           <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {(project.files || []).map((file, i) => (
                           <tr key={i} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-indigo-600" />
                                    <span className="text-sm font-black text-slate-900">{file.name}</span>
                                 </div>
                              </td>
                              <td className="px-8 py-6"><span className="text-xs font-bold text-slate-500">{file.type}</span></td>
                              <td className="px-8 py-6"><span className="text-xs font-bold text-slate-500">2.4 MB</span></td>
                              <td className="px-8 py-6"><span className="text-xs font-bold text-slate-500">{new Date(file.createdAt).toLocaleDateString()}</span></td>
                              <td className="px-8 py-6">
                                 <button className="p-2 text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all">
                                    <Download className="w-4 h-4" />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Scheduled Sessions</h3>
                  <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xl shadow-indigo-100">
                    <Calendar className="w-4 h-4" /> Request Meeting
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(project.meetings || []).map((meeting, i) => (
                    <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all group">
                       <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                             <Video className="w-6 h-6" />
                          </div>
                          <div className="text-right">
                             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block">Confirmed</span>
                             <span className="text-xs font-black text-slate-900">{meeting.duration}m duration</span>
                          </div>
                       </div>
                       <h4 className="text-xl font-black text-slate-900 tracking-tight mb-2">{meeting.title}</h4>
                       <div className="flex items-center gap-4 mb-8">
                          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                             <Calendar className="w-3.5 h-3.5" /> {new Date(meeting.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                             <Clock className="w-3.5 h-3.5" /> {new Date(meeting.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <a href={meeting.link} target="_blank" rel="noreferrer" className="flex-1 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-100">
                             Join via Google Meet <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all">
                             <MoreVertical className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="h-[600px] bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
               <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black">AI</div>
                     <div>
                        <h4 className="text-sm font-black text-slate-900">Project Workspace Chat</h4>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-0.5">Team is Online</p>
                     </div>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                     <MoreVertical className="w-5 h-5" />
                  </button>
               </div>
               <div className="flex-1 p-8 overflow-y-auto space-y-6">
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                     <MessageSquare className="w-12 h-12 text-slate-100" />
                     <p className="text-slate-400 font-bold text-sm">Direct collaboration for {project.title}.</p>
                     <button className="text-xs font-black text-indigo-600 uppercase tracking-widest">Load History</button>
                  </div>
               </div>
               <div className="p-6 border-t border-slate-50">
                  <div className="bg-slate-50 rounded-2xl p-2 flex items-center gap-2">
                     <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Paperclip className="w-5 h-5" />
                     </button>
                     <input type="text" placeholder="Send a message to the team..." className="flex-1 bg-transparent py-3 px-2 text-sm font-medium focus:outline-none" />
                     <button className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                        <Send className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Budget</p>
                     <h4 className="text-3xl font-black tracking-tight">${project.budget || '0.00'}</h4>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-slate-900">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Invoiced to date</p>
                     <h4 className="text-3xl font-black tracking-tight">$0.00</h4>
                  </div>
                  <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white">
                     <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-4">Next Payment</p>
                     <h4 className="text-3xl font-black tracking-tight">TBD</h4>
                  </div>
               </div>
               <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-slate-50">
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">Project Invoices</h3>
                  </div>
                  <div className="p-6 md:p-undefined text-center text-slate-400 font-bold">
                     No invoices generated for this project yet.
                  </div>
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
