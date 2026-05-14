import React from 'react';
import { motion } from 'framer-motion';
import { 
    SiSlack, 
    SiMongodb, 
    SiVercel, 
    SiFramer, 
    SiGithub,
    SiAnthropic,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiTypescript,
    SiTailwindcss,
    SiDocker,
    SiOpenai,
    SiFigma
} from 'react-icons/si';
import LogoLoop from '../LogoLoop';

// Custom SVG for Cursor logo
const CursorIcon = ({ size = 44 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.63 12L19 13.5L5 19L10.5 5L12.63 12Z" />
    </svg>
);

// Custom SVG for VS Code logo
const VscodeIcon = ({ size = 44 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-5.53-4.206a.993.993 0 0 0-1.219.01L.154 5.378a.994.994 0 0 0-.154 1.405l4.573 5.426L.023 17.614a.994.994 0 0 0 .153 1.405l.121.101a.994.994 0 0 0 1.219.01l5.53-4.206 9.46 8.63a1.494 1.494 0 0 0 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.87L10.858 12l7.146-5.457v10.913zM17 4.514L21.21 6.54 17 9.714V4.514zM21.21 17.46L17 19.486v-5.2z"/>
    </svg>
);

const platforms = [
    { name: "Cursor", icon: CursorIcon },
    { name: "VS Code", icon: VscodeIcon },
    { name: "Claude", icon: SiAnthropic },
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "MongoDB", icon: SiMongodb },
    { name: "OpenAI", icon: SiOpenai },
    { name: "Vercel", icon: SiVercel },
    { name: "Docker", icon: SiDocker },
    { name: "Figma", icon: SiFigma },
    { name: "Slack", icon: SiSlack },
    { name: "Framer", icon: SiFramer },
    { name: "GitHub", icon: SiGithub }
];

const TrustSection = () => {
    const logoItems = platforms.map(p => ({
        node: <p.icon size={40} />,
        title: p.name
    }));

    return (
        <section className="relative overflow-hidden bg-white py-[100px] scroll-mt-20" id="technologies" style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06) 0%, transparent 55%), #ffffff',
            backgroundImage: `
                radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06) 0%, transparent 55%),
                radial-gradient(rgba(124,58,237,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 28px 28px'
        }}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                        Platforms & Technologies
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]"
                    >
                        Platforms & Technologies <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">We Work With</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium"
                    >
                        We use modern tools and technologies to build scalable, high-performance digital systems.
                    </motion.p>
                </div>

                {/* Marquee Section */}
                <div className="mt-16 relative">
                    <LogoLoop
                        logos={logoItems}
                        speed={25}
                        direction="left"
                        logoHeight={56}
                        gap={64}
                        pauseOnHover
                        fadeOut
                        fadeOutColor="#ffffff"
                        ariaLabel="Technology platforms marquee"
                        renderItem={(item) => (
                            <div className="flex items-center gap-4 transition-all duration-500 group/item cursor-default hover:scale-105">
                                <div className="text-gray-400 opacity-60 group-hover/item:opacity-100 group-hover/item:text-purple-600 grayscale group-hover/item:grayscale-0 transition-all duration-500 group-hover/item:drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                    {item.node}
                                </div>
                                <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-gray-400 opacity-70 group-hover/item:opacity-100 group-hover/item:text-gray-900 transition-all duration-500">
                                    {item.title}
                                </span>
                            </div>
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
