import React, { useState } from 'react';
import { X, LifeBuoy, AlertCircle, User, ShieldAlert, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { toast } from 'react-hot-toast';

const SupportTicketModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    type: 'technical'
  });

  const mutation = useMutation({
    mutationFn: (data) => adminApi.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-support-tickets']);
      toast.success('Enterprise Support Ticket Initialized');
      onClose();
    },
    onError: () => {
      toast.error('Failed to create ticket');
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between">
           <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">New Support Ticket</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Operational Issue Entry</p>
           </div>
           <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <X className="w-5 h-5" />
           </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData); }} className="p-12 space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <MessageSquare className="w-3 h-3" /> Ticket Subject
              </label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. SSO Integration failing on Staging" 
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
              />
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority Level</label>
                 <select 
                   value={formData.priority}
                   onChange={(e) => setFormData({...formData, priority: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                 >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                 </select>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue Type</label>
                 <select 
                   value={formData.type}
                   onChange={(e) => setFormData({...formData, type: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                 >
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="security">Security</option>
                    <option value="onboarding">Onboarding</option>
                 </select>
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Provide comprehensive details about the issue..." 
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none resize-none"
              />
           </div>

           <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600">
                 <ShieldAlert className="w-4 h-4 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">SLA Monitoring Active</span>
              </div>
              <div className="flex items-center gap-4">
                 <button type="button" onClick={onClose} className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all">Cancel</button>
                 <button 
                   disabled={mutation.isLoading}
                   className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-sm font-black shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center gap-2"
                 >
                    {mutation.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Initialize Ticket'}
                 </button>
              </div>
           </div>
        </form>
      </div>
    </div>
  );
};

export default SupportTicketModal;
