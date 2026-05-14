import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  ChevronRight,
  ExternalLink,
  Download,
  Plus,
  Video,
  ArrowUpDown,
  Mail,
  Building2
} from 'lucide-react';
import apiClient from '../services/apiClient';
import { cn } from '../utils/utils';
import BookingDrawer from '../modules/bookings/components/BookingDrawer';
import Drawer from '../components/Drawer';
import dayjs from 'dayjs';
import { useSocket } from '../hooks/useSocket';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  confirmed: { label: 'Confirmed', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  in_progress: { label: 'In Progress', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  cancelled: { label: 'Cancelled', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  no_show: { label: 'No Show', color: 'bg-slate-50 text-slate-600 border-slate-100' },
};

const BookingsWorkspace = () => {
  // useSocket(); // Now handled globally in AdminLayout
  const queryClient = useQueryClient();
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Manual Booking Form State
  const [manualFormData, setManualFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: '10:00',
    serviceType: 'Enterprise Strategy Session',
    notes: ''
  });

  // Queries
  const { data: result, isLoading } = useQuery({
    queryKey: ['admin-bookings', searchTerm, statusFilter],
    queryFn: () => apiClient.get('/admin/bookings', { 
      params: { 
        search: searchTerm,
        status: statusFilter === 'all' ? undefined : statusFilter
      } 
    }),
  });

  const { data: selectedBooking } = useQuery({
    queryKey: ['admin-booking', selectedBookingId],
    queryFn: () => apiClient.get(`/admin/bookings/${selectedBookingId}`),
    enabled: !!selectedBookingId,
  });

  // Mutations
  const manualBookingMutation = useMutation({
    mutationFn: (data) => apiClient.post('/admin/bookings/manual', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-bookings']);
      setIsManualModalOpen(false);
      setManualFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        date: dayjs().format('YYYY-MM-DD'),
        time: '10:00',
        serviceType: 'Enterprise Strategy Session',
        notes: ''
      });
    }
  });

  const confirmBookingMutation = useMutation({
    mutationFn: (id) => apiClient.patch(`/admin/bookings/${id}/confirm`),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-bookings']);
      queryClient.invalidateQueries(['admin-booking', selectedBookingId]);
    }
  });

  const cancelBookingMutation = useMutation({
    mutationFn: ({ id, reason }) => apiClient.patch(`/admin/bookings/${id}/cancel`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-bookings']);
      queryClient.invalidateQueries(['admin-booking', selectedBookingId]);
    }
  });

  const addNoteMutation = useMutation({
    mutationFn: ({ id, content }) => apiClient.post(`/admin/bookings/${id}/notes`, { content }),
    onSuccess: () => queryClient.invalidateQueries(['admin-booking', selectedBookingId]),
  });

  const bookings = result?.results || (Array.isArray(result?.data) ? result.data : result?.data?.results) || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Booking Management</h1>
          <p className="text-slate-500 font-medium">Manage client consultations and strategy sessions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            Manual Booking
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search by client, ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            {['all', 'pending', 'confirmed', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all",
                  statusFilter === f ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client & ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meeting Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Channel</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 animate-pulse">
                    Loading operational data...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Calendar className="w-8 h-8 text-slate-200" />
                      <p className="text-slate-500 font-medium">No bookings found for the selected criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr 
                    key={booking._id}
                    onClick={() => setSelectedBookingId(booking._id)}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                          {booking.clientName?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{booking.clientName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                            {booking.bookingId} • {booking.company || 'Private'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {dayjs(booking.startTime).format('MMM D, YYYY')}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500 mt-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {dayjs(booking.startTime).format('h:mm A')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider",
                        statusConfig[booking.status]?.color
                      )}>
                        {statusConfig[booking.status]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {booking.meetLink ? (
                        <a 
                          href={booking.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-end gap-2 text-xs font-bold text-indigo-600 hover:underline transition-all"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Google Meet
                        </a>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pending Link</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 rounded-lg transition-all">
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {bookings.length} of {result?.totalResults || 0} records
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-400 cursor-not-allowed">
            Previous
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Next
          </button>
        </div>
      </div>

      {/* Manual Booking Drawer */}
      <Drawer
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        title="Manual Booking Creation"
      >
        <div className="space-y-6 pb-10">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Client Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Client Name</label>
                <input 
                  type="text"
                  value={manualFormData.clientName}
                  onChange={(e) => setManualFormData({...manualFormData, clientName: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
                <input 
                  type="email"
                  value={manualFormData.clientEmail}
                  onChange={(e) => setManualFormData({...manualFormData, clientEmail: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone (Optional)</label>
                <input 
                  type="text"
                  value={manualFormData.clientPhone}
                  onChange={(e) => setManualFormData({...manualFormData, clientPhone: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Schedule Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Date</label>
                <input 
                  type="date"
                  value={manualFormData.date}
                  onChange={(e) => setManualFormData({...manualFormData, date: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Time</label>
                <input 
                  type="time"
                  value={manualFormData.time}
                  onChange={(e) => setManualFormData({...manualFormData, time: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Internal Notes</label>
            <textarea 
              value={manualFormData.notes}
              onChange={(e) => setManualFormData({...manualFormData, notes: e.target.value})}
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all min-h-[120px]"
              placeholder="Add internal details about this manual booking..."
            />
          </div>

          <button 
            onClick={() => manualBookingMutation.mutate(manualFormData)}
            disabled={manualBookingMutation.isPending || !manualFormData.clientName || !manualFormData.clientEmail}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {manualBookingMutation.isPending ? 'Processing...' : (
              <>
                <Plus className="w-5 h-5" />
                Create Booking & Notify Client
              </>
            )}
          </button>
        </div>
      </Drawer>

      <BookingDrawer
        booking={selectedBooking}
        isOpen={!!selectedBookingId}
        onClose={() => setSelectedBookingId(null)}
        onConfirm={(id) => confirmBookingMutation.mutate(id)}
        onCancel={(id, reason) => cancelBookingMutation.mutate({ id, reason })}
        onAddNote={(id, content) => addNoteMutation.mutate({ id, content })}
      />
    </div>
  );
};

export default BookingsWorkspace;
 
