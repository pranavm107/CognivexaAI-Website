import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, TrendingUp, Zap, 
  ArrowRight, ShieldCheck, 
  UserPlus, UserMinus, BarChart3,
  Search, Filter, Mail, Phone,
  ChevronRight, Plus
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import WorkforceOnboardingModal from '../../components/WorkforceOnboardingModal';

const WorkforceDashboard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: teamData } = useQuery({
    queryKey: ['admin-workforce-team'],
    queryFn: () => adminApi.getWorkforceTeam()
  });

  const team = teamData?.data || [];

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Workforce OS</h1>
           <p className="text-slate-500 font-medium mt-1">Enterprise human capital management and performance tracking.</p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2"
           >
              <Plus className="w-4 h-4 text-indigo-600" /> Onboard Employee
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Performance Review
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Active Workforce', value: team.length, icon: Users, color: 'text-indigo-600' },
           { label: 'Avg Utilization', value: '78.4%', icon: Zap, color: 'text-amber-600' },
           { label: 'Delivery Index', value: '9.2/10', icon: TrendingUp, color: 'text-emerald-600' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 mb-4", stat.color)}>
                 <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Team Directory */}
         <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Employee Directory</h4>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-slate-400">Sort by:</span>
                     <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-slate-900 focus:ring-0">
                        <option>Utilization</option>
                        <option>Department</option>
                     </select>
                  </div>
               </div>
               <div className="divide-y divide-slate-50">
                  {team.map((member) => (
                    <div key={member._id} className="p-8 hover:bg-slate-50/50 transition-all group flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="relative">
                             <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-lg overflow-hidden border-2 border-white shadow-lg">
                                {member.avatar ? <img src={member.avatar} alt="" className="w-full h-full object-cover" /> : member.firstName[0]}
                             </div>
                             <div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white", (member.utilizationPercentage || 0) > 80 ? "bg-rose-500" : "bg-emerald-500")} />
                          </div>
                          <div>
                             <h5 className="text-sm font-black text-slate-900 tracking-tight">{member.firstName} {member.lastName}</h5>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.department} • {member.role}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-12">
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Utilization</p>
                             <div className="flex items-center gap-3">
                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                   <div className={cn("h-full rounded-full", (member.utilizationPercentage || 0) > 80 ? "bg-rose-500" : "bg-indigo-600")} style={{ width: `${member.utilizationPercentage || 0}%` }} />
                                </div>
                                <span className="text-xs font-black text-slate-900">{member.utilizationPercentage || 0}%</span>
                             </div>
                          </div>
                          <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 hover:shadow-lg transition-all opacity-0 group-hover:opacity-100">
                             <ChevronRight className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Analytics Sidebar */}
         <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full translate-x-8 -translate-y-8" />
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                     <Users className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Total Workforce</h4>
                  <p className="text-4xl font-black mb-1">{team.length}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Active Organizational Nodes</p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Resource Health</h4>
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg Utilization</span>
                        <span className="text-[10px] font-black text-slate-900">74%</span>
                     </div>
                     <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '74%' }} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <WorkforceOnboardingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default WorkforceDashboard;
