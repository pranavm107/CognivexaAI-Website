import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../admin/services/apiClient';

const conceptGradients = {
  purple: 'linear-gradient(135deg, #a855f7, #6366f1)',
  indigo: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  blue: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  cyan: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
  emerald: 'linear-gradient(135deg, #059669, #34d399)',
  orange: 'linear-gradient(135deg, #f97316, #fbbf24)',
  pink: 'linear-gradient(135deg, #db2777, #f472b6)'
};

const BrowserMockup = ({ children }) => (
    <div className="relative w-[85%] h-[75%] bg-white/40 backdrop-blur-md rounded-lg border border-white/30 shadow-2xl overflow-hidden flex flex-col">
        <div className="h-5 bg-white/50 border-b border-white/20 flex items-center px-2.5 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
            <div className="ml-2 h-2.5 w-24 bg-white/40 rounded-full" />
        </div>
        <div className="flex-1 p-3 overflow-hidden">
            {children}
        </div>
    </div>
);

const PhoneMockup = ({ children }) => (
    <div className="relative w-32 h-[85%] bg-white/40 backdrop-blur-md rounded-[24px] border-[4px] border-white/30 shadow-2xl overflow-hidden flex flex-col">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-white/30 rounded-b-xl" />
        <div className="flex-1 mt-5 p-2 overflow-hidden">
            {children}
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full" />
    </div>
);

const MockupContent = ({ type }) => {
    switch (type) {
        case 'dashboard':
            return (
                <div className="space-y-2">
                    <div className="w-[70%] h-4 bg-white/60 rounded-md rounded-tl-none" />
                    <div className="w-[50%] h-4 bg-purple-500/20 rounded-md rounded-tr-none ml-auto" />
                    <div className="w-[80%] h-4 bg-white/60 rounded-md rounded-tl-none" />
                    <div className="w-[40%] h-4 bg-purple-500/20 rounded-md rounded-tr-none ml-auto" />
                </div>
            );
        case 'analytics':
            return (
                <div className="flex h-full gap-2 items-end">
                    <div className="flex-1 h-[40%] bg-white/40 rounded-t-sm" />
                    <div className="flex-1 h-[70%] bg-white/60 rounded-t-sm" />
                    <div className="flex-1 h-[50%] bg-white/40 rounded-t-sm" />
                    <div className="flex-1 h-[90%] bg-white/80 rounded-t-sm" />
                    <div className="absolute right-4 top-8 w-10 h-10 rounded-full border-[6px] border-white/40 border-t-orange-400" />
                </div>
            );
        case 'saas':
            return (
                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <div className="w-8 h-2 bg-white/60 rounded" />
                        <div className="flex gap-1">
                            <div className="w-4 h-1.5 bg-white/40 rounded" />
                            <div className="w-4 h-1.5 bg-white/40 rounded" />
                        </div>
                    </div>
                    <div className="space-y-1.5 text-center pt-1">
                        <div className="w-[90%] h-2.5 bg-white/80 rounded mx-auto" />
                        <div className="w-[70%] h-2 bg-white/40 rounded mx-auto" />
                        <div className="w-12 h-4 bg-green-500/30 rounded mx-auto mt-2" />
                    </div>
                </div>
            );
        case 'mobile':
            return (
                <div className="space-y-2">
                    <div className="w-full h-16 bg-white/60 rounded-lg" />
                    <div className="grid grid-cols-2 gap-1.5">
                        <div className="h-10 bg-white/40 rounded-md" />
                        <div className="h-10 bg-white/40 rounded-md" />
                    </div>
                    <div className="w-full h-8 bg-pink-500/20 rounded-md" />
                </div>
            );
        case 'automation':
            return (
                <div className="relative h-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/80 rounded-md border border-white/40 shadow-sm z-10" />
                    <div className="absolute top-4 left-4 w-6 h-6 bg-white/40 rounded-md border border-white/40 shadow-sm" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/40 rounded-md border border-white/40 shadow-sm" />
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
                        <path d="M25 25 L55 55 M55 55 L85 85" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
                </div>
            );
        default:
            return (
                <div className="space-y-2">
                    <div className="w-[60%] h-2 bg-white/60 rounded" />
                    <div className="w-[80%] h-2 bg-white/40 rounded" />
                    <div className="w-[40%] h-2 bg-white/20 rounded" />
                </div>
            );
    }
};

const Card = ({ sample, index, navigate }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        };

        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const isComingSoon = sample.statusLabel?.toLowerCase().includes('coming soon');

    const handleCardClick = () => {
        if (isComingSoon) return;
        navigate(`/portfolio/builds/${sample.slug}`);
    };

    const getBadgeStyles = (theme) => {
        const base = "absolute top-4 right-4 z-20 px-3 py-1.5 backdrop-blur-md rounded-[20px] border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase shadow-lg";
        switch(theme) {
            case 'purple': return `${base} bg-purple-900/40`;
            case 'blue': return `${base} bg-blue-900/40`;
            case 'orange': return `${base} bg-orange-900/40`;
            case 'emerald': return `${base} bg-emerald-900/40`;
            case 'pink': return `${base} bg-pink-900/40`;
            case 'indigo': return `${base} bg-indigo-900/40`;
            default: return `${base} bg-black/35`;
        }
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative bg-white border border-[#f0ebff] rounded-[20px] shadow-[0_4px_24px_rgba(124,58,237,0.07)] hover:shadow-[0_20px_60px_rgba(124,58,237,0.15)] hover:-translate-y-2 hover:border-[#c4b5fd] transition-all duration-[0.35s] ease-out overflow-hidden flex flex-col ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={handleCardClick}
            data-project={sample.slug}
            data-section="concept-showcase"
        >
            {/* Spotlight Effect */}
            <div 
                className="absolute inset-0 pointer-events-none rounded-[inherit] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at var(--x) var(--y), rgba(168, 85, 247, 0.08), transparent 60%)`
                }}
            />

            {/* Card Preview Area */}
            <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center" style={{ background: conceptGradients[sample.gradientTheme] || conceptGradients.purple }}>
                {/* Shine Overlay */}
                <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
                
                <div className="relative z-10 w-full h-full flex items-center justify-center transform group-hover:scale-[1.05] transition-transform duration-700 ease-out">
                    {sample.previewType === 'mobile' ? (
                        <PhoneMockup>
                            <MockupContent type={sample.previewType} />
                        </PhoneMockup>
                    ) : (
                        <BrowserMockup>
                            <MockupContent type={sample.previewType} />
                        </BrowserMockup>
                    )}
                </div>

                {/* Badge */}
                <div className={getBadgeStyles(sample.gradientTheme)}>
                    {sample.badgeLabel}
                </div>
            </div>

            {/* Card Content Area */}
            <div className="p-6 flex flex-col flex-grow relative z-20">
                <div className="mb-4">
                    <span className="inline-block bg-[#faf5ff] border border-[#e9d5ff] text-[#7c3aed] text-[11px] font-bold tracking-[0.05em] px-3.5 py-1.5 rounded-[20px] uppercase">
                        {sample.category}
                    </span>
                </div>
                
                <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-3 group-hover:text-[#7c3aed] transition-colors duration-200">
                    {sample.title}
                </h3>
                
                <p className="text-[#6b7280] text-[14px] mb-6 leading-[1.7] line-clamp-2">
                    {sample.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {sample.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-[12px] font-medium text-[#374151] bg-[#f8f8f8] border border-[#eeeeee] rounded-[6px]">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-[#f3f0ff] flex items-center justify-between">
                    <button 
                        className={`group/link text-[#7c3aed] text-[13px] font-semibold inline-flex items-center ${isComingSoon ? 'opacity-50 cursor-default' : ''}`}
                        disabled={isComingSoon}
                        data-cta="explore-concept"
                    >
                        <span className={isComingSoon ? "" : "group-hover/link:underline"}>{isComingSoon ? "Build in Progress" : sample.ctaText}</span>
                        {!isComingSoon && <ArrowRight className="ml-1.5 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />}
                    </button>
                    
                    <div className={`text-[11px] font-semibold px-3 py-1 rounded-[20px] border ${isComingSoon ? 'bg-[#fef9c3] text-[#854d0e] border-[#fde68a]' : 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd]'}`}>
                        {sample.statusLabel}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SampleWorks = () => {
    const navigate = useNavigate();
    const { data: result, isLoading } = useQuery({
        queryKey: ['public-concept-projects'],
        queryFn: () => apiClient.get('/concept-projects?active=true'),
    });

    const samples = result?.results || [];

    return (
        <section id="concept-projects" className="py-32 relative bg-[#ffffff] overflow-hidden">
            {/* Background Effects */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% -5%, rgba(168,85,247,0.07) 0%, transparent 55%)' }}
            />
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.4]"
                style={{ 
                    backgroundImage: 'radial-gradient(rgba(124,58,237,0.1) 1px, transparent 1px)',
                    backgroundSize: '28px 28px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-[2px] h-5 bg-[#a855f7]" />
                        <span className="text-[#a855f7] text-[11px] font-bold uppercase tracking-[0.3em]">
                            SAMPLE WORKS
                        </span>
                    </div>
                    
                    <h2 className="text-[42px] md:text-[52px] font-[800] text-[#0a0a0a] leading-[1.1] mb-6 max-w-4xl tracking-tight">
                        Concepts That Demonstrate Our <span style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Engineering Standards</span>
                    </h2>
                    
                    <p className="text-[#6b7280] text-[17px] leading-[1.7] max-w-2xl">
                        These are concept projects — not client work — built to showcase real technical capability.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-[16/10] bg-slate-50 rounded-[20px] animate-pulse border border-slate-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                        {samples.map((sample, idx) => (
                            <Card key={sample._id || sample.id} sample={sample} index={idx} navigate={navigate} />
                        ))}
                    </div>
                )}

                <div className="pt-12 border-t border-[#f0f0f0]">
                    <p className="text-[#9ca3af] text-[13px] italic text-center">
                        ✦ These are sample concepts created to demonstrate our capabilities. Not client deliverables.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SampleWorks;
