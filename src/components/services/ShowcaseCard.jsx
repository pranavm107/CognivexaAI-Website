import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const ShowcaseCard = ({ project, index }) => {
  // Determine col-span based on index (6-4, 4-6 pattern)
  const isEvenRow = Math.floor(index / 2) % 2 === 0;
  const isFirstInRow = index % 2 === 0;
  
  let colSpan = "lg:col-span-5"; // Fallback
  
  if (isEvenRow) {
    colSpan = isFirstInRow ? "lg:col-span-6" : "lg:col-span-4";
  } else {
    colSpan = isFirstInRow ? "lg:col-span-4" : "lg:col-span-6";
  }

  return (
    <ScrollReveal variant="card" delay={0.1 * (index % 4)} className={`${colSpan} h-[400px]`}>
      <div className="group relative w-full h-full rounded-[24px] overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.02]">
        <img 
          src={project.image || "/images/portfolio/placeholder.png"} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/50"></div>
        
        <div className="absolute top-6 left-6">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-white text-[clamp(16px,4vw,24px)] font-bold mb-2">{project.title}</h3>
          <p className="text-gray-300 text-[14px] mb-4 max-w-md">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies?.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[11px]">{tag}</span>
            ))}
          </div>
          <a 
            href={project.ctaLink || "#"} 
            className="text-white text-[13px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:underline"
          >
            {project.ctaText || "View Case Study"} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default ShowcaseCard;
