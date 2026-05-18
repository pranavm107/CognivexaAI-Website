import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import * as Icons from 'lucide-react';
import apiClient from '../admin/services/apiClient';
import SEO from '../components/layout/SEO';

const ConceptBuildDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const { data: build, isLoading, error } = useQuery({
        queryKey: ['concept-build', slug],
        queryFn: async () => {
            const res = await apiClient.get(`/concept-builds/slug/${slug}`);
            return res.data || res;
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

    // Dynamic resolution helper for status colors
    const getStatusColorClasses = (colorName) => {
        const colors = {
            green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            blue: 'bg-blue-50 text-blue-600 border-blue-100',
            purple: 'bg-purple-50 text-purple-600 border-purple-100',
            amber: 'bg-amber-50 text-amber-600 border-amber-100',
            rose: 'bg-rose-50 text-rose-600 border-rose-100',
            indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100'
        };
        return colors[colorName?.toLowerCase()] || colors.green;
    };

    // Fallbacks for empty/unmigrated fields
    const heroTitle = build.heroTitle || build.title;
    const heroDescription = build.heroDescription || build.description;
    const heroBadge = build.heroBadge || build.badge;
    const heroImage = build.heroImage || build.image;
    const heroButtonText = build.heroButtonText || 'Inquire for Similar Solution';

    const productionStatusTitle = build.productionStatusTitle || 'Production Status';
    const productionStatusLabel = build.productionStatusLabel || 'Battle-Ready';
    const productionStatusIconName = build.productionStatusIcon || 'Zap';
    const StatusIconComponent = Icons[productionStatusIconName] || Icons.Zap;

    const engineeringSectionTitle = build.engineeringSectionTitle || 'Engineering Standards';
    const engineeringSectionDescription = build.engineeringSectionDescription || 'Every build follows our core architectural principles.';
    
    // Default Engineering Cards in case none are created yet
    const defaultEngineeringCards = [
        { icon: "Cpu", title: "Optimized Performance", description: "Edge-ready execution with sub-200ms latency." },
        { icon: "Shield", title: "Enterprise Security", description: "End-to-end encryption and identity management." },
        { icon: "Layers", title: "Scalable Core", description: "Built with microservices-first architecture." },
        { icon: "Zap", title: "AI-Native", description: "Deeply integrated intelligence layers." }
    ];
    const engineeringCards = build.engineeringCards && build.engineeringCards.length > 0 
        ? build.engineeringCards 
        : defaultEngineeringCards;

    const businessCtaTitle = build.businessCtaTitle || 'Ready to see this in your business?';
    const businessCtaDescription = build.businessCtaDescription || 'This concept represents our engineering quality. We can architect and deploy a custom version of this solution tailored to your data and operations.';
    const businessCtaButtonText = build.businessCtaButtonText || 'Request Case Study & Quote';

    const hasMetadata = build.buildType || build.industry || build.deploymentType || build.architectureType || build.readinessLevel;

    // Autofill payload constructor
    const handleInquiryNavigate = () => {
        navigate('/contact', {
            state: {
                sourcePortfolioBuild: build.title,
                portfolioSlug: slug,
                portfolioBadge: build.badge,
                inquiryAutofill: {
                    service: build.contactService || '',
                    budget: build.contactBudget || '',
                    timeline: build.contactTimeline || '',
                    message: build.contactMessage || ''
                }
            }
        });
    };

    return (
        <div className="bg-white min-h-screen pb-24">
            <SEO 
                title={build.metaTitle || `${build.title} | Concept Build`}
                description={build.metaDescription || build.description}
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
                        <Icons.ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        BACK TO PORTFOLIO
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 text-[11px] font-black tracking-widest uppercase rounded-full mb-6">
                                {heroBadge}
                            </span>
                            <h1 className="text-5xl md:text-[clamp(42px,4vw,64px)] font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                                {heroTitle}
                            </h1>
                            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-xl">
                                {heroDescription}
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <button 
                                    onClick={handleInquiryNavigate}
                                    className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2"
                                >
                                    {heroButtonText}
                                    <Icons.ArrowRight className="w-4 h-4" />
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
                                    src={heroImage} 
                                    alt={heroTitle} 
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            
                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -right-6 md:bottom-12 md:-right-12 bg-white p-6 rounded-2xl shadow-2xl border border-gray-50 z-20 hidden sm:block">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${getStatusColorClasses(build.productionStatusColor)}`}>
                                        <StatusIconComponent className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{productionStatusTitle}</div>
                                        <div className="text-lg font-black text-gray-900">{productionStatusLabel}</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Premium Specifications Metadata Banner */}
            {hasMetadata && (
                <section className="py-12 border-y border-gray-100 bg-gray-50/20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black text-purple-600 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Icons.Cpu className="w-4 h-4" /> BUILD ARCHITECTURE & ENTERPRISE METADATA
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {build.buildType && (
                                    <div>
                                        <span className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Build Type</span>
                                        <span className="block text-[16px] font-bold text-gray-950">{build.buildType}</span>
                                    </div>
                                )}
                                {build.industry && (
                                    <div>
                                        <span className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Target Industry</span>
                                        <span className="block text-[16px] font-bold text-gray-950">{build.industry}</span>
                                    </div>
                                )}
                                {build.deploymentType && (
                                    <div>
                                        <span className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Deployment Model</span>
                                        <span className="block text-[16px] font-bold text-gray-950">{build.deploymentType}</span>
                                    </div>
                                )}
                                {build.architectureType && (
                                    <div>
                                        <span className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Architecture</span>
                                        <span className="block text-[16px] font-bold text-gray-950">{build.architectureType}</span>
                                    </div>
                                )}
                                {build.readinessLevel && (
                                    <div>
                                        <span className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Readiness Level</span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full mt-1 border border-emerald-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            {build.readinessLevel}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Technical Specifications / Engineering Standards */}
            <section className="py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black text-gray-900 mb-4">{engineeringSectionTitle}</h2>
                        <p className="text-gray-500 text-lg leading-relaxed">{engineeringSectionDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {engineeringCards.map((spec, idx) => {
                            const CardIcon = Icons[spec.icon] || Icons.Zap;
                            return (
                                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                        <CardIcon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[17px] font-bold text-gray-900 mb-3">{spec.title}</h4>
                                    <p className="text-[14px] text-gray-500 leading-relaxed">{spec.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Business CTA Section */}
            <section className="py-24 bg-white border-t border-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{businessCtaTitle}</h2>
                    <p className="text-xl text-gray-500 mb-10 leading-relaxed">
                        {businessCtaDescription}
                    </p>
                    <button 
                        onClick={handleInquiryNavigate}
                        className="px-12 py-5 bg-purple-600 text-white font-black rounded-2xl shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        {businessCtaButtonText}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ConceptBuildDetail;
