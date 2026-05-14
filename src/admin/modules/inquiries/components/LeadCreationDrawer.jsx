import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  Target, 
  Tag as TagIcon, 
  MessageSquare,
  Shield,
  Zap,
  CheckCircle2,
  X
} from 'lucide-react';
import Drawer from '../../../components/Drawer';
import { cn } from '../../../utils/utils';

const LeadCreationDrawer = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      priority: 'medium',
      source: 'Direct Admin Input',
      status: 'new'
    }
  });

  const onFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Operational Lead"
      width="w-[550px]"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 pb-10">
        <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl flex gap-3 mb-6">
          <Shield className="w-5 h-5 text-indigo-600 mt-1" />
          <div>
            <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Enterprise Lead Registration</p>
            <p className="text-[11px] text-indigo-700 font-medium">Adding this lead will trigger automated AI scoring and real-time dashboard updates.</p>
          </div>
        </div>

        {/* Primary Info */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Basic Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  {...register('fullName', { required: true })}
                  placeholder="e.g. Pranav M"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              {errors.fullName && <p className="text-[10px] text-rose-500 font-bold ml-1 uppercase">Required</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Company</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  {...register('company')}
                  placeholder="Company name"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  {...register('phone')}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Lead Qualification</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Service Interest</label>
              <select 
                {...register('serviceInterested')}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="AI Automation">AI Automation</option>
                <option value="Web Development">Web Development</option>
                <option value="Custom Software">Custom Software</option>
                <option value="Cloud Architecture">Cloud Architecture</option>
                <option value="Discovery Call">Discovery Call</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Priority</label>
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                {['low', 'medium', 'high', 'urgent'].map(p => (
                  <label key={p} className="flex-1">
                    <input 
                      type="radio" 
                      value={p} 
                      {...register('priority')}
                      className="hidden peer"
                    />
                    <div className="text-center py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tighter cursor-pointer peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-sm text-slate-400 transition-all">
                      {p}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Inquiry Context</label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <textarea 
              {...register('message', { required: true })}
              placeholder="Tell us about the project requirements..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all min-h-[120px] resize-none"
            />
          </div>
          {errors.message && <p className="text-[10px] text-rose-500 font-bold ml-1 uppercase">Required</p>}
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 flex gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            Discard
          </button>
          <button 
            type="submit"
            disabled={isLoading}
            className="flex-[2] py-3 px-4 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Register Operational Lead
              </>
            )}
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default LeadCreationDrawer;
