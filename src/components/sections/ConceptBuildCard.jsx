import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const ConceptBuildCard = ({ project, idx, alignment }) => {
  const isLeft = alignment ? alignment === 'left' : idx % 2 === 0;

  return (
    <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}
    >
        <div className="w-full lg:w-3/5 group relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-200/20 blur-[80px] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true, margin: "-80px" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-md p-2 border border-white/20 transition-all duration-500 group-hover:shadow-purple-500/20 group-hover:-translate-y-2"
            >
                <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-100/80 backdrop-blur-sm border-b border-gray-200/50 rounded-t-2xl">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                
                <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl bg-gray-50">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.7, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
                viewport={{ once: true, margin: "-80px" }}
                className={`absolute ${isLeft ? '-right-6 -bottom-6' : '-left-6 -bottom-6'} hidden md:flex items-center gap-3 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-xl z-20`}
            >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-lg font-bold text-gray-900 leading-none">{project.statusTitle}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{project.statusSubtitle}</div>
                </div>
            </motion.div>
        </div>

        <div className="w-full lg:w-2/5 space-y-8">
            <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                    {project.badge}
                </span>
            </div>
            
            <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                    {project.title}
                </h3>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="pt-4">
                <Link 
                    to={`/portfolio/builds/${project.slug}`} 
                    data-cta="explore-build"
                    data-project={project.slug}
                    className="inline-flex items-center text-gray-900 font-bold text-lg group"
                >
                    <span className="relative">
                        {project.ctaText}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                </Link>
            </div>
        </div>
    </motion.div>
  );
};

export default ConceptBuildCard;
