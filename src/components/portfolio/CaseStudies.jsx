import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const caseStudiesData = [
    {
        id: 1,
        title: "AI Customer Support Automation Platform",
        category: "AI Solutions",
        description: "Developed an intelligent chatbot system for a leading retail brand, reducing manual support workload by 70%.",
        metrics: ["70% faster response", "40% cost reduction"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=800",
        techStack: ["React", "OpenAI", "Node.js", "MongoDB"],
        link: "#"
    },
    {
        id: 2,
        title: "Enterprise SaaS Workflow Management",
        category: "Web Apps",
        description: "A centralized dashboard for multi-department coordination, improving task completion rates by 3x.",
        metrics: ["3x Faster Completion", "95% User Adoption"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        techStack: ["Next.js", "Supabase", "Tailwind CSS"],
        link: "#"
    },
    {
        id: 3,
        title: "E-commerce Logistics Automation",
        category: "Automation",
        description: "Automated warehouse dispatch and tracking systems, eliminating manual errors and optimizing routes.",
        metrics: ["25% Fuel Saved", "Zero Dispatch Errors"],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        techStack: ["Python", "FastAPI", "AWS Lambda"],
        link: "#"
    },
    {
        id: 4,
        title: "FinTech Mobile Banking Experience",
        category: "Mobile Apps",
        description: "A high-security, intuitive mobile app for international currency transfers and wallet management.",
        metrics: ["₹50Cr+ Volume", "4.8 Star Rating"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
        techStack: ["React Native", "Firebase", "Stripe"],
        link: "#"
    },
    {
        id: 5,
        title: "Predictive Maintenance for Industry 4.0",
        category: "AI Solutions",
        description: "Used machine learning to predict machine failure before it happens, saving thousands in downtime.",
        metrics: ["60% Less Downtime", "₹12L Saved Monthly"],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        techStack: ["TensorFlow", "IoT Hub", "Azure"],
        link: "#"
    },
    {
        id: 6,
        title: "B2B Lead Generation Engine",
        category: "Automation",
        description: "Automated LinkedIn and Email outreach system that generates qualified leads for sales teams.",
        metrics: ["500+ Leads/Mo", "15% Conversion"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        techStack: ["Node.js", "GPT-4", "SendGrid"],
        link: "#"
    }
];

const categories = ["All", "AI Solutions", "Web Apps", "Mobile Apps", "Automation"];

const CaseStudies = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects = activeFilter === "All" 
        ? caseStudiesData 
        : caseStudiesData.filter(p => p.category === activeFilter);

    return (
        <section id="case-studies" className="py-24 bg-[#030712] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Featured Case Studies
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Explore how we've helped businesses scale and automate with tailored digital solutions.
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                                activeFilter === cat 
                                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent shadow-lg shadow-purple-500/20" 
                                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full shadow-2xl"
                            >
                                {/* Image Wrapper */}
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    {/* Category Tag */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-purple-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                                        {project.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Metrics */}
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {project.metrics.map((metric, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-emerald-400 text-xs font-bold">{metric}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-white/5 text-gray-500 text-[10px] rounded border border-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6">
                                        <a 
                                            href={project.link}
                                            className="inline-flex items-center text-white text-sm font-bold group/btn"
                                        >
                                            View Case Study
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default CaseStudies;
