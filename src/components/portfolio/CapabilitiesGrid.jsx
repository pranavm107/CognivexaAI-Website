import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    MessageSquare, 
    BarChart3, 
    Search as SearchIcon, 
    Globe, 
    Smartphone, 
    Cpu,
    ArrowRight,
    Clock,
    Wifi,
    MapPin,
    Signal,
    Activity,
    Layers,
    Bot
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../admin/services/apiClient';
import { scrollToSection } from '../../utils/helpers';

const iconMap = {
  Bot: Bot,
  MessageSquare: MessageSquare,
  BarChart3: BarChart3,
  Search: SearchIcon,
  Globe: Globe,
  Cpu: Cpu,
  Smartphone: Smartphone,
  Wifi: Wifi,
  MapPin: MapPin,
  Signal: Signal,
  Activity: Activity,
  Layers: Layers
};

const CapabilitiesGrid = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredTitle, setHoveredTitle] = useState(null);
    const navigate = useNavigate();

    const { data: result, isLoading } = useQuery({
        queryKey: ['public-portfolio-projects'],
        queryFn: () => apiClient.get('/portfolio-projects?active=true'),
    });

    const projects = result?.results || [];
    
    // Dynamic Categories
    const categories = ["All", ...new Set(projects.map(p => p.category))];

    const filteredSolutions = activeCategory === "All" 
        ? projects 
        : projects.filter(s => s.category === activeCategory);

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleProjectClick = (slug, title) => {
        const projectSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        navigate(`/contact?project=${projectSlug}`);
    };

    if (isLoading) {
        return (
            <div className="py-24 max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="h-64 bg-slate-50 rounded-[24px] animate-pulse border border-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <section id="solutions" className="py-24 relative overflow-hidden" style={{
            background: `
                radial-gradient(ellipse at 50% -10%, rgba(168,85,247,0.08) 0%, transparent 60%),
                radial-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
                #ffffff
            `,
            backgroundSize: 'auto, 28px 28px, auto'
        }}
        onMouseMove={handleMouseMove}
        >
            {/* Custom Cursor Tooltip */}
            <AnimatePresence>
                {hoveredTitle && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="fixed pointer-events-none z-[9999] bg-[#0a0a0a] text-white px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex items-center"
                        style={{
                            left: mousePos.x + 16,
                            top: mousePos.y + 16,
                        }}
                    >
                        <span className="text-[#a855f7] mr-2">●</span>
                        {hoveredTitle}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[#a855f7] text-[12px] font-bold uppercase tracking-[0.25em] mb-4"
                    >
                        OUR CAPABILITIES
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[40px] md:text-[56px] font-[800] text-[#0a0a0a] mb-6 leading-[1.1]"
                    >
                        Real Solutions for <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">Real Problems</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#6b7280] max-w-2xl mx-auto text-[18px]"
                    >
                        Each solution is built production-ready, not just a mockup.
                    </motion.p>
                </div>

                {/* Filter Tabs Upgrade */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex bg-[#f9f5ff] rounded-full p-1.5 border border-[#f3e8ff] overflow-x-auto no-scrollbar max-w-full">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 relative whitespace-nowrap ${
                                    activeCategory === category 
                                    ? 'text-[#7c3aed] bg-white shadow-[0_2px_8px_rgba(124,58,237,0.15)]' 
                                    : 'text-[#6b7280] hover:text-[#7c3aed]'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredSolutions.map((project, idx) => {
                            const IconComponent = iconMap[project.icon] || Bot;
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: idx * 0.1 }}
                                    key={project._id || project.id}
                                    onMouseEnter={() => setHoveredTitle(project.title)}
                                    onMouseLeave={() => setHoveredTitle(null)}
                                    className="group relative bg-white pt-[16px] pb-[20px] px-[24px] rounded-[24px] border border-[#ede9fe] shadow-[0_4px_24px_rgba(124,58,237,0.07)] transition-all duration-350 ease-in-out hover:shadow-[0_16px_48px_rgba(124,58,237,0.15)] hover:border-[#c4b5fd] hover:-translate-y-[6px] flex flex-col h-full"
                                >
                                    {/* Top Accent Bar */}
                                    <div className="absolute top-0 left-6 w-12 h-1 rounded-b-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7]"></div>

                                    <div className="w-[56px] h-[56px] flex items-center justify-center bg-gradient-to-br from-[#f3e8ff] to-[#ede9fe] border border-[#e9d5ff] rounded-[16px] mb-3 text-[#7c3aed]">
                                        <IconComponent className="w-6 h-6" />
                                    </div>

                                    {/* Visual Preview Bar */}
                                    <div className={`h-[3px] w-12 rounded-full mb-3 bg-gradient-to-r ${project.gradientStyle}`} />

                                    <h3 className="text-[20px] font-[700] text-[#0a0a0a] mb-2 group-hover:text-[#7c3aed] transition-colors duration-200">
                                        {project.title}
                                    </h3>
                                    
                                    <p className="text-[#6b7280] text-[15px] leading-[1.7] mb-3">
                                        {project.shortDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.technologies.map((tech) => (
                                            <span key={tech} className="px-[14px] py-[5px] text-[12px] font-[600] text-[#7c3aed] bg-[#faf5ff] border border-[#e9d5ff] rounded-[20px] transition-all duration-200 hover:bg-[#7c3aed] hover:text-white cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Bottom Row with Divider */}
                                    <div className="mt-auto pt-3 border-t border-[#f3f4f6] flex items-center justify-between">
                                        <div className="flex items-center text-[#9ca3af] text-[13px]">
                                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                                            {project.timeline}
                                        </div>
                                        <button 
                                            onClick={() => handleProjectClick(project.slug, project.title)}
                                            data-cta="request-solution"
                                            data-project={project.slug}
                                            className="inline-flex items-center text-[14px] font-[600] text-[#7c3aed] transition-all group/btn relative overflow-hidden"
                                        >
                                            <span className="relative z-10">{project.ctaText}</span>
                                            <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform relative z-10" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Load More Button */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-12"
                >
                    <button 
                        onClick={() => scrollToSection('concept-projects')}
                        data-cta="explore-all-concepts"
                        className="px-9 py-3.5 border-2 border-[#7c3aed] text-[#7c3aed] font-bold rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#a855f7] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
                    >
                        Explore Technical Concepts
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CapabilitiesGrid;
