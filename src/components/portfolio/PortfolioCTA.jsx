import React from 'react';
import { Send, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useOutletContext } from 'react-router-dom';

const PortfolioCTA = () => {
    const navigate = useNavigate();
    const { openOverlay } = useOutletContext();
    
    const handleEnquireClick = (e) => {
        e.preventDefault();
        if (openOverlay) {
            openOverlay();
        }
    };

    return (
        <section className="py-10 md:py-undefined bg-white px-6">
            <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#7C3AED] to-[#4338CA] p-12 md:p-16 text-center shadow-2xl shadow-purple-500/20">
                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    
                    {/* Subtle Shimmer */}
                    <motion.div 
                        animate={{ 
                            x: ['-100%', '100%'],
                        }}
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                    />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Open to New Projects
                        </div>

                        <h2 className="text-3xl md:text-[clamp(26px,4vw,40px)] font-bold text-white mb-6 leading-tight">
                            Let's Build Something <br /> That Actually Works
                        </h2>
                        
                        <p className="text-[17px] text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                            We're currently taking on new partnerships. As an early-stage agency, every client gets dedicated, senior-level attention — not outsourced work.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button 
                                onClick={() => navigate('/contact')}
                                data-cta="start-project-cta"
                                data-section="portfolio-cta"
                                className="w-full sm:w-auto px-10 py-4 bg-white text-[#7C3AED] font-bold rounded-lg hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                            >
                                Start Your Project
                                <Send className="w-4 h-4" />
                            </button>
                            
                            <button 
                                id="openEnquire" 
                                onClick={handleEnquireClick}
                                data-cta="book-call-cta"
                                data-section="portfolio-cta"
                                className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Phone className="w-4 h-4" />
                                Book a Free Call
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioCTA;


