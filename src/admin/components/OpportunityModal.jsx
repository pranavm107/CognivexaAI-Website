import React, { useState } from 'react';
import { X, DollarSign, Target, Calendar, User, Briefcase, Sparkles, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { toast } from 'react-hot-toast';

const OpportunityModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    clientName: '',
    stage: 'lead',
    expectedCloseDate: ''
  });

  const mutation = useMutation({
    mutationFn: (data) => adminApi.createOpportunity(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-crm-pipeline']);
      toast.success('Enterprise Opportunity Created');
      onClose();
    },
    onError: () => {
      toast.error('Failed to create opportunity');
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between">
           <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Opportunity</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Sales Pipeline Entry</p>
           </div>
           <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <X className="w-5 h-5" />
           </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData); }} className="p-12 space-y-8">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Target className="w-3 h-3" /> Deal Title
                 </label>
                 <input 
                   required
                   type="text" 
                   value={formData.title}
                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                   placeholder="e.g. Q3 AI Transformation" 
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-emerald-500" /> Contract Value (USD)
                 </label>
                 <input 
                   required
                   type="number" 
                   value={formData.value}
                   onChange={(e) => setFormData({...formData, value: e.target.value})}
                   placeholder="0.00" 
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="w-3 h-3" /> Organization
                 </label>
                 <input 
                   required
                   type="text" 
                   value={formData.clientName}
                   onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                   placeholder="Client Name" 
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Expected Close
                 </label>
                 <input 
                   required
                   type="date" 
                   value={formData.expectedCloseDate}
                   onChange={(e) => setFormData({...formData, expectedCloseDate: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
                 />
              </div>
           </div>

           <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                 <Sparkles className="w-4 h-4 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">AI Forecasting Enabled</span>
              </div>
              <div className="flex items-center gap-4">
                 <button type="button" onClick={onClose} className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all">Cancel</button>
                 <button 
                   disabled={mutation.isLoading}
                   className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-sm font-black shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center gap-2"
                 >
                    {mutation.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Opportunity'}
                 </button>
              </div>
           </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityModal;
