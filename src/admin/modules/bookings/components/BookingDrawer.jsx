import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Video, 
  Shield, 
  CreditCard,
  MessageSquare,
  History,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Drawer from '../../../components/Drawer';
import { cn } from '../../../utils/utils';
import dayjs from 'dayjs';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  confirmed: { label: 'Confirmed', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  in_progress: { label: 'In Progress', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  cancelled: { label: 'Cancelled', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  no_show: { label: 'No Show', color: 'bg-slate-50 text-slate-600 border-slate-100' },
};

const BookingDrawer = ({ booking, isOpen, onClose, onConfirm, onCancel, onAddNote }) => {
  const [note, setNote] = useState('');

  if (!booking) return null;

  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onAddNote(booking._id, note);
    setNote('');
  };

  const activityList = [
    ...(booking.activityTimeline || []),
    ...(booking.activityLogs || []).map(log => ({
      type: 'log',
      message: log.action,
      timestamp: log.timestamp,
      actor: log.performer?.firstName || 'System'
    }))
  ].sort((a, b) => dayjs(b.timestamp).diff(dayjs(a.timestamp)));

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Booking Detail"
      width="w-[650px]"
    >
      <div className="space-y-8 pb-10">
        {/* Header Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider",
              statusConfig[booking.status]?.color
            )}>
              {statusConfig[booking.status]?.label}
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              ID: {booking.bookingId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Client Profile Card */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 text-2xl font-bold border border-slate-100">
              {booking.clientName?.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">{booking.clientName}</h3>
              <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
                <Building2 className="w-3.5 h-3.5" />
                {booking.company || 'Private Individual'}
              </p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {booking.clientEmail}
                </div>
                {booking.clientPhone && (
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {booking.clientPhone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Logic Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Date & Time</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{dayjs(booking.startTime).format('dddd, MMMM D')}</p>
            <p className="text-xs font-medium text-slate-500 mt-1">
              {dayjs(booking.startTime).format('h:mm A')} - {dayjs(booking.endTime).format('h:mm A')}
              <span className="ml-2 text-slate-400">({booking.timezone})</span>
            </p>
          </div>
          <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-slate-400 mb-3">
              <Video className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Meeting Channel</span>
            </div>
            {booking.meetLink ? (
              <a 
                href={booking.meetLink} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1.5"
              >
                Google Meet <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <p className="text-sm font-bold text-slate-900">Link pending...</p>
            )}
            <p className={cn(
              "text-[10px] font-bold mt-1 uppercase tracking-tighter",
              booking.notifications?.calendarSynced ? "text-emerald-500" : "text-slate-400"
            )}>
              {booking.notifications?.calendarSynced ? "✓ Calendar Synced" : "○ Sync Pending"}
            </p>
          </div>
        </div>

        {/* Operational Flow Buttons */}
        <div className="flex gap-3">
          {booking.status === 'pending' && (
            <button 
              onClick={() => onConfirm(booking._id)}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Booking
            </button>
          )}
          {booking.status !== 'cancelled' && (
            <button 
              onClick={() => {
                const reason = window.prompt('Cancellation Reason (Optional):');
                if (reason !== null) onCancel(booking._id, reason);
              }}
              className={cn(
                "py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all flex items-center justify-center gap-2",
                booking.status === 'pending' ? "px-6" : "flex-1"
              )}
            >
              <XCircle className="w-4 h-4" />
              Cancel Booking
            </button>
          )}
          {booking.status === 'cancelled' && (
            <div className="flex-1 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
              <p className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Booking Cancelled
              </p>
              {booking.cancelledReason && (
                <p className="text-sm text-rose-500 mt-1">Reason: {booking.cancelledReason}</p>
              )}
            </div>
          )}
        </div>

        {/* Integration Status Cards */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Automation & Logs</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className={cn(
              "p-3 border rounded-xl flex items-center gap-3 transition-colors",
              booking.notifications?.whatsappSent ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50 border-slate-100 opacity-60"
            )}>
              <CheckCircle2 className={cn("w-4 h-4", booking.notifications?.whatsappSent ? "text-emerald-500" : "text-slate-300")} />
              <div>
                <p className={cn("text-[10px] font-bold uppercase", booking.notifications?.whatsappSent ? "text-emerald-700" : "text-slate-500")}>WhatsApp</p>
                <p className={cn("text-[9px]", booking.notifications?.whatsappSent ? "text-emerald-600" : "text-slate-400")}>
                  {booking.notifications?.whatsappSent ? "Delivered" : "Not Sent"}
                </p>
              </div>
            </div>
            <div className={cn(
              "p-3 border rounded-xl flex items-center gap-3 transition-colors",
              booking.notifications?.emailSent ? "bg-blue-50/50 border-blue-100" : "bg-slate-50 border-slate-100 opacity-60"
            )}>
              <Mail className={cn("w-4 h-4", booking.notifications?.emailSent ? "text-blue-500" : "text-slate-300")} />
              <div>
                <p className={cn("text-[10px] font-bold uppercase", booking.notifications?.emailSent ? "text-blue-700" : "text-slate-500")}>Email Sent</p>
                <p className={cn("text-[9px]", booking.notifications?.emailSent ? "text-blue-600" : "text-slate-400")}>
                  {booking.notifications?.emailSent ? "Delivered" : "Not Sent"}
                </p>
              </div>
            </div>
            <div className={cn(
              "p-3 border rounded-xl flex items-center gap-3 transition-colors",
              booking.notifications?.reminderScheduled ? "bg-amber-50/50 border-amber-100" : "bg-slate-50 border-slate-100 opacity-60"
            )}>
              <Clock className={cn("w-4 h-4", booking.notifications?.reminderScheduled ? "text-amber-500" : "text-slate-300")} />
              <div>
                <p className={cn("text-[10px] font-bold uppercase", booking.notifications?.reminderScheduled ? "text-amber-700" : "text-slate-500")}>Reminder</p>
                <p className={cn("text-[9px]", booking.notifications?.reminderScheduled ? "text-amber-600" : "text-slate-400")}>
                  {booking.notifications?.reminderScheduled ? "Scheduled" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Internal Notes */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Internal Collaboration</h4>
          <form onSubmit={handleSubmitNote} className="relative group">
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add an internal note about this client..."
              className="w-full p-4 pr-12 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[100px] resize-none"
            />
            <button 
              type="submit"
              disabled={!note.trim()}
              className="absolute bottom-4 right-4 p-2 bg-indigo-600 text-white rounded-lg transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-3">
            {booking.internalNotes?.slice().reverse().map((n, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      {n.addedBy?.firstName?.charAt(0) || 'A'}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{n.addedBy?.firstName || 'Admin'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{dayjs(n.createdAt).format('MMM D, h:mm A')}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity History */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Meeting Timeline</h4>
          <div className="space-y-6 pl-2">
            {activityList.map((activity, idx) => (
              <div key={idx} className="relative flex gap-4">
                {idx !== activityList.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-[-24px] w-px bg-slate-100" />
                )}
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center z-10 flex-shrink-0">
                  <History className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-bold text-slate-900">{activity.message}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {dayjs(activity.timestamp).format('MMM D, h:mm A')} • {activity.actor}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Initial Creation if no timeline */}
            {activityList.length === 0 && (
              <div className="relative flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center z-10 flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-bold text-slate-900">Booking Created</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {dayjs(booking.createdAt).format('MMM D, h:mm A')} • Client Self-Booked
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default BookingDrawer;
