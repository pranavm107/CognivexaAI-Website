import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const FinalCTA = () => {
    return (
        <section className="w-full py-28 relative overflow-hidden scroll-mt-20" id="final-cta"
            style={{
                background: `
                    radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.3) 0%, transparent 55%),
                    radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.15) 0%, transparent 50%),
                    #06060f
                `
            }}
        >
            {/* Parallax / Floating Glows */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-purple-200/20 blur-[120px] rounded-full pointer-events-none"
            ></motion.div>
            <motion.div 
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-200/20 blur-[120px] rounded-full pointer-events-none"
            ></motion.div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true }}
                className="relative z-10 max-w-[700px] mx-auto space-y-10 text-center px-6"
            >
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-purple-300 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        Ready to Scale?
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                        Ready to Build Something That <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">Actually Works?</span>
                    </h2>
                </div>
                
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                    Stop guessing and start building with a team that understands AI engineering. 
                    Let’s turn your vision into a high-performance, scalable product.
                </p>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    {/* Primary Button */}
                    <motion.a href="/contact" 
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative inline-flex h-16 items-center justify-center px-10 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-xl transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Get Free Strategy Call</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </motion.a>

                    {/* Secondary Button */}
                    <motion.a href="#portfolio" 
                        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(124,58,237,0.35)" }}
                        whileTap={{ scale: 0.97 }}
                        className="group inline-flex h-16 items-center justify-center px-10 rounded-2xl border border-white/10 hover:border-white/30 text-white font-bold text-xl hover:bg-white/5 transition-all duration-300"
                    >
                        View Case Studies
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </motion.div>

                {/* Urgency / Trust Line */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center gap-2 text-gray-500 text-sm font-medium"
                >
                    <MessageSquare className="w-4 h-4" />
                    <span>Get expert guidance in your first call. No commitment.</span>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FinalCTA;
