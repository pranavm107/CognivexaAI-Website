import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Layers } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const AboutSection = () => {
    return (
        <section className="py-28 relative overflow-hidden bg-white scroll-mt-20" id="about">
            {/* Background Glows */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-purple-100/30 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-blue-100/20 blur-[100px] rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* LEFT SIDE: Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <ScrollReveal variant="heading">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-purple-600 text-[10px] font-bold uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                    Our Mission
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                                    We Build AI Products That <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Actually Deliver Results</span>
                                </h2>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal variant="text">
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                We bridge the gap between AI hype and real-world utility. Our team focuses on engineering production-ready systems that automate complexity and drive measurable growth for your business.
                            </p>
                        </ScrollReveal>

                        {/* Bullet Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[
                                "AI-first architecture",
                                "Fast, iterative delivery",
                                "Production-ready systems",
                                "Scalable infrastructure"
                            ].map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust Micro Elements */}
                        <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-8">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Layers className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-none">Scalable</p>
                                    <p className="text-[11px] text-gray-500 mt-1">Built to grow</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-none">Secure</p>
                                    <p className="text-[11px] text-gray-500 mt-1">Enterprise grade</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <Zap className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 leading-none">High-Speed</p>
                                    <p className="text-[11px] text-gray-500 mt-1">Optimized perf</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Visual */}
                    <motion.div 
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative group">
                            {/* Abstract Background Elements */}
                            <div className="absolute -inset-8 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-[3rem] blur-3xl -z-10 group-hover:opacity-100 transition-opacity duration-700 opacity-50"></div>
                            
                            {/* Premium Container */}
                            <div className="relative rounded-[24px] overflow-hidden border border-[#f0ebff] shadow-[0_24px_80px_rgba(124,58,237,0.12)] bg-white">
                                
                                {/* MacOS Title Bar */}
                                <div className="bg-[#f9f5ff] border-b border-[#ede9fe] h-[36px] px-4 flex items-center relative z-10">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="text-[12px] text-[#9ca3af] font-medium tracking-tight">cognivexa.ai — AI Engineering</span>
                                    </div>
                                </div>

                                {/* Image Content */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                                    <img 
                                        src="/images/portfolio/our-mission.jpeg" 
                                        alt="AI Engineering Visualization" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Floating Badge 1: Top-Left (Production Ready) */}
                            <motion.div 
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-4 -left-5 bg-white p-4 md:p-5 rounded-2xl shadow-[0_8px_32px_rgba(124,58,237,0.15)] border border-[#ede9fe] z-20 hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-50 rounded-[10px] flex items-center justify-center text-[#22c55e]">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-[0.2em] leading-none mb-1.5">PRODUCTION READY</p>
                                        <p className="text-[14px] md:text-[15px] font-bold text-[#0a0a0a] leading-none">Enterprise Reliability</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Badge 2: Bottom-Right (Efficiency) */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-5 right-6 bg-white p-4 md:p-5 rounded-2xl shadow-[0_8px_32px_rgba(124,58,237,0.15)] border border-[#ede9fe] z-20 hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-[10px] flex items-center justify-center text-white shadow-lg shadow-purple-200">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-[0.2em] leading-none mb-1.5">EFFICIENCY</p>
                                        <p className="text-[14px] md:text-[15px] font-bold text-[#0a0a0a] leading-none">Fast, Scalable Delivery</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
