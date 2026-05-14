import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  LifeBuoy, Search, Filter, 
  MessageSquare, Clock, AlertCircle,
  CheckCircle2, ArrowRight, User,
  Plus, ShieldAlert, Zap
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import SupportTicketModal from '../../components/SupportTicketModal';

const TicketCenter = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: ticketData } = useQuery({
    queryKey: ['admin-support-tickets'],
    queryFn: () => adminApi.getTickets()
  });

  const tickets = ticketData?.data || [];

  const getPriorityColor = (p) => {
    switch (p) {
      case 'critical': return 'bg-rose-500 text-white shadow-rose-100';
      case 'high': return 'bg-amber-500 text-white shadow-amber-100';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Support Desk</h1>
           <p className="text-slate-500 font-medium mt-1">Enterprise ticketing and SLA compliance monitoring.</p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2"
           >
              <Plus className="w-4 h-4 text-indigo-600" /> New Internal Ticket
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Escalation Matrix
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Filter Sidebar */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Status Overview</h4>
               <div className="space-y-4">
                  {[
                    { label: 'Open', count: tickets.filter(t => t.status === 'open').length, color: 'bg-emerald-500' },
                    { label: 'In Progress', count: tickets.filter(t => t.status === 'in_progress').length, color: 'bg-indigo-500' },
                    { label: 'Escalated', count: tickets.filter(t => t.status === 'escalated').length, color: 'bg-rose-500' },
                    { label: 'Resolved', count: tickets.filter(t => t.status === 'resolved').length, color: 'bg-slate-300' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className={cn("w-1.5 h-1.5 rounded-full", s.color)} />
                          <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{s.label}</span>
                       </div>
                       <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 transition-colors">{s.count}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
               <Zap className="w-8 h-8 mb-4 text-indigo-200" />
               <h4 className="text-lg font-black tracking-tight mb-2">SLA Health</h4>
               <p className="text-indigo-100 text-xs font-medium leading-relaxed opacity-80">
                  98.4% of tickets resolved within contract guarantees this week.
               </p>
            </div>
         </div>

         {/* Ticket List */}
         <div className="lg:col-span-3 space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-6 items-start">
                       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", getPriorityColor(ticket.priority))}>
                          <LifeBuoy className="w-7 h-7" />
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ticket.ticketId}</span>
                             <span className={cn(
                               "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest",
                               ticket.status === 'escalated' ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                             )}>
                                {ticket.status.replace(/_/g, ' ')}
                             </span>
                          </div>
                          <h4 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors mb-2">{ticket.title}</h4>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                             <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {ticket.requestedBy?.firstName}</span>
                             <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Deadline: {new Date(ticket.slaDeadline).toLocaleTimeString()}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <button className="px-5 py-3 bg-slate-50 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                          Manage
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      <SupportTicketModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default TicketCenter;
