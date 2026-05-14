import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
    ArrowLeft, 
    ArrowRight, 
    CheckCircle2, 
    Cpu, 
    Layers, 
    Zap, 
    Shield,
    Calendar,
    User,
    Tag
} from 'lucide-react';
import apiClient from '../admin/services/apiClient';
import SEO from '../components/layout/SEO';

const ConceptBuildDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { data: build, isLoading, error } = useQuery({
        queryKey: ['concept-build', slug],
        queryFn: async () => {
            const res = await apiClient.get(`/concept-builds?slug=${slug}`);
            // Assuming results[0] because of slug filter
            return res.results?.[0] || res.data?.[0];
        },
        enabled: !!slug
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                    <p className="text-gray-500 font-bold animate-pulse">Initializing Environment...</p>
                </div>
            </div>
        );
    }

    if (error || !build) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
                <h2 className="text-4xl font-black text-gray-900 mb-4">Build Not Found</h2>
                <p className="text-gray-500 mb-8 text-center max-w-md">The requested technical concept may have been moved or archived. Please explore our other capabilities.</p>
                <button 
                    onClick={() => navigate('/portfolio')}
                    className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold shadow-lg shadow-purple-200"
                >
                    Back to Portfolio
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-24">
            <SEO 
                title={`${build.title} | Concept Build`}
                description={build.description}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-100 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <button 
                        onClick={() => navigate('/portfolio')}
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-purple-600 transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        BACK TO PORTFOLIO
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 text-[11px] font-black tracking-widest uppercase rounded-full mb-6">
                                {build.badge}
                            </span>
                            <h1 className="text-5xl md:text-[64px] font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                                {build.title}
                            </h1>
                            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
                                {build.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={() => navigate('/contact')}
                                    className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2"
                                >
                                    Inquire for Similar Solution
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(124,58,237,0.15)] border border-gray-100">
                                <img 
                                    src={build.image} 
                                    alt={build.title} 
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            
                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 bg-white p-6 rounded-2xl shadow-2xl border border-gray-50 z-20 hidden sm:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Production Status</div>
                                        <div className="text-lg font-black text-gray-900">Battle-Ready</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technical Specifications */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">Engineering Standards</h2>
                        <p className="text-gray-500">Every build follows our core architectural principles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Cpu, title: "Optimized Performance", desc: "Edge-ready execution with sub-200ms latency." },
                            { icon: Shield, title: "Enterprise Security", desc: "End-to-end encryption and identity management." },
                            { icon: Layers, title: "Scalable Core", desc: "Built with microservices-first architecture." },
                            { icon: Zap, title: "AI-Native", desc: "Deeply integrated intelligence layers." }
                        ].map((spec, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                    <spec.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-[17px] font-bold text-gray-900 mb-3">{spec.title}</h4>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{spec.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Ready to see this in your business?</h2>
                    <p className="text-xl text-gray-500 mb-10 leading-relaxed">
                        This concept represents our engineering quality. We can architect and deploy a custom version of this solution tailored to your data and operations.
                    </p>
                    <button 
                        onClick={() => navigate('/contact')}
                        className="px-12 py-5 bg-purple-600 text-white font-black rounded-2xl shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Request Case Study & Quote
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ConceptBuildDetail;
