import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
    Target, 
    Code, 
    Cpu, 
    MessageSquare, 
    Share2, 
    Maximize2, 
    Columns
} from 'lucide-react';

const reasons = [
    {
        icon: <Target size={20} />,
        title: "Focused on Real Business Outcomes",
        description: "We don't build tech for the sake of tech. Every solution moves the needle for your business."
    },
    {
        icon: <Code size={20} />,
        title: "Clean, Scalable, Production-Ready Code",
        description: "Built to scale from day one. No shortcuts, no technical debt."
    },
    {
        icon: <Cpu size={20} />,
        title: "AI-First Approach to Modern Problems",
        description: "We leverage the latest AI models and automation frameworks to give you a competitive edge."
    },
    {
        icon: <MessageSquare size={20} />,
        title: "Transparent and Fast Communication",
        description: "You'll always know exactly where your project stands — no surprises, no delays in updates."
    }
];

const techStack = [
    "React", "Next.js", "OpenAI", "TensorFlow", "Node.js", "AWS", 
    "Supabase", "Figma", "Flutter", "Python", "MongoDB", "FastAPI"
];

const FeatureCard = ({ reason, index }) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 * index }}
            onMouseMove={handleMouseMove}
            className="group relative p-7 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:border-[#a855f7]/40 hover:bg-[#a855f7]/[0.05] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            style={{
                '--x': `${mousePos.x}px`,
                '--y': `${mousePos.y}px`
            }}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at var(--x) var(--y), rgba(168, 85, 247, 0.12), transparent 60%)`,
                }}
            />

            {/* Syntax Decoration */}
            <div className="flex gap-1.5 mb-6 opacity-40">
                <div className="h-[3px] w-4 bg-gray-500 rounded-full" />
                <div className="h-[3px] w-8 bg-[#a855f7] rounded-full" />
                <div className="h-[3px] w-5 bg-blue-500 rounded-full" />
            </div>

            <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center bg-[#7c3aed]/15 border border-[#7c3aed]/30 rounded-[10px] text-[#a855f7] mb-5 group-hover:bg-[#7c3aed]/25 group-hover:shadow-[0_0_16px_rgba(168,85,247,0.3)] transition-all duration-300">
                    {reason.icon}
                </div>
                <h3 className="text-[17px] font-bold text-white mb-3 flex items-center gap-2">
                    <span className="font-mono text-[#a855f7] text-sm">&gt;_</span>
                    {reason.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
            </div>
        </motion.div>
    );
};

const WhyWorkWithUs = () => {
    const [title, setTitle] = useState('');
    const fullTitle = "cognivexa.ai — Why Us";
    
    useEffect(() => {
        let currentText = '';
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullTitle.length) {
                currentText += fullTitle[index];
                setTitle(currentText);
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-10 md:py-undefined bg-[#050508] relative overflow-hidden">
            {/* Radial Glow */}
            <div 
                className="absolute inset-0 pointer-events-none"
                style={{ 
                    background: 'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.15) 0%, transparent 60%)' 
                }}
            />
            
            {/* Dot Grid */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ 
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-[1100px] mx-auto bg-[#14141e]/85 border border-white/[0.08] rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[20px] overflow-hidden"
                >
                    {/* Mac Title Bar */}
                    <motion.div 
                        initial={{ translateY: -10 }}
                        animate={{ translateY: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-[44px] bg-[#1e1e28]/90 border-b border-white/[0.06] flex items-center justify-between px-4 relative"
                    >
                        {/* Traffic Lights */}
                        <div className="flex gap-2 relative z-10">
                            {['#ff5f57', '#febc2e', '#28c840'].map((color, i) => (
                                <div 
                                    key={i} 
                                    className="w-3 h-3 rounded-full flex items-center justify-center group/btn cursor-pointer relative"
                                    style={{ backgroundColor: color }}
                                >
                                    <span className="opacity-0 group-hover/btn:opacity-100 text-[8px] text-black/60 font-bold transition-opacity">
                                        {i === 0 ? '✕' : i === 1 ? '−' : '+'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Title Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-[13px] text-white/50 font-medium">
                                {title}
                                <span className="animate-pulse ml-0.5">|</span>
                            </span>
                        </div>

                        {/* Right Decorative Icons */}
                        <div className="flex gap-3 text-white/20 relative z-10">
                            <Share2 size={16} />
                            <Maximize2 size={16} />
                            <Columns size={16} />
                        </div>
                    </motion.div>

                    {/* Window Content */}
                    <div className="p-10 bg-[#0e0e16]/95">
                        <div className="mb-12">
                            <div className="text-[#a855f7] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
                                WHY US
                            </div>
                            <h2 className="text-[clamp(27px,4vw,42px)] font-extrabold text-white mb-4 leading-tight">
                                Built Different.{' '}
                                <span className="bg-gradient-to-br from-[#a855f7] to-[#3b82f6] bg-clip-text text-transparent">
                                    Delivered Better.
                                </span>
                            </h2>
                            <p className="text-white/45 text-[16px]">
                                Commitment to technical excellence in every line of code.
                            </p>
                        </div>

                        {/* Grid of Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {reasons.map((reason, idx) => (
                                <FeatureCard key={idx} reason={reason} index={idx} />
                            ))}
                        </div>

                        {/* Tech Stack Bar */}
                        <div className="bg-black/40 border border-white/[0.06] rounded-lg p-[14px_20px] flex items-center overflow-hidden">
                            <div className="flex-shrink-0 flex items-center gap-2 mr-6">
                                <span className="font-mono text-[#34d399] text-[13px]">$ our-stack --includes</span>
                            </div>
                            
                            <div className="relative flex-grow overflow-hidden">
                                <motion.div 
                                    className="flex gap-4 whitespace-nowrap"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ 
                                        duration: 20, 
                                        repeat: Infinity, 
                                        ease: "linear" 
                                    }}
                                >
                                    {[...techStack, ...techStack].map((tech, i) => (
                                        <span 
                                            key={i} 
                                            className="px-[10px] py-[4px] bg-white/[0.08] text-white/60 text-[12px] font-mono rounded-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </motion.div>
                                {/* Fade Edges */}
                                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0e0e16] to-transparent pointer-events-none" />
                                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0e0e16] to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyWorkWithUs;



