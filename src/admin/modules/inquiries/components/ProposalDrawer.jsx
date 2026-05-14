import React, { useState } from 'react';
import { Send, Clock, DollarSign, ExternalLink, FileText } from 'lucide-react';
import Drawer from '../../../components/Drawer';

const ProposalDrawer = ({ isOpen, onClose, onSubmit, inquiry, isLoading }) => {
  const [formData, setFormData] = useState({
    subject: `Enterprise AI Proposal | ${inquiry?.company || 'Project'}`,
    message: `Hi ${inquiry?.fullName || 'there'},\n\nFollowing our initial assessment, we have prepared a comprehensive strategy for your AI transformation journey. Our solution focuses on accelerating ROI through agentic intelligence.`,
    pricing: '$25,000 - $50,000',
    timeline: '8-12 Weeks',
    ctaLink: 'https://cognivexa.ai/proposals/view'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Send Professional Proposal"
      width="w-[550px]"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pb-10">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6">
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Target Recipient</p>
          <p className="text-sm font-bold text-slate-900">{inquiry?.fullName} • {inquiry?.email}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Subject</label>
            <input 
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Proposal Message</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[150px] resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> Pricing Summary
              </label>
              <input 
                type="text"
                value={formData.pricing}
                onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="e.g. $10k - $15k"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Estimated Timeline
              </label>
              <input 
                type="text"
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="e.g. 4-6 Weeks"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 flex items-center gap-1">
              <ExternalLink className="w-3 h-3" /> Proposal/CTA Link
            </label>
            <input 
              type="url"
              value={formData.ctaLink}
              onChange={(e) => setFormData({...formData, ctaLink: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" /> Sending...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Proposal to Client
              </>
            )}
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
            Client will receive a professional branded email
          </p>
        </div>
      </form>
    </Drawer>
  );
};

export default ProposalDrawer;
