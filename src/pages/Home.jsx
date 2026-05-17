import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from 'react-router-dom';
import { runAntigravity } from '../scripts/antigravity.js';
import ScrollReveal from '../components/ui/ScrollReveal';
import SEO from '../components/layout/SEO';
import { 
    CheckCircle2, ArrowRight
} from 'lucide-react';

import LogoLoop from '@/components/LogoLoop';
import Testimonials from '../components/sections/Testimonials';
import HowWeWork from '../components/sections/HowWeWork';
import TeamsSection from '../components/sections/TeamsSection';
import OurEdge from '../components/sections/OurEdge';
import FAQSection from '../components/sections/FAQSection';
import FinalCTA from '../components/sections/FinalCTA';
import BuildImpactSection from '../components/sections/BuildImpactSection';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../admin/services/apiClient';

import {
  SiReact, SiNodedotjs, SiPython, SiOpenai, SiFirebase, SiSupabase, 
  SiTailwindcss, SiMongodb, SiNextdotjs, SiTypescript, SiFigma, 
  SiFramer, SiPostgresql, SiDocker
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export function AnimatedHeading({ text, highlightWords = [], className }) {
  return (
    <h2 className={`overflow-hidden ${className}`}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: i * 0.07,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
          viewport={{ once: true, margin: "-80px" }}
          className={`inline-block mr-[0.25em]
            ${highlightWords.includes(word.replace(/[^a-zA-Z0-9]/g, ""))
              ? "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              : ""}
            `}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

const frontendLogos = [
  { node: <SiReact className="text-[#61DAFB]" />, title: "React" },
  { node: <SiNextdotjs className="text-[#000000]" />, title: "Next.js" },
  { node: <SiTailwindcss className="text-[#38BDF8]" />, title: "Tailwind CSS" },
  { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript" },
  { node: <SiFigma className="text-[#F24E1E]" />, title: "Figma" },
  { node: <SiFramer className="text-[#0055FF]" />, title: "Framer Motion" },
  { node: <SiSupabase className="text-[#3ECF8E]" />, title: "Supabase" },
];

const backendLogos = [
  { node: <SiNodedotjs className="text-[#339933]" />, title: "Node.js" },
  { node: <SiPython className="text-[#3776AB]" />, title: "Python" },
  { node: <SiOpenai className="text-[#10A37F]" />, title: "OpenAI" },
  { node: <SiFirebase className="text-[#FFCA28]" />, title: "Firebase" },
  { node: <SiMongodb className="text-[#47A248]" />, title: "MongoDB" },
  { node: <SiPostgresql className="text-[#4169E1]" />, title: "PostgreSQL" },
  { node: <FaAws className="text-[#FF9900]" />, title: "AWS" },
  { node: <SiDocker className="text-[#2496ED]" />, title: "Docker" },
];

const CinematicServicesSection = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    });
    const row1X = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const row2X = useTransform(scrollYProgress, [0, 1], [-60, 60]);

    const row1 = [
        { title: "AI & Automation Services", tag: "AI", image: "/images/portfolio/how-we-build-3.jpeg", desc: "From chatbots to autonomous agents — we automate your business with cutting-edge AI." },
        { title: "Custom Software Development", tag: "DEV", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", desc: "Full-stack web apps, SaaS products, and enterprise-grade software built to scale." },
        { title: "Web Development", tag: "WEB", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", desc: "High-converting business websites, landing pages, and SEO-optimized responsive UI." },
        { title: "Mobile App Development", tag: "MOBILE", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800", desc: "Cross-platform iOS & Android apps, startup MVPs, and mobile-first experiences." },
        { title: "Startup MVP Development", tag: "STARTUP", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800", desc: "From idea to investor-ready MVP — rapid prototyping, strategy, and scalable architecture." }
    ];

    const row2 = [
        { title: "AI Tools & Integrations", tag: "AI", image: "/images/portfolio/how-we-build-3.jpeg", desc: "GPT-based tools, AI dashboards, and no-code + AI integrations with Zapier and Make." },
        { title: "IoT Solutions", tag: "IOT", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800", desc: "Smart device integration, real-time monitoring, fleet tracking, and IoT + AI systems." },
        { title: "UI/UX Design", tag: "DESIGN", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop", desc: "SaaS dashboard design, Figma-based design systems, and UX optimized for conversions." },
        { title: "DevOps & Deployment", tag: "DEVOPS", image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800", desc: "Cloud deployment, CI/CD pipelines, performance monitoring, and secure infrastructure." },
        { title: "Maintenance & Support", tag: "SUPPORT", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800", desc: "Ongoing maintenance, bug fixing, feature enhancements, and dedicated technical support." }
    ];

    const fullRow1 = [...row1, ...row1];
    const fullRow2 = [...row2, ...row2];

    const Card = ({ service, index }) => (
        <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="shrink-0 group">
            <Link to="/services" className="block w-full h-full">
                <div className="relative rounded-[16px] overflow-hidden bg-[#111] transition-all duration-500 hover:scale-[1.02] service-card">
                    <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-[20%] group-hover:translate-y-0 transition-transform duration-500"></div>
                    <div className="absolute inset-0 p-[16px] flex flex-col justify-end">
                        <div className="mb-0 group-hover:mb-4 transition-all duration-500">
                            <div className="inline-flex px-[10px] py-[6px] mb-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                                {service.tag}
                            </div>
                            <h3 className="text-[18px] lg:text-[clamp(13px,4vw,20px)] font-bold text-white tracking-tight leading-tight">
                                {service.title}
                            </h3>
                        </div>
                        <div className="max-h-0 opacity-0 group-hover:max-h-[140px] group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                            <p className="text-[13px] text-gray-300 mb-4 leading-relaxed translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                {service.desc}
                            </p>
                            <div className="flex items-center text-[10px] font-bold text-white uppercase tracking-[0.2em] translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                                Explore Service <ArrowRight className="w-3 h-3 ml-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <section ref={sectionRef} className="bg-[#080808] services-section relative overflow-hidden" id="services">
            <div className="max-w-[1400px] mx-auto px-6 mb-20 text-center section-inner">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.4,0,0.2,1] }}
                    className="section-label"
                >
                    OUR SERVICES
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl lg:text-[clamp(52px,4vw,80px)] font-bold text-white leading-[1.05] mb-10 tracking-tighter"
                >
                    Every digital capability <br />
                    your <span className="text-[#a855f7]">business</span> <span className="text-[#f97316]">needs.</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.4,0,0.2,1], delay: 0.15 }}
                    className="section-subtext"
                >
                    From AI chatbots to mobile apps, custom software <br className="hidden md:block" />
                    to IoT systems — we build, integrate, and scale <br className="hidden md:block" />
                    technology solutions tailored to your goals.
                </motion.p>
            </div>

            <div className="row-wrapper flex flex-col gap-[16px] px-0">
                <motion.div style={{ x: row1X }} className="flex overflow-hidden relative group/track">
                    <div className="flex gap-[16px] animate-scroll-left group-hover/track:[animation-play-state:paused]">
                        {fullRow1.map((service, idx) => (
                            <Card key={`r1-${idx}`} service={service} index={idx} />
                        ))}
                    </div>
                </motion.div>
                
                <motion.div style={{ x: row2X }} className="flex overflow-hidden relative group/track">
                    <div className="flex gap-[16px] animate-scroll-right group-hover/track:[animation-play-state:paused]">
                        {fullRow2.map((service, idx) => (
                            <Card key={`r2-${idx}`} service={service} index={idx} />
                        ))}
                    </div>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 8px)); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(calc(-50% - 8px)); }
                    100% { transform: translateX(0); }
                }
                .animate-scroll-left { animation: scrollLeft 40s linear infinite; display: flex; width: max-content; }
                .animate-scroll-right { animation: scrollRight 40s linear infinite; display: flex; width: max-content; }
            `}} />
        </section>
    );
};

const Home = () => {
    useEffect(() => {
        runAntigravity('hero-canvas-container', {
            count: 300,
            magnetRadius: 6,
            ringRadius: 7,
            waveSpeed: 0.4,
            waveAmplitude: 1,
            particleSize: 1.5,
            lerpSpeed: 0.05,
            color: '#6C4CF4',
            particleShape: 'sphere',
            autoAnimate: true,
            particleVariance: 1
        });
    }, []);

    const heroContainerVariants = {
      hidden: {},
      visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };
    const heroItemVariants = {
      hidden: { opacity: 0, y: 32 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4,0,0.2,1] } }
    };

    return (
        <>
            <SEO 
                title="Home" 
                description="CognivexaAI specializes in building high-performance AI-powered platforms, custom software, and scalable digital products."
                keywords="AI automation, software engineering, digital transformation, CognivexaAI"
            />
            
            <section className="relative min-h-[100vh] pt-[80px] pb-[40px] overflow-hidden bg-gradient-to-br from-white via-purple-50 to-blue-50 flex items-center justify-center text-center scroll-mt-20" aria-label="Hero">
                <div id="hero-canvas-container" className="absolute inset-0 z-0 opacity-70"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/20 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/20 blur-[120px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2"></div>

                <motion.div variants={heroContainerVariants} initial="hidden" animate="visible" className="relative z-10 max-w-[860px] px-4 sm:px-6 w-full flex flex-col items-center justify-center">
                    <motion.div variants={heroItemVariants} className="hero-content max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl leading-[1.1] font-bold tracking-tight text-[#111] max-w-3xl mx-auto">
                            <span className="block mb-2">Build AI Systems That</span>
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                                Automate Your Business
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto mt-8">
                            We design and develop AI-powered tools, automation workflows, and scalable software that help startups and businesses grow faster.
                        </p>

                        <div className="flex flex-col items-center mt-10 space-y-6">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.a href="/contact"
                                    whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex min-w-[220px] h-14 px-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg transition-all duration-300">
                                    Get Free Consultation
                                </motion.a>

                                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                                    <Link to="/portfolio"
                                        className="inline-flex min-w-[220px] h-14 px-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 font-bold text-lg shadow-sm hover:bg-gray-50 transition-all duration-300">
                                        View Our Work
                                    </Link>
                                </motion.div>
                            </div>
                            
                            <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Currently accepting new clients
                                </span>
                                <span className="text-gray-200 mx-1">·</span>
                                <span className="text-xs text-gray-400 font-medium">Free strategy call</span>
                                <span className="text-gray-200 mx-1">·</span>
                                <span className="text-xs text-gray-400 font-medium">No commitment</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            <CinematicServicesSection />

            {/* Case Studies Section */}
            <BuildImpactSection />

            {/* Tech Stack Section */}
            <section className="bg-white tech-stack-section relative overflow-hidden scroll-mt-20" id="tech-stack">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-purple-100/30 via-transparent to-blue-100/30 blur-[120px] rounded-full"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-80px" }}
                        className="text-center mb-16 space-y-4"
                    >
                        <div className="section-label">Our Stack</div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-heading text-gray-900"
                        >
                            Technologies We <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Master</span>
                        </motion.h2>
                        <p className="section-subtext">
                            We leverage a modern, industry-leading tech stack to build high-performance, 
                            scalable, and future-proof digital solutions.
                        </p>
                    </motion.div>

                    <div className="mt-16 flex flex-col marquee-row-container">
                        <div className="relative group marquee-row">
                            <LogoLoop
                                logos={frontendLogos}
                                speed={40}
                                direction="left"
                                logoHeight={52}
                                gap={16}
                                pauseOnHover
                                fadeOut
                                fadeOutColor="#ffffff"
                                renderItem={(item, i) => (
                                    <motion.div whileHover={{ scale: 1.06, y: -2 }} className="tech-pill" style={{ '--i': i % 10 }}>
                                        <div className="text-2xl">{item.node}</div>
                                        <span className="text-sm font-semibold text-gray-700">{item.title}</span>
                                    </motion.div>
                                )}
                            />
                        </div>
                        <div className="relative group marquee-row">
                            <LogoLoop
                                logos={backendLogos}
                                speed={35}
                                direction="right"
                                logoHeight={52}
                                gap={16}
                                pauseOnHover
                                fadeOut
                                fadeOutColor="#ffffff"
                                renderItem={(item, i) => (
                                    <motion.div whileHover={{ scale: 1.06, y: -2 }} className="tech-pill" style={{ '--i': i % 10 }}>
                                        <div className="text-2xl">{item.node}</div>
                                        <span className="text-sm font-semibold text-gray-700">{item.title}</span>
                                    </motion.div>
                                )}
                            />
                        </div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                            Built for scale · Engineered for performance · Secured by design
                        </p>
                    </motion.div>
                </div>
            </section>

            <Testimonials />
            <HowWeWork />
            <TeamsSection variant="mini" />
            <OurEdge />
            <FAQSection variant="short" />
            <FinalCTA />
        </>
    );
};
export default Home;
