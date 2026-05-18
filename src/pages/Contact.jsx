import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, HardDrive, Shield, FileText } from 'lucide-react';
import ContactSection from '../components/sections/ContactSection';
import '../styles/ContactPremium.css';

const Contact = () => {
    const location = useLocation();
    const heroRef = useRef(null);

    // Scroll restoration and handling
    React.useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        return () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, []);

    useEffect(() => {
        if (location.state?.scrollToContact) {
            setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 600);
        }
    }, [location]);

    // Intersection Observer for animation visibility class
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

        const currentHero = heroRef.current;
        if (currentHero) observer.observe(currentHero);

        return () => {
            if (currentHero) observer.unobserve(currentHero);
        };
    }, []);

    return (
        <div className="contact-premium-page pt-32 pb-0 min-h-screen relative overflow-hidden bg-white">
            {/* Hero Section with subtle grid ONLY in this area */}
            <div 
                ref={heroRef} 
                className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden rounded-2xl"
            >
                {/* Subtle Light Gray square grid pattern lines strictly in the hero section */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
                    {/* Very subtle soft radial purple blur glow behind the headline */}
                    <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-purple-100/35 rounded-full blur-[110px]"></div>
                </div>

                {/* Animated Hero Content Area */}
                <div className="relative z-10 flex flex-col items-center">
                    {/* Centered Pill Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50/80 border border-purple-200/50 rounded-full select-none mb-6 shadow-sm shadow-purple-500/5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse"></span>
                        <span className="text-[10px] font-extrabold text-[#7c3aed] tracking-[0.18em] uppercase">
                            Enterprise AI Solutions
                        </span>
                    </motion.div>

                    {/* Headline with gradient on "Systems That Scale" */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
                    >
                        Let’s Build Intelligent <br />
                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                            Systems That Scale
                        </span>
                    </motion.h1>

                    {/* Supporting Subtext Constrained to 850px */}
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 text-base md:text-[17px] leading-relaxed max-w-[850px] mx-auto mb-10"
                    >
                        From AI automation and SaaS platforms to enterprise-grade IoT systems, we help businesses design, engineer, and deploy modern digital infrastructure.
                    </motion.p>

                    {/* Faint horizontal separator line */}
                    <motion.div 
                        initial={{ opacity: 0, scaleX: 0.8 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="w-full h-[1px] bg-slate-100 max-w-4xl mx-auto mb-8"
                    ></motion.div>

                    {/* 4 Trust Indicator Cards */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto w-full px-2"
                    >
                        {[
                            { icon: Clock, text: "Typically responds in 24h" },
                            { icon: HardDrive, text: "Enterprise-grade architecture" },
                            { icon: Shield, text: "NDA-friendly discussions" },
                            { icon: FileText, text: "Production-ready systems" }
                        ].map((item, idx) => (
                            <div 
                                key={idx} 
                                className="flex items-center gap-3 px-4 py-3.5 bg-white border border-slate-100 rounded-xl shadow-[0_2px_6px_-2px_rgba(124,58,237,0.03)] hover:shadow-md hover:border-purple-200/50 transition-all duration-300 text-left"
                            >
                                <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600 shrink-0">
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[13px] font-semibold text-slate-700 tracking-tight leading-snug">{item.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Main Section - Keep exact original ContactSection (untouched!) */}
            <ContactSection />
        </div>
    );
};

export default Contact;
