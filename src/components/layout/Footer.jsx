import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
    Linkedin, 
    Github, 
    Twitter, 
    Instagram, 
    Mail, 
    Phone,
    ArrowRight,
    Globe,
    Cpu,
    Code,
    Smartphone,
    Rocket,
    Layers,
    Layout,
    Settings
} from 'lucide-react';

const Footer = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const watermarkY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const services = [
        { name: "AI & Automation", icon: Cpu },
        { name: "Custom Software", icon: Code },
        { name: "Web Development", icon: Globe },
        { name: "Mobile App Development", icon: Smartphone },
        { name: "Startup MVP", icon: Rocket },
        { name: "IoT Solutions", icon: Layers },
        { name: "UI/UX Design", icon: Layout },
        { name: "DevOps & Deployment", icon: Settings },
    ];

    const company = ["Home", "Services", "Pricing", "Portfolio", "About", "Contact"];
    const socialsLinks = [
        { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/company/cognivexaai" },
        { name: "GitHub", icon: Github, url: "https://github.com/cognivexaai" },
        { name: "Twitter/X", icon: Twitter, url: "https://twitter.com/cognivexaai" },
        { name: "Instagram", icon: Instagram, url: "https://instagram.com/cognivexaai" },
    ];
    const legal = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

    return (
        <footer 
            ref={containerRef}
            className="relative w-full bg-[#080810] text-white overflow-hidden border-t border-white/[0.06]"
            style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '28px 28px'
            }}
        >
            {/* Decorative Orbs */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/5 blur-[80px] rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

            {/* SECTION 1 — Top CTA Strip */}
            <div className="w-full border-b border-white/[0.05] bg-white/[0.02] relative z-10">
                <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <h2 className="text-xl md:text-2xl font-bold">
                        Ready to build something extraordinary?
                    </h2>
                    <Link
                        to="/contact"
                        className="px-8 py-3.5 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full font-semibold flex items-center gap-2 transition-shadow"
                    >
                        Book a Free Call <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* SECTION 2 — Main Footer Grid */}
            <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-undefined relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 lg:gap-8"
                >
                    {/* Column 1 — Brand */}
                    <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="mb-6">
                            <Link to="/">
                                <span className="text-[clamp(14px,4vw,22px)] font-black tracking-tight">
                                    <span className="text-white">Cognivexa</span>
                                    <span className="text-purple-400">AI</span>
                                </span>
                            </Link>
                        </div>
                        <p className="text-[14px] leading-[1.8] text-white/45 max-w-[260px] mb-8">
                            Building high-performance AI systems and scalable digital products for the next generation of businesses.
                        </p>
                        
                        <div className="flex items-center gap-[10px] mb-8">
                            {[Linkedin, Github, Twitter].map((Icon, idx) => (
                                <motion.a
                                    key={idx}
                                    href={Icon === Linkedin ? socialsLinks[0].url : Icon === Github ? socialsLinks[1].url : socialsLinks[2].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ 
                                        borderColor: "rgba(168,85,247,0.5)",
                                        backgroundColor: "rgba(168,85,247,0.1)",
                                        color: "white"
                                    }}
                                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>

                        <div className="space-y-1">
                            <a href="mailto:hello@cognivexa.ai" className="text-[13px] text-white/40 block hover:text-white transition-colors">
                                hello@cognivexa.ai
                            </a>
                            <a href="tel:+919876543210" className="text-[13px] text-white/40 block hover:text-white transition-colors">
                                +91 98765 43210
                            </a>
                        </div>
                    </motion.div>

                    {/* Column 2 — Services */}
                    <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase mb-5">
                            SERVICES
                        </h4>
                        <ul className="space-y-2">
                            {services.map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        to="/services"
                                        className="text-[13px] text-white/55 flex items-center gap-1.5 py-1 hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3 — Company */}
                    <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase mb-5">
                            COMPANY
                        </h4>
                        <ul className="space-y-2">
                            {company.map((item) => (
                                <li key={item}>
                                    <Link 
                                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-[13px] text-white/55 flex items-center gap-1.5 py-1 hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 4 — Socials */}
                    <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase mb-5">
                            SOCIALS
                        </h4>
                        <ul className="space-y-2">
                            {socialsLinks.map((item) => (
                                <li key={item.name}>
                                    <a 
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-white/55 flex items-center gap-2 py-1 hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        <item.icon className="w-3.5 h-3.5" />
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 5 — Legal */}
                    <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase mb-5">
                            LEGAL
                        </h4>
                        <ul className="space-y-2">
                            {legal.map((item) => (
                                <li key={item}>
                                    <Link 
                                        to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                                        className="text-[13px] text-white/55 flex items-center gap-1.5 py-1 hover:text-white hover:translate-x-1 transition-all duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>

            {/* SECTION 3 — Giant Brand Watermark */}
            <div className="overflow-hidden w-full select-none pointer-events-none mt-8 z-0">
                <motion.p
                    style={{
                        y: watermarkY,
                        fontSize: "clamp(48px, 9vw, 130px)",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(255,255,255,0.06)",
                        letterSpacing: "-3px",
                    }}
                    className="text-center font-black leading-[0.85] whitespace-nowrap"
                >
                    CognivexaAI
                </motion.p>
            </div>

            {/* SECTION 4 — Bottom Bar */}
            <div className="border-t border-white/[0.05] relative z-10">
                <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center text-[12px] text-white/30 text-center md:text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block mr-2" />
                        © 2026 CognivexaAI. Engineered for excellence.
                    </div>
                    <div className="text-[12px] text-white/30 text-center md:text-right">
                        Built with React · Deployed on Vercel
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
