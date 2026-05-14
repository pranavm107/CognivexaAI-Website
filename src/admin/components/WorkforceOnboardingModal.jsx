import React, { useState } from 'react';
import { X, UserPlus, Briefcase, Mail, Shield, Sparkles, Loader2, Users } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { toast } from 'react-hot-toast';

const WorkforceOnboardingModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: 'Engineering',
    designation: '',
    role: 'admin'
  });

  const mutation = useMutation({
    mutationFn: (data) => adminApi.onboardEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-workforce-team']);
      toast.success('Employee Onboarding Initialized');
      onClose();
    },
    onError: () => {
      toast.error('Failed to onboard employee');
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between">
           <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Onboard Employee</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Workforce OS Entry</p>
           </div>
           <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <X className="w-5 h-5" />
           </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(formData); }} className="p-12 space-y-8">
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</label>
                 <input 
                   required
                   type="text" 
                   value={formData.firstName}
                   onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                   placeholder="John" 
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</label>
                 <input 
                   required
                   type="text" 
                   value={formData.lastName}
                   onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                   placeholder="Doe" 
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
                 />
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Work Email</label>
              <div className="relative">
                 <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   required
                   type="email" 
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   placeholder="j.doe@company.com" 
                   className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none" 
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                 <select 
                   value={formData.department}
                   onChange={(e) => setFormData({...formData, department: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                 >
                    {['Engineering', 'Design', 'AI/Data', 'Product', 'Marketing', 'Sales', 'Support'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                 </select>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Level</label>
                 <select 
                   value={formData.role}
                   onChange={(e) => setFormData({...formData, role: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                 >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="support">Support</option>
                    <option value="sales">Sales</option>
                 </select>
              </div>
           </div>

           <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                 <Shield className="w-4 h-4 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Auto-Provisioning Workspace</span>
              </div>
              <div className="flex items-center gap-4">
                 <button type="button" onClick={onClose} className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-all">Cancel</button>
                 <button 
                   disabled={mutation.isLoading}
                   className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-sm font-black shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center gap-2"
                 >
                    {mutation.isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Onboarding'}
                 </button>
              </div>
           </div>
        </form>
      </div>
    </div>
  );
};

export default WorkforceOnboardingModal;
