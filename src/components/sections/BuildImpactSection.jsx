import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../admin/services/apiClient';
import ConceptBuildCard from './ConceptBuildCard';

const BuildImpactSection = () => {
  const { data: buildsRes, isLoading } = useQuery({
    queryKey: ['concept-builds'],
    queryFn: () => apiClient.get('/concept-builds?active=true')
  });

  const builds = buildsRes?.results || [];

  return (
    <section className="bg-white case-studies-section flex items-center relative overflow-hidden scroll-mt-20" id="portfolio">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-50/30 blur-[150px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-24">
            <div className="text-center mb-20 space-y-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-heading text-gray-900 font-bold text-5xl md:text-6xl"
                >
                    How We Build <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Real Impact</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.4,0,0.2,1], delay: 0.15 }}
                    className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto"
                >
                    We transform ideas into scalable, production-ready digital products that solve complex business challenges.
                </motion.p>
            </div>

            <div className="space-y-32">
                {isLoading ? (
                    <div className="space-y-32">
                        {[1, 2].map(i => (
                            <div key={i} className="flex flex-col lg:flex-row items-center gap-6 md:gap-undefined lg:gap-6 md:p-undefined animate-pulse">
                                <div className="w-full lg:w-3/5 aspect-[16/10] bg-gray-100 rounded-3xl"></div>
                                <div className="w-full lg:w-2/5 space-y-6">
                                    <div className="w-24 h-6 bg-gray-100 rounded-full"></div>
                                    <div className="w-full h-12 bg-gray-100 rounded-xl"></div>
                                    <div className="w-full h-24 bg-gray-100 rounded-xl"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    builds.map((project, idx) => (
                        <ConceptBuildCard 
                            key={project._id} 
                            project={project} 
                            idx={idx} 
                            alignment={project.alignment}
                        />
                    ))
                )}
            </div>

            <div className="mt-32 text-center">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Link to="/portfolio" className="inline-flex h-14 px-12 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-900 font-bold text-lg shadow-sm hover:bg-gray-50 transition-all duration-300">
                        See All Concept Builds →
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default BuildImpactSection;
