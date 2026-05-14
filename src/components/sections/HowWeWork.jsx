import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Lightbulb, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Understand Your Idea",
        description: "We listen carefully to understand your business goals, target audience, and specific technical requirements.",
        icon: <Lightbulb className="w-6 h-6" />,
        color: "from-amber-400 to-orange-500"
    },
    {
        id: "02",
        title: "Plan the Solution",
        description: "We architect the best technical approach, choosing the right stack and designing for scalability and performance.",
        icon: <PenTool className="w-6 h-6" />,
        color: "from-purple-500 to-indigo-600"
    },
    {
        id: "03",
        title: "Build & Test",
        description: "We develop your product in focused sprints, ensuring high-quality code and thorough testing at every stage.",
        icon: <Code2 className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: "04",
        title: "Deliver & Support",
        description: "We deploy your solution to production and provide ongoing technical support to ensure your business continues to grow.",
        icon: <Rocket className="w-6 h-6" />,
        color: "from-green-500 to-emerald-600"
    }
];

const StepCard = ({ step, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative flex flex-col md:items-center group w-full md:w-1/4"
        >
            {/* Step Number with Glowing Orb */}
            <div className="relative mb-8 md:mb-12 flex md:justify-center">
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl relative z-10 shadow-lg shadow-purple-500/20 ml-0 md:ml-0`}
                >
                    {step.id}
                    {/* Inner pulse */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
                </motion.div>
                
                {/* Outer Ring Glow */}
                <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300 left-0 md:left-auto md:right-auto`}></div>
            </div>

            {/* Card Body */}
            <motion.div
                whileHover={{ y: -8 }}
                className="process-card bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 text-left md:text-center relative ml-4 md:ml-0"
            >
                {/* Hover Border Gradient Enhancement (Simulated) */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-700 mb-6 group-hover:text-purple-600 group-hover:bg-purple-50 transition-colors duration-300">
                    {step.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {step.title}
                </h3>
                <p>
                    {step.description}
                </p>
            </motion.div>
        </motion.div>
    );
};

const HowWeWork = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const progressWidth = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="process-section relative overflow-hidden bg-white scroll-mt-20" id="how-it-works">
            {/* Background Blobs */}
            <div className="absolute top-1/4 -left-24 w-96 h-96 bg-purple-100/40 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-purple-600 text-[11px] font-bold uppercase tracking-widest mb-4"
                    >
                        Our Process
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                    >
                        How We <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Deliver Success</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        We follow a structured, transparent, and iterative approach to transform your ideas into production-ready digital products.
                    </motion.p>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 z-0">
                        <motion.div 
                            className="process-connector"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 1.2, ease: [0.4,0,0.2,1], delay: 0.3 }}
                            viewport={{ once: true }}
                            style={{ originX: 0 }}
                        />
                    </div>

                    {/* Connector Line (Mobile) */}
                    <div className="md:hidden absolute top-0 bottom-0 left-8 w-0.5 bg-gray-100 z-0">
                        <motion.div 
                            style={{ scaleY: progressWidth, originY: 0 }}
                            className="absolute inset-0 bg-gradient-to-b from-purple-500 to-blue-500 w-full h-full opacity-60"
                        />
                    </div>

                    {/* Steps Grid */}
                    <div className="flex flex-col md:flex-row gap-12 md:gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <StepCard key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>

                {/* Interaction Hint (Mobile) */}
                <div className="md:hidden mt-12 text-center text-xs text-gray-400 font-medium tracking-widest uppercase">
                    Scroll to see the journey
                </div>
            </div>
        </section>
    );
};

export default HowWeWork;
