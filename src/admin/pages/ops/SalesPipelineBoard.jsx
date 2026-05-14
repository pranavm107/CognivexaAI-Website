import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, DollarSign, Target, 
  Plus, MoreHorizontal, Calendar,
  ArrowRight, Briefcase, Users,
  Filter, LayoutGrid
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import OpportunityModal from '../../components/OpportunityModal';

const SalesPipelineBoard = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { data: pipelineData } = useQuery({
    queryKey: ['admin-crm-pipeline'],
    queryFn: () => adminApi.getSalesPipeline()
  });

  const opportunities = pipelineData?.data || [];
  const stages = ['lead', 'qualified', 'proposal_sent', 'negotiation', 'won'];

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">CRM & Sales</h1>
           <p className="text-slate-500 font-medium mt-1">Enterprise pipeline velocity and revenue forecasting.</p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black shadow-sm hover:shadow-xl transition-all flex items-center gap-2"
           >
              <Plus className="w-4 h-4 text-indigo-600" /> New Opportunity
           </button>
           <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Revenue Forecast
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {stages.map((stage) => {
          const stageDeals = opportunities.filter(o => o.stage === stage);
          const totalValue = stageDeals.reduce((acc, o) => acc + (o.value || 0), 0);
          
          return (
            <div key={stage} className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <div>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stage.replace(/_/g, ' ')}</h4>
                   <p className="text-xs font-black text-slate-900 mt-0.5">${totalValue.toLocaleString()}</p>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-black">{stageDeals.length}</span>
              </div>
              
              <div className="space-y-4 min-h-[500px] p-2 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                {stageDeals.map((deal) => (
                  <div key={deal._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[8px] font-black uppercase tracking-widest">Deal</span>
                       <button className="text-slate-300 hover:text-slate-900 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                       </button>
                    </div>
                    <h5 className="text-sm font-black text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">{deal.title}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{deal.client?.companyName || 'Enterprise'}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                       <div className="flex items-center gap-1.5 text-slate-900 font-black text-sm">
                          <DollarSign className="w-3 h-3 text-emerald-500" />
                          {(deal.value || 0).toLocaleString()}
                       </div>
                       <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400 uppercase">
                          {deal.owner?.firstName?.[0] || 'A'}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <OpportunityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default SalesPipelineBoard;
