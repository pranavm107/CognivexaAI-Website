import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Clock, 
  Shield, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  UserPlus, 
  ArrowRight,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Send,
  Archive,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Drawer from '../../../components/Drawer';
import { cn } from '../../../utils/utils';
import dayjs from 'dayjs';

const LeadDrawer = ({ inquiry, isOpen, onClose, onUpdateStatus, onAddNote, onRunAI, onOpenProposal }) => {
  const [note, setNote] = useState('');
  const [notifyClient, setNotifyClient] = useState(false);

  if (!inquiry) return null;

  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onAddNote(inquiry._id, note, notifyClient);
    setNote('');
    setNotifyClient(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Lead Operations"
      width="w-[600px]"
      footer={
        <div className="flex gap-3">
          <button 
            onClick={onOpenProposal}
            disabled={inquiry.status === 'converted'}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Send Proposal
          </button>
          <button 
            onClick={() => onUpdateStatus(inquiry._id, 'archived')}
            className="px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
          >
            <Archive className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="space-y-8 pb-8">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
              {inquiry.fullName?.charAt(0) || inquiry.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{inquiry.fullName || inquiry.name}</h2>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                {inquiry.company || 'Private Lead'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider",
              inquiry.priority === 'urgent' ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-slate-50 text-slate-600 border-slate-100"
            )}>
              {inquiry.priority}
            </span>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              ID: {inquiry._id.slice(-8)}
            </p>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="relative group">
            <select 
              onChange={(e) => onUpdateStatus(inquiry._id, e.target.value)}
              value={inquiry.status}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            >
              <option value="new">New</option>
              <option value="qualified">Qualified</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="in_discussion">In Discussion</option>
              <option value="converted">Converted</option>
              <option value="closed_lost">Closed Lost</option>
            </select>
            <button className="w-full flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-indigo-200 group-hover:bg-indigo-50/30 transition-all">
              <TrendingUp className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mb-2" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Status</span>
            </button>
          </div>
          <button 
            onClick={() => onRunAI(inquiry._id)}
            className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
          >
            <Zap className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mb-2" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Analyze</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
            <Calendar className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mb-2" />
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Schedule</span>
          </button>
        </div>

        {/* AI Intelligence Panel */}
        {inquiry.aiIntelligence && (
          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
            <Zap className="absolute top-[-10px] right-[-10px] w-24 h-24 text-white/10 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-100">AI Intelligence</span>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                  Score: {inquiry.aiIntelligence.score}%
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed mb-4 text-indigo-50">
                {inquiry.aiIntelligence.summary}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/10 rounded-xl p-3 border border-white/10">
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Probability</p>
                  <p className="text-lg font-bold">{(inquiry.aiIntelligence.conversionProbability * 100).toFixed(0)}%</p>
                </div>
                <div className="flex-1 bg-white/10 rounded-xl p-3 border border-white/10">
                  <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Sentiment</p>
                  <p className="text-lg font-bold capitalize">{inquiry.aiIntelligence.sentiment}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white bg-white/20 p-3 rounded-xl border border-white/20">
                <TrendingUp className="w-4 h-4 text-indigo-200" />
                Next: {inquiry.aiIntelligence.recommendedNextAction}
              </div>
            </div>
          </div>
        )}

        {/* Automation Status Panel */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Notification Status</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className={cn(
              "p-3 rounded-xl border flex items-center gap-3",
              inquiry.notifications?.inquiryReceived ? "bg-emerald-50 border-emerald-100" : "bg-slate-50 border-slate-100 opacity-60"
            )}>
              <CheckCircle2 className={cn("w-4 h-4", inquiry.notifications?.inquiryReceived ? "text-emerald-500" : "text-slate-300")} />
              <div>
                <p className={cn("text-[9px] font-bold uppercase", inquiry.notifications?.inquiryReceived ? "text-emerald-700" : "text-slate-500")}>Confirmed</p>
                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tighter">Capture</p>
              </div>
            </div>
            <div className={cn(
              "p-3 rounded-xl border flex items-center gap-3",
              inquiry.notifications?.proposalSent ? "bg-pink-50 border-pink-100" : "bg-slate-50 border-slate-100 opacity-60"
            )}>
              <Send className={cn("w-4 h-4", inquiry.notifications?.proposalSent ? "text-pink-500" : "text-slate-300")} />
              <div>
                <p className={cn("text-[9px] font-bold uppercase", inquiry.notifications?.proposalSent ? "text-pink-700" : "text-slate-500")}>Proposal</p>
                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tighter">Delivered</p>
              </div>
            </div>
            <div className={cn(
              "p-3 rounded-xl border flex items-center gap-3",
              inquiry.notifications?.statusUpdated ? "bg-indigo-50 border-indigo-100" : "bg-slate-50 border-slate-100 opacity-60"
            )}>
              <MessageSquare className={cn("w-4 h-4", inquiry.notifications?.statusUpdated ? "text-indigo-500" : "text-slate-300")} />
              <div>
                <p className={cn("text-[9px] font-bold uppercase", inquiry.notifications?.statusUpdated ? "text-indigo-700" : "text-slate-500")}>Updated</p>
                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tighter">Workflow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Contact Information</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
              <p className="text-sm font-bold text-slate-700 break-all">{inquiry.email}</p>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
              <p className="text-sm font-bold text-slate-700">{inquiry.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Project Parameters */}
        {(inquiry.budget || inquiry.timeline) && (
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Project Requirements</h4>
            <div className="grid grid-cols-2 gap-3">
              {inquiry.budget && (
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Budget</p>
                  <p className="text-sm font-bold text-slate-700">{inquiry.budget}</p>
                </div>
              )}
              {inquiry.timeline && (
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Timeline</p>
                  <p className="text-sm font-bold text-slate-700">{inquiry.timeline}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Portfolio Build Source (if exists) */}
        {inquiry.sourcePortfolioBuild && (
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Lead Source Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Lead Source</p>
                <p className="text-sm font-bold text-indigo-700">Portfolio Build</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Selected Build</p>
                <p className="text-sm font-bold text-purple-700">{inquiry.sourcePortfolioBuild}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Plan Source (if exists) */}
        {inquiry.inquirySource === 'pricing' && (
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Lead Source Details</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Lead Source</p>
                <p className="text-sm font-bold text-indigo-700">Pricing Card / Package</p>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Selected Package</p>
                <p className="text-sm font-bold text-purple-700">{inquiry.pricingPlan || 'Custom Consultation'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Inquiry Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Message</h4>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-tighter">
              {inquiry.serviceOfInterest || inquiry.subject}
            </span>
          </div>
          <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 text-sm text-slate-600 leading-relaxed italic relative">
            <MessageSquare className="absolute top-[-8px] left-4 w-4 h-4 text-slate-200 fill-slate-50" />
            "{inquiry.message}"
          </div>
        </div>

        {/* Notes System */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Internal Collaboration</h4>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={notifyClient}
                onChange={(e) => setNotifyClient(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all"
              />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Notify Client</span>
            </label>
          </div>
          <form onSubmit={handleSubmitNote} className="relative group">
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a private note..."
              className="w-full p-4 pr-12 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[100px] resize-none shadow-sm"
            />
            <button 
              type="submit"
              disabled={!note.trim()}
              className="absolute bottom-4 right-4 p-2 bg-indigo-600 text-white rounded-lg opacity-0 group-focus-within:opacity-100 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-3">
            {inquiry.internalNotes?.slice().reverse().map((n, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {n.addedBy?.firstName?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-700">{n.addedBy?.firstName || 'Admin'}</span>
                      {n.notifiedClient && (
                        <span className="ml-2 text-[8px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">Client Notified</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{dayjs(n.createdAt).format('MMM D, h:mm A')}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Operational Timeline</h4>
          <div className="space-y-6 pl-2">
            {[...(inquiry.activities || [])].reverse().map((activity, idx) => (
              <div key={idx} className="relative flex gap-4">
                {idx !== (inquiry.activities?.length || 0) - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-[-24px] w-px bg-slate-100" />
                )}
                <div className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center z-10 flex-shrink-0",
                  activity.type === 'proposal_sent' ? "bg-pink-50 border-pink-100" : "bg-slate-50 border-slate-100"
                )}>
                  {activity.type === 'status_change' ? (
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  ) : activity.type === 'note_added' ? (
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  ) : activity.type === 'proposal_sent' ? (
                    <Send className="w-3.5 h-3.5 text-pink-500" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-bold text-slate-900">{activity.description}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {dayjs(activity.timestamp).format('MMM D, h:mm A')} • {activity.performer?.firstName || 'System'}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="relative flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center z-10 flex-shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="pt-0.5">
                <p className="text-sm font-bold text-slate-900">Inquiry Captured</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {dayjs(inquiry.createdAt).format('MMM D, h:mm A')} • Website System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default LeadDrawer;
