import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Founder, SaaSFlow",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
        quote: "They transformed our idea into a scalable product. The AI integration was seamless and has significantly improved our customer retention.",
        rating: 5
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        role: "CEO, TechLaunch",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
        quote: "Working with this team was a game changer. Their engineering quality is top-notch, and they delivered 3x faster than our previous agency.",
        rating: 5
    },
    {
        id: 3,
        name: "David Chen",
        role: "Product Manager, Innovate Corp",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
        quote: "The automation workflows they built saved us hundreds of manual hours every month. Truly a high-ROI partnership.",
        rating: 5
    }
];

const PortfolioTestimonials = () => {
    return (
        <section className="py-24 bg-[#030712] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Clients Say</h2>
                    <p className="text-gray-400">Hear from the founders and businesses we've partnered with.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 relative group hover:border-purple-500/50 transition-all duration-300"
                        >
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-purple-500/10 transition-colors" />
                            
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed italic">
                                "{t.quote}"
                            </p>
                            
                            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                <img 
                                    src={t.image} 
                                    alt={t.name} 
                                    className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                                <div>
                                    <h4 className="text-white font-bold">{t.name}</h4>
                                    <p className="text-gray-500 text-sm">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioTestimonials;
