import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus, 
  User, 
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Zap,
  Grid,
  List as ListIcon,
  Download,
  ShieldCheck
} from 'lucide-react';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import LeadDrawer from '../modules/inquiries/components/LeadDrawer';
import LeadCreationDrawer from '../modules/inquiries/components/LeadCreationDrawer';
import ProposalDrawer from '../modules/inquiries/components/ProposalDrawer';
import dayjs from 'dayjs';
import { useSocket } from '../hooks/useSocket';

const statusConfig = {
  new: { label: 'New', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  contacted: { label: 'Contacted', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  qualified: { label: 'Qualified', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  discovery_scheduled: { label: 'Discovery', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  proposal_sent: { label: 'Proposal', color: 'bg-pink-50 text-pink-600 border-pink-100' },
  negotiation: { label: 'Negotiation', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  converted: { label: 'Converted', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  closed_lost: { label: 'Closed Lost', color: 'bg-slate-50 text-slate-500 border-slate-100' },
  archived: { label: 'Archived', color: 'bg-slate-50 text-slate-400 border-slate-100' },
};

const priorityConfig = {
  urgent: { label: 'Urgent', color: 'text-rose-600 bg-rose-50 border-rose-100' },
  high: { label: 'High', color: 'text-orange-600 bg-orange-50 border-orange-100' },
  medium: { label: 'Medium', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  low: { label: 'Low', color: 'text-slate-500 bg-slate-50 border-slate-100' },
};

const InquiryWorkspace = () => {
  // useSocket(); // Now handled globally in AdminLayout
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'pipeline'
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Queries
  const { data: result, isLoading } = useQuery({
    queryKey: ['admin-inquiries', searchTerm],
    queryFn: () => apiClient.get('/inquiries', { params: { search: searchTerm } }),
  });

  const { data: selectedInquiry } = useQuery({
    queryKey: ['admin-inquiry', selectedInquiryId],
    queryFn: () => apiClient.get(`/inquiries/${selectedInquiryId}`),
    enabled: !!selectedInquiryId,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data) => apiClient.post('/inquiries', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-inquiries']);
      queryClient.invalidateQueries(['admin-dashboard-stats']);
      setIsCreateOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.patch(`/inquiries/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-inquiries']);
      queryClient.invalidateQueries(['admin-inquiry', selectedInquiryId]);
    }
  });

  const addNoteMutation = useMutation({
    mutationFn: ({ id, content, notifyClient }) => apiClient.post(`/inquiries/${id}/notes`, { content, notifyClient }),
    onSuccess: () => queryClient.invalidateQueries(['admin-inquiry', selectedInquiryId]),
  });

  const sendProposalMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.post(`/inquiries/${id}/send-proposal`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-inquiries']);
      queryClient.invalidateQueries(['admin-inquiry', selectedInquiryId]);
      setIsProposalOpen(false);
    }
  });

  const runAIMutation = useMutation({
    mutationFn: (id) => apiClient.post(`/inquiries/${id}/analyze`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-inquiries']);
      queryClient.invalidateQueries(['admin-inquiry', selectedInquiryId]);
    }
  });

  const inquiries = result?.results || result?.data?.results || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Inquiry Workspace</h1>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-md border border-indigo-100">
              CRM Alpha
            </span>
          </div>
          <p className="text-slate-500 font-medium text-sm">Operational hub for lead qualification and management.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setViewMode('table')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'table' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('pipeline')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'pipeline' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Lead
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 w-full max-w-xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads, companies, or emails..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        
        <div className="flex items-center gap-4 px-4 border-l border-slate-100 hidden md:flex">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400">3 Online</span>
          </div>
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No leads found</h3>
            <p className="text-slate-500 text-sm max-w-xs mt-1">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/30">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] w-[280px]">Lead Entity</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Workflow Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Priority</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">AI Insights</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Created</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inquiry) => (
                  <tr 
                    key={inquiry._id} 
                    onClick={() => setSelectedInquiryId(inquiry._id)}
                    className="group hover:bg-slate-50/50 cursor-pointer transition-all active:bg-slate-100"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          {inquiry.fullName?.charAt(0) || inquiry.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                            {inquiry.fullName || inquiry.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1.5 font-medium flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {inquiry.company || 'Private Individual'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[11px] font-bold border transition-all",
                        statusConfig[inquiry.status]?.color || 'bg-slate-50 text-slate-600 border-slate-100'
                      )}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {statusConfig[inquiry.status]?.label || inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider",
                        priorityConfig[inquiry.priority]?.color || 'text-slate-500 bg-slate-50 border-slate-100'
                      )}>
                        {inquiry.priority}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {inquiry.aiIntelligence ? (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[120px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 rounded-full transition-all" 
                              style={{ width: `${inquiry.aiIntelligence.score}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-indigo-600">{inquiry.aiIntelligence.score}%</span>
                          {inquiry.aiIntelligence.urgency === 'high' && (
                            <Zap className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                          )}
                        </div>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            runAIMutation.mutate(inquiry._id);
                          }}
                          className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                        >
                          <ShieldCheck className="w-3 h-3" />
                          Generate Insight
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{dayjs(inquiry.createdAt).format('MMM D, YYYY')}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tighter">{dayjs(inquiry.createdAt).format('h:mm A')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-sm">
                          <MessageSquare className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200 shadow-sm text-indigo-600">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <LeadDrawer 
        isOpen={!!selectedInquiryId}
        onClose={() => setSelectedInquiryId(null)}
        inquiry={selectedInquiry}
        onUpdateStatus={(id, status) => updateMutation.mutate({ id, data: { status } })}
        onAddNote={(id, content, notifyClient) => addNoteMutation.mutate({ id, content, notifyClient })}
        onRunAI={(id) => runAIMutation.mutate(id)}
        onOpenProposal={() => setIsProposalOpen(true)}
      />

      <ProposalDrawer 
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        inquiry={selectedInquiry}
        onSubmit={(data) => sendProposalMutation.mutate({ id: selectedInquiryId, data })}
        isLoading={sendProposalMutation.isPending}
      />

      <LeadCreationDrawer 
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />
    </div>
  );
};

// Helper for missing icons
const Building2 = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-7h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default InquiryWorkspace;
