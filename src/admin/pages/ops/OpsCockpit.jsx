import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Zap, ShieldAlert, CheckCircle2, 
  Clock, AlertTriangle, ArrowRight,
  ExternalLink, User, MessageSquare,
  FileText, CreditCard
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';

const QueueItem = ({ type, title, subtitle, priority, time, status, onClick }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
       <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
            type === 'escalation' ? "bg-rose-50 text-rose-600" : 
            type === 'approval' ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"
          )}>
             {type === 'escalation' ? <ShieldAlert className="w-5 h-5" /> : 
              type === 'approval' ? <CheckCircle2 className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          </div>
          <div>
             <h5 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{title}</h5>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>
          </div>
       </div>
       <span className={cn(
         "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest",
         priority === 'critical' ? "bg-rose-100 text-rose-600" : 
         priority === 'high' ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"
       )}>
          {priority}
       </span>
    </div>
    
    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Clock className="w-3 h-3" /> {time}
       </div>
       <button onClick={onClick} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
          <ExternalLink className="w-3.5 h-3.5" />
       </button>
    </div>
  </div>
);

const OpsCockpit = () => {
  const { data: queueData } = useQuery({
    queryKey: ['admin-ops-queues'],
    queryFn: () => adminApi.getOpsQueues(),
    refetchInterval: 5000
  });

  const { data: timelineData } = useQuery({
    queryKey: ['admin-ops-timeline'],
    queryFn: () => adminApi.getOpsTimeline(),
    refetchInterval: 5000
  });

  const queues = queueData?.data || { escalations: [], approvals: { contracts: [], invoices: [] }, support: [] };
  const timeline = timelineData?.data || [];

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Ops Cockpit</h1>
           <p className="text-slate-500 font-medium mt-1">Unified operational orchestration and cross-departmental queues.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Operational Flow: Nominal
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Critical Escalations */}
         <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Escalation Queue</h4>
               <span className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-md text-[10px] font-black">{queues.escalations.length}</span>
            </div>
            <div className="space-y-4">
               {queues.escalations.map((item) => (
                 <QueueItem 
                   key={item._id}
                   type="escalation"
                   title={item.title}
                   subtitle={item.department}
                   priority={item.severity}
                   time={new Date(item.createdAt).toLocaleTimeString()}
                 />
               ))}
               {queues.escalations.length === 0 && (
                 <div className="p-12 text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                    <Zap className="w-8 h-8 text-slate-200 mx-auto mb-4" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No active escalations</p>
                 </div>
               )}
            </div>
         </div>

         {/* Pending Approvals */}
         <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Approval Queue</h4>
               <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded-md text-[10px] font-black">
                 {queues.approvals.contracts.length + queues.approvals.invoices.length}
               </span>
            </div>
            <div className="space-y-4">
               {queues.approvals.contracts.map((item) => (
                 <QueueItem 
                   key={item._id}
                   type="approval"
                   title={item.title || 'Master Service Agreement'}
                   subtitle={item.client?.companyName}
                   priority="high"
                   time="Awaiting Legal"
                 />
               ))}
               {queues.approvals.invoices.map((item) => (
                 <QueueItem 
                   key={item._id}
                   type="approval"
                   title={`Invoice ${item.invoiceNumber}`}
                   subtitle={item.client?.companyName}
                   priority="medium"
                   time="Awaiting Finance"
                 />
               ))}
            </div>
         </div>

         {/* Operational Timeline */}
         <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Live Timeline</h4>
               <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Realtime Sync</span>
            </div>
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm p-8 max-h-[700px] overflow-y-auto">
               <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                  {timeline.map((log, i) => (
                    <div key={i} className="relative pl-10">
                       <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-slate-50 border-4 border-white flex items-center justify-center z-10 shadow-sm">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            log.severity === 'critical' ? "bg-rose-500" : 
                            log.severity === 'warning' ? "bg-amber-500" : "bg-indigo-500"
                          )} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tight">
                             {log.action.replace(/_/g, ' ')}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                             {log.userId?.firstName} • {new Date(log.createdAt).toLocaleTimeString()}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OpsCockpit;
