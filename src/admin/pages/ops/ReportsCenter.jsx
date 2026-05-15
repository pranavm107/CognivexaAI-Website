import React from 'react';
import { 
  FileText, Download, PieChart, 
  BarChart3, Activity, Users, 
  CreditCard, Shield, ChevronRight,
  Plus, Calendar, Filter, Star
} from 'lucide-react';
import { cn } from '../../utils/utils';
import { motion } from 'framer-motion';

const ReportCard = ({ title, description, icon: Icon, type, color }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/30 transition-all group">
    <div className="flex justify-between items-start mb-8">
       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3", color)}>
          <Icon className="w-7 h-7" />
       </div>
       <span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest">{type}</span>
    </div>
    <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
    <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">{description}</p>
    <div className="flex items-center gap-3">
       <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
          <Download className="w-4 h-4" /> Generate PDF
       </button>
       <button className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-all">
          <Calendar className="w-5 h-5" />
       </button>
    </div>
  </div>
);

const ReportsCenter = () => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Reporting Intelligence</h1>
           <p className="text-slate-500 font-medium mt-1">Automated business intelligence and operational audits.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> Custom Report
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all">
              Scheduled Reports
           </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <ReportCard 
           title="Annual Revenue Audit" 
           description="Comprehensive financial breakdown including MRR, churn, and LTV projections for the fiscal year."
           icon={CreditCard} 
           type="Financial"
           color="bg-emerald-50 text-emerald-600"
         />
         <ReportCard 
           title="Operational Velocity" 
           description="Analysis of project completion rates, team utilization, and bottleneck identification across all workstreams."
           icon={Activity} 
           type="Operations"
           color="bg-indigo-50 text-indigo-600"
         />
         <ReportCard 
           title="Security Compliance" 
           description="Full forensic audit of authentication events, IP access logs, and administrative impersonation history."
           icon={Shield} 
           type="Security"
           color="bg-rose-50 text-rose-600"
         />
         <ReportCard 
           title="Client Engagement Hub" 
           description="Health indexing of all enterprise clients, including response rates and satisfaction metrics."
           icon={Users} 
           type="Client"
           color="bg-amber-50 text-amber-600"
         />
         <ReportCard 
           title="Resource Utilization" 
           description="Real-time map of team capacity, task allocation, and future resource requirements for project scaling."
           icon={BarChart3} 
           type="Strategy"
           color="bg-slate-900 text-white"
         />
         <ReportCard 
           title="Executive Summary" 
           description="High-level dashboard snapshot for board-level reporting and strategic decision making."
           icon={Star} 
           type="Management"
           color="bg-purple-50 text-purple-600"
         />
      </div>

      {/* Recent Downloads Section */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-10 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Archives</h3>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
               View All <ChevronRight className="w-3 h-3" />
            </button>
         </div>
         <div className="p-6 md:p-undefined text-center space-y-4 opacity-30">
            <FileText className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-black uppercase tracking-widest text-slate-400">Archive Clear</p>
         </div>
      </div>
    </div>
  );
};

export default ReportsCenter;
