import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, User, 
  CheckCircle2, ChevronRight, ChevronLeft,
  Sparkles, ShieldCheck, Mail, Building
} from 'lucide-react';
import dayjs from 'dayjs';
import apiClient from '../admin/services/apiClient';
import { cn } from '../admin/utils/utils';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(dayjs().add(1, 'day').format('YYYY-MM-DD'));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    company: '',
    serviceType: 'AI Strategy Session'
  });

  const { data: availability, isLoading: isAvailLoading } = useQuery({
    queryKey: ['availability', date],
    queryFn: () => apiClient.get(`/public/bookings/availability?date=${date}`),
    enabled: !!date
  });

  const bookingMutation = useMutation({
    mutationFn: (data) => apiClient.post('/public/bookings', data),
    onSuccess: () => setStep(4),
  });

  const handleBooking = () => {
    if (!selectedSlot) return;
    bookingMutation.mutate({
      ...formData,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all",
                step >= i ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "bg-slate-100 text-slate-400"
              )}>
                {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
              </div>
              {i < 3 && (
                <div className={cn("flex-1 h-1 mx-4 rounded-full transition-all", step > i ? "bg-indigo-600" : "bg-slate-100")} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-3xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-72 bg-slate-50 p-10 border-r border-slate-100 flex flex-col">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-8">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4 tracking-tight">Strategy Architecture</h2>
            <p className="text-slate-500 text-sm font-medium mb-8">Initialize your enterprise AI journey with our core engineering team.</p>
            
            <div className="mt-auto space-y-4">
              <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> 256-bit encrypted
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="flex-1 p-10 md:p-16 relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">Temporal Alignment</h3>
                    <p className="text-slate-500 font-medium mt-2">Select a window in our operational timeline.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Date</label>
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {isAvailLoading ? (
                        [1,2,3,4,5,6].map(i => <div key={i} className="h-14 bg-slate-50 rounded-xl animate-pulse" />)
                      ) : availability?.slots.map((slot, i) => (
                        <button
                          key={i}
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot)}
                          className={cn(
                            "px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            !slot.available ? "opacity-30 cursor-not-allowed bg-slate-50 text-slate-400" :
                            selectedSlot?.time === slot.time ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" :
                            "bg-white border border-slate-100 text-slate-900 hover:border-indigo-600"
                          )}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 flex justify-end">
                    <button 
                      disabled={!selectedSlot}
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-10 py-5 bg-slate-900 text-white rounded-full text-xs font-black tracking-widest uppercase hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-xl"
                    >
                      Initialize Identity <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">Identity Protocol</h3>
                    <p className="text-slate-500 font-medium mt-2">Associate your organization with this session.</p>
                  </div>

                  <div className="grid gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                       <input 
                         value={formData.clientName}
                         onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                         placeholder="e.g. Alexander Vance"
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Email</label>
                       <input 
                         type="email"
                         value={formData.clientEmail}
                         onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                         placeholder="vance@aerospace.tech"
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization</label>
                       <input 
                         value={formData.company}
                         onChange={(e) => setFormData({...formData, company: e.target.value})}
                         placeholder="Cognivexa Global"
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none"
                       />
                    </div>
                  </div>

                  <div className="pt-10 flex justify-between">
                    <button onClick={() => setStep(1)} className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-slate-900 transition-colors">
                      <ChevronLeft className="w-4 h-4" /> Timeline
                    </button>
                    <button 
                      onClick={() => setStep(3)}
                      disabled={!formData.clientName || !formData.clientEmail}
                      className="flex items-center gap-2 px-10 py-5 bg-slate-900 text-white rounded-full text-xs font-black tracking-widest uppercase hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-xl"
                    >
                      Final Validation <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">Protocol Summary</h3>
                    <p className="text-slate-500 font-medium mt-2">Validate session parameters before deployment.</p>
                  </div>

                  <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Temporal Window</span>
                      <span className="text-sm font-bold text-slate-900">{dayjs(selectedSlot?.startTime).format('MMMM DD, HH:mm')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lead Identity</span>
                      <span className="text-sm font-bold text-slate-900">{formData.clientName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact Node</span>
                      <span className="text-sm font-bold text-slate-900">{formData.clientEmail}</span>
                    </div>
                  </div>

                  <div className="pt-10 flex justify-between">
                    <button onClick={() => setStep(2)} className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 hover:text-slate-900 transition-colors">
                      <ChevronLeft className="w-4 h-4" /> Identity
                    </button>
                    <button 
                      onClick={handleBooking}
                      disabled={bookingMutation.isPending}
                      className="flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white rounded-full text-xs font-black tracking-widest uppercase hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-xl shadow-indigo-100"
                    >
                      {bookingMutation.isPending ? 'DEPLOYING...' : 'CONFIRM BOOKING'}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center space-y-8 py-20">
                  <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-100">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">Session Confirmed</h3>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto">Protocol initialized. Calendar invites and meeting credentials have been dispatched to your node.</p>
                  </div>
                  <Link to="/" className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] hover:underline">Return to Core</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
