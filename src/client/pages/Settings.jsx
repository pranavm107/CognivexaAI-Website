import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  User, Building, Shield, Bell, 
  CreditCard, Globe, Camera, ArrowRight,
  LogOut, Save, RefreshCw, Key, LogIn
} from 'lucide-react';
import { useClientAuthStore } from '../store/authStore';
import { clientApi } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import PortalModal from '../components/PortalModal';

const SettingSection = ({ icon: Icon, title, description, children }) => (
  <div className="bg-white rounded-[3rem] border border-slate-100 p-10 lg:p-14 shadow-sm">
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="lg:w-1/3">
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-3">{title}</h3>
        <p className="text-base font-medium text-slate-500 leading-relaxed">{description}</p>
      </div>
      <div className="lg:w-2/3">
        {children}
      </div>
    </div>
  </div>
);

const Settings = () => {
  const { user, client, logout } = useClientAuthStore();
  const queryClient = useQueryClient();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: clientApi.updateProfile,
    onSuccess: (data) => {
      // In a real app, update the store's user too
      queryClient.invalidateQueries(['client-dashboard']);
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: clientApi.updatePassword,
    onSuccess: () => {
      setIsPasswordModalOpen(false);
      alert('Password updated successfully');
    }
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateProfileMutation.mutate({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updatePasswordMutation.mutate({
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 pb-20">
      <div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Configuration</h1>
        <p className="text-slate-500 font-medium text-lg">Manage your enterprise identity, workspace preferences, and security protocols.</p>
      </div>

      <SettingSection 
        icon={User} 
        title="Personal Identity" 
        description="Configure how your identity appears across the enterprise workspace and collaboration channels."
      >
        <form onSubmit={handleProfileSubmit} className="space-y-8">
           <div className="flex items-center gap-8 mb-10">
             <div className="relative group">
               <div className="w-28 h-28 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-indigo-100 transition-all">
                 {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-slate-200" />}
               </div>
               <button type="button" className="absolute -bottom-2 -right-2 w-12 h-12 bg-white border border-slate-100 rounded-2xl shadow-xl flex items-center justify-center text-slate-900 hover:bg-indigo-600 hover:text-white transition-all scale-90 hover:scale-100">
                 <Camera className="w-5 h-5" />
               </button>
             </div>
             <div>
               <h4 className="text-2xl font-black text-slate-900 leading-tight">{user?.firstName} {user?.lastName}</h4>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{user?.role?.replace('_', ' ')}</p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Legal First Name</label>
                <input name="firstName" type="text" defaultValue={user?.firstName} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 focus:outline-none focus:border-indigo-600 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Legal Last Name</label>
                <input name="lastName" type="text" defaultValue={user?.lastName} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 focus:outline-none focus:border-indigo-600 transition-all" />
              </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Work Email Address</label>
              <input name="email" type="email" defaultValue={user?.email} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 focus:outline-none focus:border-indigo-600 transition-all" />
           </div>

           <button 
             type="submit"
             disabled={updateProfileMutation.isPending}
             className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-2xl shadow-slate-200"
           >
             {updateProfileMutation.isPending ? 'Persisting...' : 'Save Profile Changes'} <Save className="w-4 h-4" />
           </button>
        </form>
      </SettingSection>

      <SettingSection 
        icon={Building} 
        title="Enterprise Workspace" 
        description="Global configuration for your organization's workspace, branding, and regional settings."
      >
        <div className="space-y-8">
           <div className="space-y-1.5">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Organization Name</label>
             <input type="text" defaultValue={client?.companyName} readOnly className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black text-slate-400 cursor-not-allowed" />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Primary Industry</label>
                <input type="text" placeholder="Artificial Intelligence" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 focus:outline-none focus:border-indigo-600" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Operational Timezone</label>
                <div className="relative">
                  <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-8 text-sm font-black text-slate-900 focus:outline-none focus:border-indigo-600 appearance-none">
                    <option>UTC - Greenwich Mean Time</option>
                    <option>EST - Eastern Standard Time</option>
                    <option>PST - Pacific Standard Time</option>
                  </select>
                </div>
              </div>
           </div>

           <div className="p-8 bg-indigo-50/50 border border-indigo-100 rounded-[2rem] flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-indigo-900">Enterprise Features</p>
                <p className="text-xs font-medium text-indigo-600 mt-1">Your organization is currently on the <span className="font-black underline">Titanium Plan</span>.</p>
              </div>
              <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all">
                Manage Billing
              </button>
           </div>
        </div>
      </SettingSection>

      <SettingSection 
        icon={Shield} 
        title="Security Protocol" 
        description="Manage your account access through multi-factor authentication and high-entropy password rotation."
      >
        <div className="space-y-6">
           <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-indigo-100 transition-all">
             <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-110 transition-transform">
                 <Key className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-base font-black text-slate-900">Account Password</p>
                 <p className="text-xs font-medium text-slate-400">Regular rotation enhances infrastructure security.</p>
               </div>
             </div>
             <button 
               onClick={() => setIsPasswordModalOpen(true)}
               className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-sm"
             >
               Modify
             </button>
           </div>

           <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-rose-100 transition-all">
             <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                 <LogOut className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-base font-black text-slate-900">Terminate Session</p>
                 <p className="text-xs font-medium text-slate-400">Securely exit the enterprise collaboration platform.</p>
               </div>
             </div>
             <button 
               onClick={logout}
               className="px-8 py-3 bg-white border border-rose-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
             >
               Logout
             </button>
           </div>

           <div className="p-10 bg-rose-50 rounded-[2.5rem] border border-rose-100 mt-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-black text-rose-600">Danger Zone</p>
                  <p className="text-sm font-medium text-rose-400 max-w-sm mt-1 leading-relaxed">Permanently deactivate this user and revoke all access to the {client?.companyName} workspace.</p>
                </div>
                <button className="px-8 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-700 transition-all shadow-xl shadow-rose-100">
                  Deactivate Account
                </button>
              </div>
           </div>
        </div>
      </SettingSection>

      {/* Password Modal */}
      <PortalModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)}
        title="Password Synchronization"
      >
        <form onSubmit={handlePasswordSubmit} className="space-y-8">
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
              <input name="currentPassword" type="password" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 focus:outline-none focus:border-indigo-600" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New High-Entropy Password</label>
              <input name="newPassword" type="password" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-sm font-black text-slate-900 focus:outline-none focus:border-indigo-600" />
           </div>
           <button 
             type="submit" 
             disabled={updatePasswordMutation.isPending}
             className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-100 hover:bg-indigo-600 transition-all"
           >
             {updatePasswordMutation.isPending ? 'Syncing...' : 'Update Security Protocol'}
           </button>
        </form>
      </PortalModal>
    </div>
  );
};

export default Settings;
