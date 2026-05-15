import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/v1', '') 
    : "http://localhost:7000/api";

const EnquiryOverlay = ({ isOpen, onClose }) => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [availability, setAvailability] = useState([]);
    const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: new Date().toISOString().split('T')[0],
        selectedTime: '',
        projectSummary: ''
    });

    // Reset status and step when overlay opens
    useEffect(() => {
        if (isOpen) {
            setFormStatus('idle');
            setStep(1);
            setError('');
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                date: new Date().toISOString().split('T')[0],
                selectedTime: '',
                projectSummary: ''
            });
            setAvailability([]);
        }
    }, [isOpen]);

    // Fetch availability when date changes
    useEffect(() => {
        if (formData.date) {
            fetchAvailability(formData.date);
        }
    }, [formData.date]);

    const fetchAvailability = async (date) => {
        setIsLoadingAvailability(true);
        try {
            const response = await fetch(`${API_BASE_URL}/availability?date=${date}`);
            const data = await response.json();
            if (response.ok) {
                setAvailability(data);
            } else {
                setError(data.message || 'Failed to load availability');
            }
        } catch (err) {
            setError('Could not connect to the server');
        } finally {
            setIsLoadingAvailability(false);
        }
    };

    const handleNextStep = (e) => {
        if (e) e.preventDefault();
        setStep(2);
    };

    const handlePrevStep = () => {
        setStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.selectedTime) {
            setError('Please select a time slot');
            return;
        }

        setFormStatus('submitting');
        setError('');

        // Format phone number: remove spaces and ensure it starts with +
        let formattedPhone = formData.phone.trim().replace(/\s+/g, '');
        if (formattedPhone && !formattedPhone.startsWith('+')) {
            formattedPhone = '+' + formattedPhone;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formattedPhone,
                    service: formData.service,
                    date: formData.date,
                    time: formData.selectedTime,
                    message: formData.projectSummary
                })
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus('success');
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                setFormStatus('idle');
                setError(data.message || 'Booking failed. Please try again.');
            }
        } catch (err) {
            setFormStatus('idle');
            setError('Connection error. Please check if the server is running.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-['Inter',sans-serif]">
                    {/* High-End Tech Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/20 backdrop-blur-[4px] transition-all duration-500"
                    />

                    {/* Ambient Light Animation (Behind Card) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        <div className="absolute w-[800px] h-[800px] bg-[#6C4CF4]/15 blur-[140px] rounded-full top-[-200px] left-[-200px] animate-slowFloat" />
                        <div className="absolute w-[700px] h-[700px] bg-blue-400/15 blur-[160px] rounded-full bottom-[-200px] right-[-200px] animate-slowFloat2" />
                    </div>

                    {/* Glass System Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-[1050px] bg-white rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:min-h-[650px] transition-all duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Top System Bar */}
                        <div className="absolute top-0 left-0 w-full h-[48px] flex items-center justify-between px-8 border-b border-black/5 bg-white/40 z-20 pointer-events-none">
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] shadow-sm"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] shadow-sm"></div>
                            </div>
                            <div className="text-[10px] font-bold tracking-[0.2em] text-black/40">BOOKING PORTAL v2.0</div>
                        </div>

                        {/* Main Grid Content */}
                        <div className="flex flex-col md:flex-row w-full mt-[48px]">

                            {/* LEFT SIDE (Brand Voice) */}
                            <div className="w-full md:w-[40%] p-8 md:p-14 flex flex-col justify-between relative bg-[#F8F9FF]">
                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <span className="inline-block px-3 py-1 rounded-full bg-[#6C4CF4]/10 text-[#6C4CF4] text-[10px] font-bold tracking-wider uppercase mb-4">
                                            Strategy Session
                                        </span>
                                        <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-5 leading-tight tracking-tight font-['Montserrat',sans-serif]">
                                            Book a Free<br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C4CF4] to-[#3937F3]">Strategy Call</span>
                                        </h2>
                                        <p className="text-[#5F6368] text-sm md:text-base leading-relaxed mb-8">
                                            Get a 15–30 minute consultation with our team. 
                                            We'll analyze your needs and outline clear next steps.
                                        </p>
                                    </div>

                                    {/* Progress Indicator */}
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= 1 ? 'bg-[#6C4CF4] text-white shadow-[0_4px_12px_rgba(108,76,244,0.3)]' : 'bg-white border border-[#e5e7ff] text-[#8A8D96]'}`}>
                                                {step > 1 ? '✓' : '1'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`text-[11px] font-bold uppercase tracking-wider ${step >= 1 ? 'text-[#1a1a1a]' : 'text-[#8A8D96]'}`}>Step 1</span>
                                                <span className="text-xs text-[#5F6368]">Your Details</span>
                                            </div>
                                        </div>
                                        <div className="w-px h-6 bg-[#e5e7ff] ml-4"></div>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= 2 ? 'bg-[#6C4CF4] text-white shadow-[0_4px_12px_rgba(108,76,244,0.3)]' : 'bg-white border border-[#e5e7ff] text-[#8A8D96]'}`}>
                                                2
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`text-[11px] font-bold uppercase tracking-wider ${step >= 2 ? 'text-[#1a1a1a]' : 'text-[#8A8D96]'}`}>Step 2</span>
                                                <span className="text-xs text-[#5F6368]">Schedule & Project</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 pt-10 mt-auto hidden md:block">
                                    <div className="p-4 rounded-2xl bg-white/60 border border-white shadow-sm backdrop-blur-sm">
                                        <p className="text-[11px] text-[#5F6368] italic">
                                            "They helped us automate our entire workflow in weeks. Highly recommend the strategy session."
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-blue-100"></div>
                                            <span className="text-[10px] font-bold text-[#1a1a1a]">CTO @ TechFlow</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Subtle sheen decoration */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none opacity-50"></div>
                            </div>

                            {/* RIGHT SIDE (Form) */}
                            <div className="w-full md:w-[60%] p-8 md:p-14 bg-white flex flex-col relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {formStatus === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center flex-1 text-center py-10"
                                        >
                                            <div className="w-20 h-20 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-6">
                                                <svg className="w-10 h-10 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">Booking Confirmed!</h3>
                                            <p className="text-[#5F6368] mb-8">Meeting link sent to WhatsApp & Email. Check your inbox for details.</p>
                                            <button 
                                                onClick={onClose}
                                                className="px-8 py-3 bg-[#1a1a1a] text-white rounded-xl font-bold hover:bg-black transition-colors"
                                            >
                                                Done
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form 
                                            key={step} 
                                            onSubmit={step === 1 ? handleNextStep : handleSubmit}
                                            className="flex flex-col gap-6 flex-1 justify-start overflow-y-auto pr-2 custom-scrollbar"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex flex-col gap-6"
                                            >
                                                {step === 1 ? (
                                                    <>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <div className="space-y-1.5 group">
                                                                <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider ml-1 group-focus-within:text-[#6C4CF4] transition-colors">Full Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    required
                                                                    value={formData.name}
                                                                    onChange={handleInputChange}
                                                                    className="w-full bg-white border border-[#e5e7ff] rounded-xl px-4 py-3.5 text-[#1a1a1a] text-sm font-medium outline-none transition-all duration-300 placeholder:text-black/20 hover:border-[#6C4CF4] hover:shadow-[0_0_0_4px_rgba(108,76,244,0.06)] focus:border-[#6C4CF4] focus:shadow-[0_0_0_4px_rgba(108,76,244,0.12)]"
                                                                    placeholder="John Doe"
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5 group">
                                                                <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider ml-1 group-focus-within:text-[#6C4CF4] transition-colors">Work Email</label>
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    required
                                                                    value={formData.email}
                                                                    onChange={handleInputChange}
                                                                    className="w-full bg-white border border-[#e5e7ff] rounded-xl px-4 py-3.5 text-[#1a1a1a] text-sm font-medium outline-none transition-all duration-300 placeholder:text-black/20 hover:border-[#6C4CF4] hover:shadow-[0_0_0_4px_rgba(108,76,244,0.06)] focus:border-[#6C4CF4] focus:shadow-[0_0_0_4px_rgba(108,76,244,0.12)]"
                                                                    placeholder="john@company.com"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <div className="space-y-1.5 group">
                                                                <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider ml-1 group-focus-within:text-[#6C4CF4] transition-colors">Phone (Optional)</label>
                                                                <input
                                                                    type="tel"
                                                                    name="phone"
                                                                    value={formData.phone}
                                                                    onChange={handleInputChange}
                                                                    className="w-full bg-white border border-[#e5e7ff] rounded-xl px-4 py-3.5 text-[#1a1a1a] text-sm font-medium outline-none transition-all duration-300 placeholder:text-black/20 hover:border-[#6C4CF4] hover:shadow-[0_0_0_4px_rgba(108,76,244,0.06)] focus:border-[#6C4CF4] focus:shadow-[0_0_0_4px_rgba(108,76,244,0.12)]"
                                                                    placeholder="+919876543210"
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5 group">
                                                                <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider ml-1 group-focus-within:text-[#6C4CF4] transition-colors">Select Service</label>
                                                                <select
                                                                    required
                                                                    name="service"
                                                                    value={formData.service}
                                                                    onChange={handleInputChange}
                                                                    className="w-full bg-white border border-[#e5e7ff] rounded-xl px-4 py-3.5 text-[#1a1a1a] text-sm font-medium outline-none transition-all duration-300 hover:border-[#6C4CF4] hover:shadow-[0_0_0_4px_rgba(108,76,244,0.06)] focus:border-[#6C4CF4] focus:shadow-[0_0_0_4px_rgba(108,76,244,0.12)] appearance-none"
                                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238A8D96'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.2rem center', backgroundSize: '1.2rem' }}
                                                                >
                                                                    <option value="" disabled>Choose a service</option>
                                                                    <option value="ai-automation">AI Automation</option>
                                                                    <option value="web-development">Web Development</option>
                                                                    <option value="mobile-app">Mobile App</option>
                                                                    <option value="custom-software">Custom Software</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="space-y-4">
                                                            <div className="space-y-1.5 group">
                                                                <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider ml-1 group-focus-within:text-[#6C4CF4] transition-colors">Preferred Date</label>
                                                                <input
                                                                    type="date"
                                                                    name="date"
                                                                    required
                                                                    value={formData.date}
                                                                    min={new Date().toISOString().split('T')[0]}
                                                                    onChange={handleInputChange}
                                                                    className="w-full bg-white border border-[#e5e7ff] rounded-xl px-4 py-3.5 text-[#1a1a1a] text-sm font-medium outline-none transition-all duration-300 hover:border-[#6C4CF4] hover:shadow-[0_0_0_4px_rgba(108,76,244,0.06)] focus:border-[#6C4CF4] focus:shadow-[0_0_0_4px_rgba(108,76,244,0.12)]"
                                                                />
                                                            </div>

                                                            {formData.date && (
                                                                <div className="space-y-2.5">
                                                                    <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider ml-1">Select Time Slot</label>
                                                                    {isLoadingAvailability ? (
                                                                        <div className="flex items-center gap-2 py-2 px-4 bg-gray-50 rounded-xl animate-pulse">
                                                                            <div className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"></div>
                                                                            <span className="text-xs text-gray-400 font-medium">Checking availability...</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                                                            {availability.map((slot) => (
                                                                                <button
                                                                                    key={slot.time}
                                                                                    type="button"
                                                                                    disabled={!slot.isAvailable}
                                                                                    onClick={() => setFormData(prev => ({ ...prev, selectedTime: slot.time }))}
                                                                                    className={`
                                                                                        py-2 px-3 rounded-lg text-xs font-bold transition-all duration-200
                                                                                        ${!slot.isAvailable 
                                                                                            ? 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100' 
                                                                                            : formData.selectedTime === slot.time
                                                                                                ? 'bg-[#6C4CF4] text-white shadow-[0_4px_12px_rgba(108,76,244,0.3)] border border-[#6C4CF4]'
                                                                                                : 'bg-white text-[#5F6368] border border-[#e5e7ff] hover:border-[#6C4CF4] hover:text-[#6C4CF4]'
                                                                                        }
                                                                                    `}
                                                                                >
                                                                                    {slot.time}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="space-y-1.5 group">
                                                            <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider ml-1 group-focus-within:text-[#6C4CF4] transition-colors">Project Summary (Optional)</label>
                                                            <textarea
                                                                name="projectSummary"
                                                                value={formData.projectSummary}
                                                                onChange={handleInputChange}
                                                                className="w-full min-h-[120px] bg-[#FAFBFF] border border-[#e5e7ff] rounded-2xl px-5 py-4 text-[#1a1a1a] text-sm font-medium outline-none transition-all duration-300 placeholder:text-black/20 resize-none leading-relaxed hover:border-[#6C4CF4] hover:shadow-[0_0_0_4px_rgba(108,76,244,0.06)] focus:border-[#6C4CF4] focus:shadow-[0_0_0_4px_rgba(108,76,244,0.12)]"
                                                                placeholder="Tell us a bit about your goals, timeline, and tech stack..."
                                                            ></textarea>
                                                        </div>
                                                    </>
                                                )}

                                                {error && (
                                                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold flex items-center gap-2">
                                                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {error}
                                                    </div>
                                                )}
                                            </motion.div>

                                            <div className="pt-6 flex flex-col items-center md:items-end gap-4 mt-auto">
                                                <div className="flex items-center gap-4 w-full md:w-auto">
                                                    {step === 2 && (
                                                        <button
                                                            type="button"
                                                            onClick={handlePrevStep}
                                                            className="px-6 py-4 rounded-xl border border-[#e5e7ff] font-bold text-[#5F6368] hover:bg-gray-50 transition-all active:scale-95"
                                                        >
                                                            Back
                                                        </button>
                                                    )}
                                                    
                                                    <button
                                                        type="submit"
                                                        disabled={formStatus === 'submitting'}
                                                        className={`
                                                        relative flex-1 md:flex-none overflow-hidden rounded-xl px-12 py-4 font-bold transition-all duration-300 ease-out
                                                        ${formStatus === 'submitting'
                                                                ? 'bg-[#6C4CF4]/80 text-white cursor-not-allowed'
                                                                : 'bg-gradient-to-r from-[#6C4CF4] to-[#3937F3] text-white shadow-[0_10px_25px_rgba(108,76,244,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(108,76,244,0.35)] active:scale-95'
                                                            }
                                                        
                                                        /* Energy Charge Light Sweep */
                                                        before:absolute before:inset-0 
                                                        before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
                                                        before:-translate-x-full hover:before:translate-x-full 
                                                        before:transition-transform before:duration-700
                                                    `}
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                                            {step === 1 ? (
                                                                <>
                                                                    Next Step
                                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                                    </svg>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {formStatus === 'submitting' ? (
                                                                        <>
                                                                            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                                                            Securing Slot...
                                                                        </>
                                                                    ) : (
                                                                        'Book My Free Call'
                                                                    )}
                                                                </>
                                                            )}
                                                        </span>
                                                    </button>
                                                </div>
                                                
                                                {step === 1 && (
                                                    <p className="text-[11px] text-[#8A8D96] font-medium">
                                                        No commitment. Free consultation.
                                                    </p>
                                                )}
                                            </div>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EnquiryOverlay;
