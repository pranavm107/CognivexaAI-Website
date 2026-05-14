import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, Calendar, MessageSquare, 
  ArrowUpRight, Clock, CheckCircle2, 
  Zap, Bell, Search, Filter, 
  FileText, CreditCard, ChevronRight,
  Upload, Video, Star, Send, Box, Users, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../admin/utils/utils';
import { clientApi } from '../services/api';
import { useClientAuthStore } from '../store/authStore';
import PortalModal from '../components/PortalModal';

const StatCard = ({ label, value, icon: Icon, trend, color, isLoading, subValue }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 transition-all group"
  >
    <div className="flex justify-between items-start mb-6">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", color)}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-widest">
          {trend}
        </span>
      )}
    </div>
    <div>
      {isLoading ? (
        <div className="h-10 w-24 bg-slate-50 animate-pulse rounded-lg mb-1" />
      ) : (
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-1 leading-none">{value}</h3>
      )}
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      {subValue && <p className="text-[10px] font-bold text-slate-300 mt-1">{subValue}</p>}
    </div>
  </motion.div>
);

const ProjectCard = ({ project }) => (
  <Link to={`/client/projects/${project._id}`} className="block group">
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all hover:-translate-y-1">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 tracking-tight">{project.title}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{project.status}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-slate-900">{project.progress || 0}%</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Progress</p>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden mb-8">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${project.progress || 0}%` }}
          className="h-full bg-indigo-600 rounded-full"
        />
      </div>

      <div className="flex items-center justify-between">
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
        <div className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
          View Space <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  </Link>
);

const ClientDashboard = () => {
  const { user, client } = useClientAuthStore();
  const queryClient = useQueryClient();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProjectRequestModalOpen, setIsProjectRequestModalOpen] = useState(false);

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['client-dashboard'],
    queryFn: clientApi.getDashboard
  });

  const scheduleMutation = useMutation({
    mutationFn: clientApi.scheduleMeeting,
    onSuccess: () => {
      setIsScheduleModalOpen(false);
      queryClient.invalidateQueries(['client-dashboard']);
    }
  });

  const uploadMutation = useMutation({
    mutationFn: clientApi.uploadFile,
    onSuccess: () => {
      setIsUploadModalOpen(false);
      queryClient.invalidateQueries(['client-dashboard']);
    }
  });

  const projectRequestMutation = useMutation({
    mutationFn: clientApi.requestProject,
    onSuccess: () => {
      setIsProjectRequestModalOpen(false);
      queryClient.invalidateQueries(['client-dashboard']);
    }
  });

  const stats = dashboardData?.data?.stats || {};
  const recentActivity = dashboardData?.data?.recentActivity || [];
  const activeProjects = dashboardData?.data?.activeProjects || [];

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Enterprise Workspace</span>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> System Nominal</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            Welcome back,<br />
            <span className="text-indigo-600">{user?.firstName || 'Innovator'}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all flex items-center gap-2 group"
          >
            <Calendar className="w-4 h-4 text-indigo-600 group-hover:scale-125 transition-transform" /> Schedule Call
          </button>
          <button 
            onClick={() => setIsProjectRequestModalOpen(true)}
            className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Start New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Active Projects" 
          value={stats.activeProjectsCount || 0} 
          icon={Box} 
          color="bg-indigo-50 text-indigo-600"
          isLoading={isLoading}
          subValue="Across organization"
        />
        <StatCard 
          label="Pending Invoices" 
          value={stats.pendingInvoicesCount || 0} 
          icon={CreditCard} 
          trend={stats.pendingInvoicesCount > 0 ? "Action Required" : null}
          color="bg-amber-50 text-amber-600"
          isLoading={isLoading}
          subValue={`$${(stats.unpaidBalance || 0).toLocaleString()} outstanding`}
        />
        <StatCard 
          label="Total Investment" 
          value={`$${(stats.totalInvestment || 0).toLocaleString()}`} 
          icon={Star} 
          color="bg-emerald-50 text-emerald-600"
          isLoading={isLoading}
          subValue="Lifetime spend"
        />
        <StatCard 
          label="Next Milestone" 
          value={stats.nextMeeting ? new Date(stats.nextMeeting.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'None'} 
          icon={Clock} 
          color="bg-rose-50 text-rose-600"
          isLoading={isLoading}
          subValue={stats.nextMeeting?.title || 'No upcoming events'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Active Projects & Actions */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Box className="w-5 h-5 text-indigo-600" /> Active Workspaces
              </h3>
              <Link to="/client/projects" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1">
                View all projects <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoading ? (
                [1, 2].map(i => (
                  <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-[2.5rem]" />
                ))
              ) : activeProjects.length > 0 ? activeProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              )) : (
                <div className="col-span-2 py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                  <Box className="w-12 h-12 text-slate-200 mb-4" />
                  <p className="text-slate-500 font-bold mb-4">No active projects in this workspace.</p>
                  <button onClick={() => setIsProjectRequestModalOpen(true)} className="text-sm font-black text-indigo-600 uppercase tracking-widest">Initiate Project Request</button>
                </div>
              )}
            </div>
          </section>

          {/* Quick Actions Grid */}
          <section>
             <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">Collaborative Actions</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: MessageSquare, label: 'Message Team', color: 'bg-indigo-600', link: '/client/messages' },
                  { icon: Upload, label: 'Upload File', color: 'bg-slate-900', action: () => setIsUploadModalOpen(true) },
                  { icon: FileText, label: 'Review Assets', color: 'bg-slate-900', link: '/client/files' },
                  { icon: Video, label: 'Join Meeting', color: 'bg-rose-500', action: () => window.open('https://meet.google.com', '_blank') },
                ].map((action, i) => (
                  action.link ? (
                    <Link 
                      key={i}
                      to={action.link}
                      className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:shadow-indigo-100/30 transition-all group text-center"
                    >
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6", action.color)}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{action.label}</span>
                    </Link>
                  ) : (
                    <button 
                      key={i}
                      onClick={action.action}
                      className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:shadow-indigo-100/30 transition-all group text-center"
                    >
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6", action.color)}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{action.label}</span>
                    </button>
                  )
                ))}
             </div>
          </section>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="space-y-10">
          <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-200">
            <h3 className="text-xl font-black tracking-tight mb-8 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" /> Recent Activity
            </h3>
            <div className="space-y-8">
              {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-4 relative group">
                  {i !== recentActivity.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-0 w-[1px] bg-white/10 group-hover:bg-indigo-500/30 transition-colors" />
                  )}
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors">
                    <Zap className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-relaxed">{activity.action.replace(/_/g, ' ')}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-slate-400 text-sm font-medium">No recent activity logged.</p>
              )}
            </div>
            <button className="w-full mt-10 py-4 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all">
              Full Audit Log
            </button>
          </section>

          {/* AI Insights Card */}
          <section className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-100 overflow-hidden relative group">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
             <div className="relative z-10">
               <Star className="w-8 h-8 text-indigo-200 mb-6" />
               <h3 className="text-2xl font-black tracking-tight mb-4">Workspace Health</h3>
               <p className="text-indigo-100 text-sm font-medium mb-8 leading-relaxed">
                 Your active projects are performing optimally. {stats.activeProjectsCount || 0} active workstreams are in progress with no critical blockers detected.
               </p>
             </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      <PortalModal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Strategy Session"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          scheduleMutation.mutate({
            projectId: activeProjects[0]?._id,
            title: formData.get('title'),
            date: formData.get('date'),
            notes: formData.get('notes'),
          });
        }} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Session Topic</label>
            <input name="title" required placeholder="e.g. Q2 Product Roadmap Review" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Date & Time</label>
            <input name="date" type="datetime-local" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes / Agenda</label>
            <textarea name="notes" rows="4" placeholder="What should we cover?" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600 resize-none" />
          </div>
          <button 
            type="submit" 
            disabled={scheduleMutation.isPending}
            className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            {scheduleMutation.isPending ? 'Scheduling...' : 'Request Session'}
          </button>
        </form>
      </PortalModal>

      <PortalModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Project Asset"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          uploadMutation.mutate({
            projectId: activeProjects[0]?._id,
            name: formData.get('name'),
            url: 'https://example.com/file.pdf',
            type: 'PDF'
          });
        }} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">File Description</label>
            <input name="name" required placeholder="e.g. Brand Guidelines Final" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600" />
          </div>
          <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-12 text-center hover:border-indigo-200 transition-colors cursor-pointer group">
             <Upload className="w-10 h-10 text-slate-200 mx-auto mb-4 group-hover:text-indigo-400 transition-colors" />
             <p className="text-sm font-bold text-slate-500">Drag and drop or click to select files</p>
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-2">Max file size: 25MB</p>
          </div>
          <button 
            type="submit"
            disabled={uploadMutation.isPending}
            className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all"
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Complete Upload'}
          </button>
        </form>
      </PortalModal>

      <PortalModal 
        isOpen={isProjectRequestModalOpen} 
        onClose={() => setIsProjectRequestModalOpen(false)}
        title="New Project Initiation"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          projectRequestMutation.mutate({
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            budget: formData.get('budget'),
            deadline: formData.get('deadline'),
          });
        }} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Title</label>
              <input name="title" required placeholder="e.g. AI Integration Phase 1" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select name="category" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600 appearance-none">
                <option>AI Automation</option>
                <option>Enterprise Software</option>
                <option>Cloud Infrastructure</option>
                <option>Data Strategy</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Objectives</label>
            <textarea name="description" rows="4" placeholder="Briefly describe the goals and scope..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Budget</label>
              <input name="budget" placeholder="e.g. $25k - $50k" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Desired Timeline</label>
              <input name="deadline" type="date" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-600" />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={projectRequestMutation.isPending}
            className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            {projectRequestMutation.isPending ? 'Submitting Request...' : 'Submit Enterprise Request'}
          </button>
        </form>
      </PortalModal>
    </div>
  );
};

export default ClientDashboard;
