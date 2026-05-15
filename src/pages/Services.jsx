import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import FloatingLines from '../components/ui/FloatingLines';
import ScrollReveal from '../components/ui/ScrollReveal';
import {
    Boxes,
    Code2,
    Cloud,
    Bot,
    Smartphone,
    BriefcaseBusiness,
    CheckCircle,
    Zap,
    Globe,
    Lock,
    Headphones,
    Rocket,
    MessageSquare,
    Layout,
    ArrowRight,
    Cpu,
    Check,
    Shield,
    Star
} from "lucide-react";




import { StatefulButton } from '../components/ui/stateful-button';
import FAQSection from '../components/sections/FAQSection';
import apiClient from '../admin/services/apiClient';
import { ServiceCard } from '../components/services/ServiceCard';
import ShowcaseCard from '../components/services/ShowcaseCard';

const Services = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [tooltip, setTooltip] = useState({
        visible: false,
        text: "",
        x: 0,
        y: 0
    });

    const [services, setServices] = useState([]);
    const [showcaseProjects, setShowcaseProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Services
            const servicesResponse = await apiClient.get('/services');
            const servicesData = servicesResponse?.results || servicesResponse?.data?.results || servicesResponse?.data || [];
            
            setServices(
                servicesData
                    .filter(s => s.active !== false)
                    .sort((a, b) => a.order - b.order)
            );

            // Fetch Showcase Projects
            const showcaseResponse = await apiClient.get('/showcase-projects');
            const showcaseData = showcaseResponse?.results || showcaseResponse?.data?.results || showcaseResponse?.data || [];
            
            setShowcaseProjects(
                showcaseData
                    .filter(p => p.active !== false)
                    .sort((a, b) => a.order - b.order)
            );

        } catch (error) {
            console.error('Data fetch failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const initialServices = services.slice(0, 6);
    const additionalServices = services.slice(6);

    return (
        <>
            <style>{`
                @keyframes gradientMove {
                    0% { background-position: 0% }
                    100% { background-position: 200% }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradientMove 3s linear infinite;
                }
            `}</style>
            {/* SERVICES HERO */}
            <section className="relative min-h-[80vh] flex items-center bg-white overflow-hidden py-10 md:py-undefined" aria-label="Services hero">

                {/* gradient background */}
                <div className="absolute inset-0 w-full h-full opacity-40">
                    <FloatingLines
                        backgroundColor="#FFFFFF"
                        enabledWaves={["middle"]}
                        lineCount={[7]}
                        lineDistance={[16]}
                        linesGradient={["#e945f5", "#6c4cf4", "#e945f5"]}
                        interactive={false}
                        parallax={false}
                        mixBlendMode="normal"
                        styleMode="clean"
                    />
                </div>


                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">

                    <ScrollReveal variant="heading">
                        <h1 className="text-[clamp(27px,4vw,42px)] md:text-[clamp(42px,4vw,64px)] leading-[1.1] font-bold text-[#1a1a1a] mb-[24px] tracking-tight">
                            AI Solutions That Grow<br />
                            Your Business
                        </h1>
                    </ScrollReveal>

                    <p className="text-[18px] md:text-[clamp(13px,4vw,20px)] leading-[1.6] text-gray-600 mb-[40px]">
                        We build AI-powered tools, automation systems, and scalable applications tailored to your business needs.
                    </p>



                    <ScrollReveal variant="button">
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/contact" state={{ scrollToContact: true }}
                                className="inline-flex px-[36px] py-[14px] rounded-full bg-gradient-to-r from-[#B455F3] to-[#393AF3] text-white font-semibold text-[16px] shadow-[0_10px_30px_rgba(108,76,240,0.35)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_15px_40px_rgba(108,76,240,0.45)]">
                                Get Free Consultation
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-10 md:py-undefined bg-gray-50/30 relative overflow-hidden" id="services">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-purple-100/30 blur-[120px] rounded-full"></div>
                    <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-blue-100/30 blur-[120px] rounded-full"></div>
                </div>

                <div className="w-full px-4 sm:px-6 max-w-[1248px] mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <ScrollReveal variant="heading">
                            <h2 className="text-[clamp(23px,4vw,36px)] md:text-[clamp(34px,4vw,52px)] font-bold text-[#140a4f] mb-6 tracking-tight">
                                Our Services
                            </h2>
                            <p className="text-[18px] md:text-[clamp(13px,4vw,20px)] text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Comprehensive solutions to design, build, and scale modern digital products.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {loading ? (
                            [...Array(6)].map((_, i) => (
                                <div key={i} className="h-[350px] bg-white/50 animate-pulse rounded-[24px] border border-gray-100"></div>
                            ))
                        ) : services.length === 0 ? (
                            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10 md:py-undefined">
                                <h3 className="text-xl font-bold text-gray-500">No services available</h3>
                            </div>
                        ) : (
                            initialServices.map((service, idx) => (
                                <ScrollReveal key={service._id || idx} variant="card" delay={idx * 0.1}>
                                    {service ? <ServiceCard service={service} /> : null}
                                </ScrollReveal>
                            ))
                        )}
                    </div>

                    {!loading && services.length > 6 && (
                        <>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-8 lg:pt-10 flex flex-wrap justify-center gap-8 lg:gap-10">
                                            {additionalServices.map((service, idx) => (
                                                <motion.div
                                                    key={service._id || idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                                                    className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.7rem)] max-w-[400px] lg:max-w-none"
                                                >
                                                    {service ? <ServiceCard service={service} /> : null}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-16 text-center relative">
                                {/* Visual continuity gradient */}
                                {!isExpanded && (
                                    <div className="absolute -top-6 md:p-undefined left-0 w-full h-24 bg-gradient-to-t from-gray-50/80 to-transparent pointer-events-none z-10"></div>
                                )}
                                
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="group relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-[#B455F3] to-[#393AF3] text-white font-bold text-lg shadow-[0_10px_30px_rgba(108,76,240,0.3)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_15px_40px_rgba(108,76,240,0.4)]"
                                >
                                    <span className="relative z-10">
                                        {isExpanded ? "Show Less Services" : "View More Services"}
                                    </span>
                                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Why Choose CognivexaAI Section (Redesigned What You Get) */}
            <section className="py-[100px] bg-white">
                <div className="w-full px-4 sm:px-6 max-w-[1200px] mx-auto">
                    <div className="text-center mb-16">
                        <ScrollReveal variant="heading">
                            <span className="text-[#a855f7] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">OUR ADVANTAGE</span>
                            <h2 className="text-[clamp(31px,4vw,48px)] font-bold text-[#0a0a0a] mb-4 tracking-tight">
                                Why Choose CognivexaAI
                            </h2>
                            <p className="text-[18px] text-gray-500 max-w-2xl mx-auto">
                                We don't just build software — we build competitive advantages.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Clean, scalable code", icon: <Code2 className="w-6 h-6" />, desc: "Maintainable architecture built with industry best practices." },
                            { title: "Fast delivery", icon: <Zap className="w-6 h-6" />, desc: "Agile workflows to get your product to market quickly." },
                            { title: "AI-powered solutions", icon: <Bot className="w-6 h-6" />, desc: "Cutting-edge AI integration for a lasting competitive edge." },
                            { title: "Transparent communication", icon: <MessageSquare className="w-6 h-6" />, desc: "Regular updates and direct access to our core team." },
                            { title: "Ongoing support", icon: <Headphones className="w-6 h-6" />, desc: "Dedicated maintenance and post-launch optimization." },
                            { title: "End-to-end Ownership", icon: <Shield className="w-6 h-6" />, desc: "From design to deployment, we own the entire delivery process." }
                        ].map((item, idx) => (
                            <ScrollReveal key={idx} variant="card" delay={idx * 0.1}>
                                <div className="group relative p-7 bg-white border border-[#f0f0f0] rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#a855f7] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
                                    <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#f3e8ff] to-[#ede9fe] flex items-center justify-center text-[#7c3aed] mb-6 transition-transform duration-300 group-hover:scale-110">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-[16px] font-bold text-[#111] mb-2">{item.title}</h4>
                                    <p className="text-[#6b7280] text-[14px] leading-[1.6]">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Subtle Divider */}
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="h-[1px] bg-[#f0f0f0] w-full"></div>
            </div>

            {/* How We Build Your Solution (Process) */}
            <section className="py-[100px] bg-white" id="process">
                <div className="w-full px-4 sm:px-6 max-w-[1200px] mx-auto">
                    <div className="text-center mb-20">
                        <ScrollReveal variant="heading">
                            <span className="text-[#a855f7] text-sm font-bold tracking-[0.2em] uppercase mb-4 block">OUR PROCESS</span>
                            <h2 className="text-[clamp(31px,4vw,48px)] font-bold text-[#0a0a0a] mb-4 tracking-tight">
                                How We Build Your Solution
                            </h2>
                            <p className="text-[18px] text-gray-500 max-w-2xl mx-auto">
                                A simple, transparent, and effective process — from idea to launch.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[32px] left-[50px] right-[50px] h-[2px] border-t-2 border-dashed border-[#e9d5ff]"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                            {[
                                { step: "1", title: "Understand your idea", desc: "We dive deep into your requirements and business goals." },
                                { step: "2", title: "Plan the solution", desc: "Creating a roadmap, architecture, and design for success." },
                                { step: "3", title: "Build & test", desc: "Agile development followed by rigorous quality assurance." },
                                { step: "4", title: "Deliver & support", desc: "Successful launch followed by ongoing maintenance." }
                            ].map((item, idx) => (
                                <ScrollReveal key={idx} variant="card" delay={idx * 0.1}>
                                    <div className="flex flex-col items-center text-center group">
                                        <div className="w-16 h-16 rounded-full bg-white border-2 border-[#a855f7] flex items-center justify-center mb-6 relative transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#a855f7] group-hover:to-[#7c3aed] group-hover:shadow-lg group-hover:shadow-purple-200">
                                            <span className="text-[clamp(13px,4vw,20px)] font-bold text-[#7c3aed] group-hover:text-white transition-colors duration-300">
                                                {item.step}
                                            </span>
                                        </div>
                                        <h3 className="text-[16px] font-bold text-[#0a0a0a] mb-3 group-hover:text-[#a855f7] transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-[#6b7280] text-[14px] leading-relaxed max-w-[180px]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sample Work Section (Redesigned Portfolio) */}
            <section className="py-[100px] bg-white relative overflow-hidden">
                {/* Subtle Radial Gradient Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50" 
                     style={{ background: 'radial-gradient(ellipse at 50% 0%, #f3e8ff 0%, transparent 60%)' }}>
                </div>

                <div className="w-full px-4 sm:px-6 max-w-[1200px] mx-auto relative z-10">
                    <div className="text-center mb-16 pt-[80px]">
                        <ScrollReveal variant="heading">
                            <span className="text-[#a855f7] text-[12px] font-bold tracking-[0.2em] uppercase mb-4 block">OUR WORK</span>
                            <h2 className="text-[clamp(36px,4vw,56px)] font-[800] text-[#0a0a0a] mb-4 tracking-tight leading-tight">
                                Work That Speaks
                            </h2>
                            <p className="text-[18px] text-[#6b7280] max-w-2xl mx-auto">
                                A glimpse of what we've built — intelligent, scalable, and beautifully crafted products.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mb-16">
                        {showcaseProjects.length > 0 ? (
                            showcaseProjects.map((project, index) => (
                                <ShowcaseCard key={project._id || index} project={project} index={index} />
                            ))
                        ) : (
                            <div className="col-span-full py-10 md:py-undefined text-center">
                                <p className="text-gray-400 italic">Our showcase projects are being updated...</p>
                            </div>
                        )}
                    </div>

                    {/* CTA Row */}
                    <div className="text-center">
                        <ScrollReveal variant="heading">
                            <h4 className="text-[clamp(13px,4vw,20px)] font-bold text-[#0a0a0a] mb-6">Want to see more?</h4>
                            <Link to="/portfolio" className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-bold text-[16px] shadow-lg hover:brightness-110 hover:scale-[1.05] transition-all duration-300">
                                View Full Portfolio <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ================= FAQ SECTION ================= */}
            <FAQSection variant="full" />

            {/* Ready to Build CTA (Redesigned Ultra-Premium) */}
            <section className="py-[160px] bg-white">
                <div className="w-full px-4 sm:px-6 max-w-[1100px] mx-auto">
                    <ScrollReveal variant="card" delay={0.1}>
                        <div className="relative rounded-[32px] overflow-hidden bg-[#080810] p-12 md:p-20 text-center shadow-[0_32px_80px_rgba(124,58,237,0.2)] border border-white/10">
                            
                            {/* Animated Particle/Grid Overlay */}
                            <div className="absolute inset-0 pointer-events-none z-0" 
                                 style={{ 
                                     backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', 
                                     backgroundSize: '32px 32px' 
                                 }}>
                            </div>

                            {/* Floating Orbs (Decorative Background) */}
                            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[rgba(124,58,237,0.15)] blur-[80px] pointer-events-none z-0"></div>
                            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-[rgba(59,130,246,0.1)] blur-[60px] pointer-events-none z-0"></div>

                            {/* Inner Glowing Gradient */}
                            <div className="absolute inset-0 pointer-events-none z-0" 
                                 style={{ 
                                     background: `radial-gradient(ellipse at 30% 50%, rgba(124, 58, 237, 0.35) 0%, transparent 60%),
                                                 radial-gradient(ellipse at 70% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 60%)` 
                                 }}>
                            </div>

                            <div className="relative z-10">
                                <ScrollReveal variant="heading">
                                    <div className="flex items-center justify-center gap-4 mb-6">
                                        <div className="h-[1px] w-8 bg-purple-500/30"></div>
                                        <span className="text-[#a855f7] text-[12px] font-bold tracking-[0.25em] uppercase">
                                            LET'S BUILD TOGETHER
                                        </span>
                                        <div className="h-[1px] w-8 bg-purple-500/30"></div>
                                    </div>

                                    <h2 className="text-[clamp(26px,4vw,40px)] md:text-[clamp(36px,4vw,56px)] font-[800] text-white mb-6 leading-[1.1] tracking-tight">
                                        Ready to Turn Your Idea Into <span className="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] bg-clip-text text-transparent">Reality?</span>
                                    </h2>
                                    
                                    <p className="text-[17px] leading-[1.7] text-white/55 mb-12 max-w-[560px] mx-auto">
                                        Let's talk about your project. We offer a free strategy call — no pressure, no commitment, just clarity on how to move forward.
                                    </p>
                                </ScrollReveal>

                                <ScrollReveal variant="button" delay={0.3}>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                                        <Link to="/contact" className="w-full sm:w-auto px-[36px] py-[16px] bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-semibold text-[16px] rounded-full shadow-[0_10px_30px_rgba(124,58,237,0.3)] hover:scale-[1.04] hover:brightness-110 hover:shadow-[0_0_24px_rgba(168,85,247,0.5)] transition-all duration-300">
                                            Book a Free Call →
                                        </Link>
                                        <Link to="/portfolio" className="w-full sm:w-auto px-[36px] py-[16px] bg-transparent text-white font-semibold text-[16px] rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300">
                                            View Our Work
                                        </Link>
                                    </div>
                                </ScrollReveal>

                                {/* Trust Signals */}
                                <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6">
                                    {[
                                        "No commitment required",
                                        "Response within 24 hours",
                                        "100% Free strategy call"
                                    ].map((item, i) => (
                                        <React.Fragment key={i}>
                                            <div className="flex items-center gap-2 text-[13px] text-white/40 font-medium">
                                                <CheckCircle className="w-4 h-4 text-white/60" />
                                                {item}
                                            </div>
                                            {i < 2 && <span className="hidden sm:block text-white/20">·</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Redundant sections removed (Testimonials, TrustedBy) */}

            {/* Floating Tooltip UI */}
            {tooltip.visible && (
                <div
                    className="fixed z-[100] pointer-events-none px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md bg-black/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-white/10 transition-all duration-75 ease-out whitespace-nowrap"
                    style={{
                        top: tooltip.y + 15,
                        left: tooltip.x + 15
                    }}
                >
                    {tooltip.text}
                </div>
            )}
        </>
    );
};

export default Services;
