import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  Users, Search, Filter, 
  MoreHorizontal, Eye, ShieldAlert,
  Power, Mail, Building2, TrendingUp,
  Activity, Star, ExternalLink, ShieldCheck
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { cn } from '../../utils/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ClientManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const { data: clientsData, isLoading } = useQuery({
    queryKey: ['admin-clients'],
    queryFn: adminApi.getClients
  });

  const impersonateMutation = useMutation({
    mutationFn: (clientId) => adminApi.impersonateClient(clientId),
    onSuccess: (data) => {
      // Store impersonation token and redirect to client dashboard
      localStorage.setItem('impersonation_token', data.data.token);
      window.open('/client/dashboard?impersonate=true', '_blank');
    }
  });

  const clients = (clientsData?.results || []).filter(c => 
    c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Client Directory</h1>
           <p className="text-slate-500 font-medium mt-1">Manage enterprise accounts and workspace health.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search organizations..." 
                className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold w-80 focus:outline-none focus:border-indigo-600 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
              <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Clients', value: clients.length, icon: Users, color: 'text-indigo-600' },
           { label: 'Avg Health Score', value: '94%', icon: Activity, color: 'text-emerald-600' },
           { label: 'Growth Rate', value: '+18%', icon: TrendingUp, color: 'text-amber-600' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 mb-4", stat.color)}>
                 <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
           </div>
         ))}
      </div>

      {/* Client Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Organization</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Plan</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Health</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {clients.map((client) => (
                    <tr key={client._id} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg">
                                {client.companyName?.[0] || 'C'}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 tracking-tight">{client.companyName || 'Enterprise Client'}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {client._id.slice(-8)}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <img src={client.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${client.firstName}`} className="w-8 h-8 rounded-full" alt="avatar" />
                             <div>
                                <p className="text-xs font-bold text-slate-900">{client.firstName} {client.lastName}</p>
                                <p className="text-[10px] font-medium text-slate-400">{client.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">Enterprise</span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[95%]" />
                             </div>
                             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">95%</span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Active
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button 
                               onClick={() => impersonateMutation.mutate(client._id)}
                               className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-lg transition-all"
                               title="Impersonate Workspace"
                             >
                                <ShieldCheck className="w-4 h-4" />
                             </button>
                             <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 hover:shadow-lg transition-all">
                                <MoreHorizontal className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default ClientManagementPage;
