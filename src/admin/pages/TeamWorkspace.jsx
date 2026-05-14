import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, Search, User, Shield, 
  Mail, MapPin, Zap, MoreVertical,
  Activity, Users2, Building, Trash2, 
  Settings2, UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import Drawer from '../components/Drawer';

const TeamWorkspace = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: result, isLoading } = useQuery({
    queryKey: ['admin-team'],
    queryFn: () => apiClient.get('/cms/team'),
  });

  const team = result?.results || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Team Operations</h1>
          <p className="text-slate-500 font-medium mt-1">Manage personnel, permissions, and internal presence.</p>
        </div>
        
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group active:scale-95"
        >
          <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          ONBOARD MEMBER
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isLoading ? (
          [1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-100 rounded-[2.5rem] animate-pulse" />)
        ) : (
          team.map((member, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={member._id} 
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all text-center relative group"
            >
              <button className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400 hover:text-slate-900">
                <Settings2 className="w-4 h-4" />
              </button>

              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-[2rem] bg-slate-100 border-4 border-white shadow-xl mx-auto flex items-center justify-center text-slate-400">
                  {member.avatar ? (
                    <img src={member.avatar} alt="" className="w-full h-full rounded-[2rem] object-cover" />
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white shadow-sm",
                  member.activeStatus === 'online' ? "bg-emerald-500" : "bg-slate-300"
                )} />
              </div>
              
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{member.fullName}</h3>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">{member.role}</p>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                  <Shield className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Admin</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Department</p>
                  <p className="text-[11px] font-bold text-slate-900 truncate">{member.department || 'Operations'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Joined</p>
                  <p className="text-[11px] font-bold text-slate-900 truncate">2024</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        title="Personnel Configuration"
      >
        <p className="text-slate-500 text-sm">Team member on-boarding form goes here.</p>
      </Drawer>
    </div>
  );
};

export default TeamWorkspace;
