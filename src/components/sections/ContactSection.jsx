import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Twitter, Github, CheckCircle2 } from 'lucide-react';
import { getPortfolioTemplate } from '../../constants/portfolioInquiryTemplates';
import { getPricingTemplate } from '../../constants/pricingInquiryTemplates';
import '../../styles/ContactPremium.css';

const ContactSection = () => {
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        serviceOfInterest: '',
        budget: '',
        timeline: '',
        message: '',
        sourcePortfolioBuild: '',
        inquirySource: '',
        pricingPlan: '',
        pricingKey: ''
    });

    // Intersection Observer for animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        const currentLeft = leftColRef.current;
        const currentRight = rightColRef.current;

        if (currentLeft) observer.observe(currentLeft);
        if (currentRight) observer.observe(currentRight);

        return () => {
            if (currentLeft) observer.unobserve(currentLeft);
            if (currentRight) observer.unobserve(currentRight);
        };
    }, []);

    // Hydrate form values dynamically from navigation state (portfolio or pricing CTA click)
    useEffect(() => {
        // 1. Pricing hydration (Priority 1)
        if (location.state?.inquirySource === 'pricing' && location.state?.pricingKey && !formData.pricingKey) {
            const template = getPricingTemplate(location.state.pricingKey);
            setFormData(prev => ({
                ...prev,
                serviceOfInterest: template.service,
                budget: template.budget,
                timeline: template.timeline,
                message: template.message,
                inquirySource: 'pricing',
                pricingPlan: location.state.pricingPlan,
                pricingKey: location.state.pricingKey
            }));
        }
        // 2. Portfolio hydration (Priority 2)
        else if (location.state?.sourcePortfolioBuild && !formData.sourcePortfolioBuild) {
            if (location.state.inquiryAutofill) {
                const autofill = location.state.inquiryAutofill;
                setFormData(prev => ({
                    ...prev,
                    serviceOfInterest: autofill.service || prev.serviceOfInterest,
                    budget: autofill.budget || prev.budget,
                    timeline: autofill.timeline || prev.timeline,
                    message: autofill.message || prev.message,
                    sourcePortfolioBuild: location.state.sourcePortfolioBuild,
                    inquirySource: 'portfolio'
                }));
            } else {
                const template = getPortfolioTemplate(
                    location.state.portfolioSlug,
                    location.state.sourcePortfolioBuild,
                    location.state.portfolioBadge
                );
                setFormData(prev => ({
                    ...prev,
                    serviceOfInterest: template.service,
                    budget: template.budget,
                    timeline: template.timeline,
                    message: template.message,
                    sourcePortfolioBuild: location.state.sourcePortfolioBuild,
                    inquirySource: 'portfolio'
                }));
            }
        }
    }, [location.state, formData.pricingKey, formData.sourcePortfolioBuild]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            serviceOfInterest: formData.serviceOfInterest,
            message: formData.message,
            subject: `Inquiry for ${formData.serviceOfInterest}`,
            budget: formData.budget || 'Not Specified',
            timeline: formData.timeline || 'Not Specified',
            sourcePortfolioBuild: formData.sourcePortfolioBuild || undefined,
            inquirySource: formData.inquirySource || undefined,
            pricingPlan: formData.pricingPlan || undefined,
            pricingKey: formData.pricingKey || undefined
        };

        try {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:7000/api/v1';
            const response = await fetch(`${baseUrl}/public/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    serviceOfInterest: '',
                    budget: '',
                    timeline: '',
                    message: '',
                    sourcePortfolioBuild: '',
                    inquirySource: '',
                    pricingPlan: '',
                    pricingKey: ''
                });
                setTimeout(() => setIsSuccess(false), 8000);
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Connection error. Please check if the server is running.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="pt-24 pb-0 bg-transparent relative overflow-hidden" aria-labelledby="contact-heading">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
                    
                    {/* LEFT COLUMN */}
                    <div ref={leftColRef} className="animate-on-scroll animate-left space-y-10">
                        <div>
                            <h2 id="contact-heading" className="text-[clamp(26px,4vw,40px)] font-extrabold text-[#0a0a0a] leading-tight">
                                Start Your Project
                            </h2>
                            <div className="gradient-underline"></div>
                            <p className="text-[#6b7280] text-[16px] leading-[1.8] mt-8">
                                Tell us what you're trying to build or improve. Whether it’s an AI solution, automation system, or scalable application — we’ll help you turn it into a structured, working product.
                            </p>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="flex flex-col gap-4">
                            {/* Email Card */}
                            <div className="contact-card-premium flex items-center gap-5">
                                <div className="icon-container-premium">
                                    <Mail size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <span className="block text-[11px] text-[#9ca3af] uppercase tracking-wider mb-1">Email Address</span>
                                    <span className="block text-[15px] font-bold text-[#0a0a0a]">hello@cognivexa.ai</span>
                                    <span className="block text-[13px] text-[#6b7280] mt-1">Direct support for inquiries</span>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="contact-card-premium flex items-center gap-5">
                                <div className="icon-container-premium">
                                    <MapPin size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <span className="block text-[11px] text-[#9ca3af] uppercase tracking-wider mb-1">Our Location</span>
                                    <span className="block text-[15px] font-bold text-[#0a0a0a]">Pollachi, Coimbatore – 642001</span>
                                    <span className="block text-[13px] text-[#6b7280] mt-1">Based in Tamil Nadu, India</span>
                                </div>
                            </div>

                            {/* Phone Number Card */}
                            <div className="contact-card-premium flex items-center gap-5">
                                <div className="icon-container-premium">
                                    <Phone size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <span className="block text-[11px] text-[#9ca3af] uppercase tracking-wider mb-1">PHONE NUMBER</span>
                                    <a href="tel:+919876543210" className="block text-[15px] font-bold text-[#0a0a0a] hover:text-purple-600 transition-colors">
                                        +91 98765 43210
                                    </a>
                                    <span className="flex items-center gap-1.5 text-[13px] text-[#6b7280] mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                                        Call or WhatsApp us anytime
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN - Form */}
                    <div ref={rightColRef} className="animate-on-scroll animate-right">
                        <div className="form-container-premium">
                            {isSuccess ? (
                                <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-green-50 text-[#16a34a] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0a0a0a] mb-2">Message Sent!</h3>
                                    <p className="text-[#6b7280] mb-8">Thank you for reaching out. We will get back to you soon.</p>
                                    <button 
                                        onClick={() => setIsSuccess(false)}
                                        className="text-purple-600 font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="form-label-premium">Full Name <span className="required-star">*</span></label>
                                            <input 
                                                type="text" 
                                                required 
                                                placeholder="Your name" 
                                                className="form-field-premium" 
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label-premium">Email Address <span className="required-star">*</span></label>
                                            <input 
                                                type="email" 
                                                required 
                                                placeholder="Your email address" 
                                                className="form-field-premium" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="form-label-premium">Phone (Optional)</label>
                                            <input 
                                                type="tel" 
                                                placeholder="Optional – if you prefer a call" 
                                                className="form-field-premium" 
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label-premium">Service Interested In <span className="required-star">*</span></label>
                                            <div className="select-wrapper">
                                                <select 
                                                    name="service" 
                                                    required 
                                                    className="form-field-premium" 
                                                    value={formData.serviceOfInterest}
                                                    onChange={(e) => setFormData({ ...formData, serviceOfInterest: e.target.value })}
                                                >
                                                    <option value="" disabled>Select a service</option>
                                                    <option value="AI & Automation">AI & Automation</option>
                                                    <option value="Custom Software">Custom Software</option>
                                                    <option value="Web Development">Web Development</option>
                                                    <option value="Mobile App">Mobile App</option>
                                                    <option value="IoT Solutions">IoT Solutions</option>
                                                    <option value="UI/UX Design">UI/UX Design</option>
                                                    <option value="DevOps">DevOps</option>
                                                    <option value="Startup MVP">Startup MVP</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="form-label-premium">Project Budget <span className="required-star">*</span></label>
                                            <div className="select-wrapper">
                                                <select 
                                                    name="budget" 
                                                    required 
                                                    className="form-field-premium" 
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                >
                                                    <option value="" disabled>Select budget range</option>
                                                    <option value="< $5k">&lt; $5k</option>
                                                    <option value="$5k - $20k">$5k - $20k</option>
                                                    <option value="$20k - $50k">$20k - $50k</option>
                                                    <option value="$50k+">$50k+</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label-premium">Timeline <span className="required-star">*</span></label>
                                            <div className="select-wrapper">
                                                <select 
                                                    name="timeline" 
                                                    required 
                                                    className="form-field-premium" 
                                                    value={formData.timeline}
                                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                                >
                                                    <option value="" disabled>Select timeline</option>
                                                    <option value="Immediate">Immediate</option>
                                                    <option value="1-3 Months">1-3 Months</option>
                                                    <option value="3-6 Months">3-6 Months</option>
                                                    <option value="Just Exploring">Just Exploring</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="form-label-premium">Message <span className="required-star">*</span></label>
                                        <textarea 
                                            required 
                                            placeholder="Briefly describe your project, idea, or problem..." 
                                            className="form-field-premium h-[140px] resize-y"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting} 
                                        className="submit-button-premium"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            "Submit Project Inquiry"
                                        )}
                                    </button>

                                    <div className="text-center pt-2">
                                        <p className="text-[13px] text-[#9ca3af]">
                                            🔒 Your information is private and never shared.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;


