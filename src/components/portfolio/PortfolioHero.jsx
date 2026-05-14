import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ShapeGrid from '../ui/ShapeGrid';
import { scrollToSection } from '../../utils/helpers';

const PortfolioHero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center bg-white pt-[120px] pb-[80px] overflow-hidden">
            {/* 1. BACKGROUND STRUCTURE */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Entry Animation for Grid */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    {/* 5. PERFORMANCE OPTIMIZATION - Hide on mobile via CSS */}
                    <div className="hidden md:block w-full h-full opacity-80">
                        <ShapeGrid 
                            speed={0.4}
                            squareSize={55}
                            direction="diagonal"
                            borderColor="rgba(124, 58, 237, 0.25)"
                            hoverFillColor="rgba(124, 58, 237, 0.4)"
                            shape="square"
                            hoverTrailAmount={2}
                        />
                    </div>
                </motion.div>

                {/* 3. OVERLAY LAYER (CRITICAL FOR READABILITY) */}
                <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.92) 100%)'
                    }}
                />

            </div>

            {/* 4. HERO CONTENT STYLING */}
            <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-white/80 backdrop-blur-sm border border-[#7C3AED]/20 rounded-full text-[#7C3AED] text-[12px] font-bold uppercase tracking-widest shadow-sm">
                        ✦ Technical Portfolio
                    </div>

                    <h1 
                        className="text-5xl md:text-[72px] font-black text-[#111827] leading-[1.1] mb-8 tracking-tight"
                        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
                    >
                        Intelligent Solutions,<br />
                        <span className="bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent italic">
                            Engineered to Perform
                        </span>
                    </h1>
                    
                    <p className="max-w-[580px] mx-auto text-[18px] text-[#6B7280] leading-relaxed mb-12">
                        We architect and deploy AI-driven digital ecosystems. Explore our technical capabilities through real-world deployment concepts.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
                        {/* Primary CTA - Gradient */}
                        <button 
                            onClick={() => scrollToSection('solutions')}
                            data-cta="explore-capabilities"
                            data-section="hero"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] hover:shadow-lg hover:shadow-purple-500/25 rounded-xl transition-all duration-300 group active:scale-95"
                        >
                            Explore Capabilities
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Secondary - Glass Effect */}
                        <button 
                            onClick={() => scrollToSection('approach')}
                            data-cta="review-tech-stack"
                            data-section="hero"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-[15px] font-bold text-[#111827] bg-white/40 backdrop-blur-md border border-[#E5E7EB] hover:bg-white/60 hover:border-purple-200 rounded-xl transition-all duration-300 active:scale-95"
                        >
                            Review Tech Stack
                        </button>
                    </div>

                    {/* Stats Row */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-[14px] font-medium uppercase tracking-wider text-gray-500">
                            <div className="flex items-center gap-2">
                                <span className="text-[#7C3AED] font-bold">06</span>
                                <span>Solution Types</span>
                            </div>
                            <div className="hidden sm:block w-[1px] h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-[#7C3AED] font-bold">04</span>
                                <span>Tech Domains</span>
                            </div>
                            <div className="hidden sm:block w-[1px] h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-[#7C3AED] font-bold">100%</span>
                                <span>AI Optimized</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioHero;





