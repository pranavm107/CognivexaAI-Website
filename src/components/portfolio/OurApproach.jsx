import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from '../../utils/helpers';

const steps = [
    {
        number: "01",
        tag: "DISCOVERY",
        title: "Problem Understanding",
        description: "We dive deep into your business challenges to identify where AI can have the highest impact.",
        accent: "#7c3aed"
    },
    {
        number: "02",
        tag: "PLANNING",
        title: "Solution Design",
        description: "We architect custom workflows and technical blueprints tailored to your operational needs.",
        accent: "#3b82f6"
    },
    {
        number: "03",
        tag: "EXECUTION",
        title: "Development",
        description: "Our engineering team builds clean, scalable, production-ready code using the latest tech stacks.",
        accent: "#10b981"
    },
    {
        number: "04",
        tag: "GROWTH",
        title: "Optimization",
        description: "We continuously refine the system post-launch to ensure maximum ROI and performance.",
        accent: "#f59e0b"
    }
];

const StatItem = ({ number, text, emoji }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            animate(count, number, { duration: 2, ease: "easeOut" });
        }
    }, [inView, count, number]);

    return (
        <div ref={ref} className="flex items-center gap-2">
            <span>{emoji}</span>
            <span className="font-semibold text-[#374151]">
                <motion.span>{rounded}</motion.span>{number === 50 ? '+' : number === 100 ? '%' : ''} {text}
            </span>
        </div>
    );
};

const StepCircle = ({ number, isActive }) => (
    <div className="relative z-10 flex-shrink-0">
        <motion.div 
            animate={{ 
                scale: isActive ? 1.1 : 1,
                background: isActive 
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)" 
                    : "#ffffff",
                color: isActive ? "#ffffff" : "#7c3aed"
            }}
            className={`w-[56px] h-[56px] flex items-center justify-center rounded-full text-[18px] font-bold border-2 transition-all duration-300 ${
                isActive 
                    ? "border-transparent shadow-[0_8px_32px_rgba(124,58,237,0.4)]" 
                    : "border-[#e9d5ff] shadow-[0_4px_16px_rgba(124,58,237,0.15)]"
            }`}
            style={{
                animation: isActive ? 'pulse 2s ease infinite' : 'none'
            }}
        >
            {number}
        </motion.div>
    </div>
);

const OurApproach = () => {
    const navigate = useNavigate();
    return (
        <section id="approach" className="py-[120px] relative overflow-hidden bg-white" style={{
            background: `
                radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.05) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 50%),
                #ffffff
            `
        }}>
            {/* Global Keyframes */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(168,85,247,0.4); }
                    70% { box-shadow: 0 0 0 12px rgba(168,85,247,0); }
                    100% { box-shadow: 0 0 0 0 rgba(168,85,247,0); }
                }
                @keyframes linePulse {
                    0% { opacity: 0.3; }
                    50% { opacity: 1; }
                    100% { opacity: 0.3; }
                }
            `}} />

            {/* Background Decorative Blur */}
            <div className="absolute top-1/4 -left-[250px] w-[500px] h-[500px] bg-[#a855f7]/[0.04] blur-[80px] rounded-full pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    
                    {/* LEFT SIDE */}
                    <div className="lg:sticky lg:top-32">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="w-[2px] h-[24px] bg-[#a855f7]" />
                            <span className="text-[#a855f7] text-[11px] font-bold uppercase tracking-[0.3em]">
                                HOW WE WORK
                            </span>
                        </motion.div>

                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-[40px] md:text-[52px] font-[800] text-[#0a0a0a] mb-8 leading-[1.1]"
                        >
                            {["Our Approach to", "Building Products"].map((line, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    transition={{ duration: 0.5, delay: i * 0.2 }}
                                    className="block"
                                >
                                    {i === 1 ? (
                                        <span className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#3b82f6] bg-clip-text text-transparent">
                                            {line}
                                        </span>
                                    ) : line}
                                </motion.span>
                            ))}
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-[#6b7280] text-[17px] leading-[1.8] mb-10 max-w-lg"
                        >
                            We focus on technical excellence and clear communication to deliver software that solves real business problems.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center flex-wrap gap-x-6 gap-y-4 mb-12 text-[13px]"
                        >
                            <StatItem emoji="🚀" number={10} text="Projects Built" />
                            <div className="h-3 w-[1px] bg-gray-300 hidden sm:block" />
                            <StatItem emoji="🛠️" number={10} text="Technologies Mastered" />
                            <div className="h-3 w-[1px] bg-gray-300 hidden sm:block" />
                            <StatItem emoji="🎯" number={100} text="Dedicated Attention" />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button 
                                onClick={() => navigate('/contact')}
                                data-cta="start-project"
                                data-section="approach"
                                className="px-9 py-4 text-[16px] font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full transition-all duration-300 hover:shadow-[0_8px_32px_rgba(124,58,237,0.4)] hover:scale-[1.04] active:scale-95"
                            >
                                Start a Project →
                            </button>
                            <button 
                                onClick={() => scrollToSection('concept-projects')}
                                data-cta="see-our-work"
                                data-section="approach"
                                className="px-9 py-4 text-[16px] font-bold text-[#7c3aed] bg-white border-2 border-[#7c3aed] rounded-full transition-all duration-300 hover:bg-[#7c3aed]/5 active:scale-95"
                            >
                                See Our Work
                            </button>
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE - TIMELINE */}
                    <div className="relative pt-4">
                        {/* Animated Background Line */}
                        <div className="absolute left-[27px] top-[40px] bottom-[100px] w-[2px]">
                            <div 
                                className="w-full h-full bg-gradient-to-b from-[#7c3aed] via-[#a855f7] to-[#c4b5fd]/20"
                                style={{ animation: 'linePulse 2s ease infinite' }}
                            />
                        </div>

                        <div className="space-y-12">
                            {steps.map((step, idx) => (
                                <TimelineStep key={idx} step={step} idx={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const TimelineStep = ({ step, idx }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: "-100px 0px -200px 0px" });

    return (
        <div ref={ref} className="relative flex gap-10 group">
            <StepCircle number={step.number} isActive={inView} />

            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative bg-white p-6 rounded-[16px] border border-[#f3f0ff] shadow-[0_2px_12px_rgba(124,58,237,0.06)] transition-all duration-300 hover:translate-x-2 hover:border-[#d8b4fe] hover:shadow-xl flex-grow overflow-hidden"
            >
                {/* Accent Bar */}
                <div 
                    className="absolute left-0 top-0 bottom-0 w-[4px]" 
                    style={{ backgroundColor: step.accent }}
                />

                {/* Tag */}
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#f3e8ff] text-[#7c3aed] text-[10px] font-bold tracking-widest rounded-full">
                    {step.tag}
                </div>

                <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-3 group-hover:text-[#7c3aed] transition-colors duration-200">
                    {step.title}
                </h3>
                <p className="text-[#6b7280] text-[14px] leading-relaxed max-w-md">
                    {step.description}
                </p>
            </motion.div>
        </div>
    );
};

export default OurApproach;
