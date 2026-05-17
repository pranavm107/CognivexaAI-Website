
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const getPricingKey = (title) => {
  const t = (title || "").toLowerCase();
  if (t.includes("starter") && t.includes("web")) return "starterWebsite";
  if (t.includes("business") && t.includes("web")) return "businessWebsite";
  if (t.includes("app") || t.includes("saas")) return "webAppSaas";
  if (t.includes("ai starter") || (t.includes("ai") && t.includes("starter"))) return "aiStarter";
  if (t.includes("ai growth") || (t.includes("ai") && t.includes("growth"))) return "aiGrowth";
  if (t.includes("ai enterprise") || (t.includes("ai") && t.includes("enterprise"))) return "aiEnterprise";
  if (t.includes("iot starter") || (t.includes("iot") && t.includes("starter"))) return "iotStarter";
  if (t.includes("iot growth") || (t.includes("iot") && t.includes("growth"))) return "iotGrowth";
  if (t.includes("iot advanced") || (t.includes("iot") && t.includes("advanced"))) return "iotAdvanced";
  if (t.includes("smart") || t.includes("ecosystem")) return "smartSystemPackage";
  return "";
};
import FAQSection from '../components/sections/FAQSection';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

import { useQuery } from '@tanstack/react-query';
import apiClient from '../admin/services/apiClient';

const themeStyles = {
  purple: { border: 'border-[#7c3aed]', bg: 'bg-[rgba(124,58,237,0.03)]', shadow: 'shadow-[0_20px_50px_rgba(124,58,237,0.15)]', hover: 'hover:shadow-[0_25px_50px_rgba(124,58,237,0.2)]', text: 'text-[#7c3aed]', gradient: 'from-[#7c3aed] to-[#6366f1]', badge: 'bg-[#7c3aed]' },
  teal: { border: 'border-[#14b8a6]', bg: 'bg-[rgba(20,184,166,0.03)]', shadow: 'shadow-[0_20px_50px_rgba(20,184,166,0.15)]', hover: 'hover:shadow-[0_25px_50px_rgba(20,184,166,0.2)]', text: 'text-[#14b8a6]', gradient: 'from-[#0d9488] to-[#14b8a6]', badge: 'bg-[#14b8a6]' },
  indigo: { border: 'border-[#6366f1]', bg: 'bg-[rgba(99,102,241,0.03)]', shadow: 'shadow-[0_20px_50px_rgba(99,102,241,0.15)]', hover: 'hover:shadow-[0_25px_50px_rgba(99,102,241,0.2)]', text: 'text-[#6366f1]', gradient: 'from-[#6366f1] to-[#8b5cf6]', badge: 'bg-[#6366f1]' },
  blue: { border: 'border-[#3b82f6]', bg: 'bg-[rgba(59,130,246,0.03)]', shadow: 'shadow-[0_20px_50px_rgba(59,130,246,0.15)]', hover: 'hover:shadow-[0_25px_50px_rgba(59,130,246,0.2)]', text: 'text-[#3b82f6]', gradient: 'from-[#3b82f6] to-[#06b6d4]', badge: 'bg-[#3b82f6]' },
  emerald: { border: 'border-[#10b981]', bg: 'bg-[rgba(16,185,129,0.03)]', shadow: 'shadow-[0_20px_50px_rgba(16,185,129,0.15)]', hover: 'hover:shadow-[0_25px_50px_rgba(16,185,129,0.2)]', text: 'text-[#10b981]', gradient: 'from-[#10b981] to-[#34d399]', badge: 'bg-[#10b981]' },
  orange: { border: 'border-[#f59e0b]', bg: 'bg-[rgba(245,158,11,0.03)]', shadow: 'shadow-[0_20px_50px_rgba(245,158,11,0.15)]', hover: 'hover:shadow-[0_25px_50px_rgba(245,158,11,0.2)]', text: 'text-[#f59e0b]', gradient: 'from-[#f59e0b] to-[#f97316]', badge: 'bg-[#f59e0b]' },
  pink: { border: 'border-[#ec4899]', bg: 'bg-[rgba(236,72,153,0.03)]', shadow: 'shadow-[0_20px_50px_rgba(236,72,153,0.15)]', hover: 'hover:shadow-[0_25px_50px_rgba(236,72,153,0.2)]', text: 'text-[#ec4899]', gradient: 'from-[#ec4899] to-[#f43f5e]', badge: 'bg-[#ec4899]' },
  neutral: { border: 'border-slate-200', bg: 'bg-slate-50/50', shadow: 'shadow-md', hover: 'hover:shadow-lg', text: 'text-slate-600', gradient: 'from-slate-700 to-slate-900', badge: 'bg-slate-600' }
};

const pricingFaqs = [
  {
    q: "Do you offer payment in installments?",
    a: "Yes. We typically take 50% upfront and 50% on delivery. For larger projects, milestone-based payments are available."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. All our solutions are built to scale. You can add AI or IoT features to any existing project."
  },
  {
    q: "Are prices negotiable for startups?",
    a: "Yes. We offer special early-stage startup pricing. Book a free call to discuss your budget."
  }
];

export default function Pricing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);

  const { data: catRes, isLoading: isCatLoading } = useQuery({ queryKey: ['pricing-categories'], queryFn: () => apiClient.get('/pricing-categories?active=true') });
  const { data: planRes, isLoading: isPlanLoading } = useQuery({ queryKey: ['pricing-plans'], queryFn: () => apiClient.get('/pricing-plans?active=true') });
  const { data: smartRes, isLoading: isSmartLoading } = useQuery({ queryKey: ['smart-package'], queryFn: () => apiClient.get('/smart-package') });

  const categories = catRes?.results || [];
  const plans = planRes?.results || [];
  const smartPackage = smartRes?.data || {};

  const handleSelectTab = (index) => {
    setActiveTab(index);
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCardClasses = (theme, isPopular) => {
    const baseClasses = "relative rounded-[20px] p-8 transition-all duration-300 group hover:-translate-y-[6px] hover:scale-[1.02] flex flex-col h-full";
    const style = themeStyles[theme] || themeStyles.purple;

    if (isPopular) {
      return `${baseClasses} border-2 ${style.border} ${style.bg} ${style.shadow} ${style.hover} z-10`;
    }
    return `${baseClasses} border border-[#e5e7eb] bg-[#ffffff] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]`;
  };

  const getTabClasses = (index) => {
    if (activeTab !== index) return "text-[#64748b] bg-transparent hover:text-[#0f172a]";
    return "bg-gradient-to-br from-[#7c3aed] to-[#6366f1] text-white shadow-[0_4px_15px_rgba(124,58,237,0.2)]";
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1e293b] selection:bg-purple-100 relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 z-0" />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden z-10">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "opacity-100"
          )}
        />
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[rgba(124,58,237,0.05)] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#a855f7] mb-6">
              TRANSPARENT PRICING
            </span>
            <h1 className="text-[clamp(26px,4vw,40px)] md:text-[clamp(36px,4vw,56px)] font-[800] leading-[1.1] mb-8 text-[#0f172a] tracking-wide">
              From websites to <span className="bg-gradient-to-br from-[#7c3aed] to-[#6366f1] bg-clip-text text-transparent">intelligent AI</span>
              <br className="hidden md:block" /> and real-world <span className="bg-gradient-to-br from-[#0d9488] to-[#14b8a6] bg-clip-text text-transparent">IoT systems</span> —<br className="hidden md:block" /> we build complete digital ecosystems.
            </h1>
            <p className="text-[#64748b] text-lg md:text-xl max-w-2xl mx-auto mb-10">
              No hidden fees. No surprises. Clear timelines and honest pricing.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium">
              <span className="flex items-center gap-2 bg-[#7c3aed]/[0.06] text-[#7c3aed] border border-[#7c3aed]/[0.15] px-4 py-1.5 rounded-full">
                <Check className="w-4 h-4" /> Custom solutions available
              </span>
              <span className="flex items-center gap-2 bg-[#7c3aed]/[0.06] text-[#7c3aed] border border-[#7c3aed]/[0.15] px-4 py-1.5 rounded-full">
                <Check className="w-4 h-4" /> Free consultation
              </span>
              <span className="flex items-center gap-2 bg-[#7c3aed]/[0.06] text-[#7c3aed] border border-[#7c3aed]/[0.15] px-4 py-1.5 rounded-full">
                <Check className="w-4 h-4" /> Flexible payment
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY TABS & 3. PRICING CARDS */}
      <section ref={tabsRef} className="py-12 px-4 relative z-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Tabs Container */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center p-1.5 border border-[#e5e7eb] rounded-full bg-[#f8fafc] shadow-sm">
              {categories.map((cat, idx) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveTab(idx)}
                  className={`relative px-6 md:px-8 py-3 rounded-full text-sm font-[600] transition-colors duration-300 z-10 ${getTabClasses(idx)}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {(isCatLoading || isPlanLoading) ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1,2,3].map(i => <div key={i} className="h-[400px] bg-slate-50 rounded-[20px] animate-pulse border border-slate-100" />)}
                </div>
              ) : categories.length > 0 ? (
                <>
                  <p className="text-center italic mb-12 text-slate-500 font-medium">
                    {categories[activeTab]?.tagline}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {plans.filter(p => p.categoryId?._id === categories[activeTab]?._id || p.categoryId === categories[activeTab]?._id).map((card, idx) => {
                      const style = themeStyles[card.theme] || themeStyles.purple;
                      return (
                        <motion.div
                          key={card._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={getCardClasses(card.theme, card.isPopular)}
                        >
                          {card.isPopular && (
                            <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                              <span className={cn("text-[10px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full text-white shadow-sm", style.badge)}>
                                MOST POPULAR
                              </span>
                            </div>
                          )}
                          {!card.isPopular && (
                            <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md mb-6 bg-[#f8fafc] text-[#64748b] border border-[#e5e7eb] w-fit">
                              {card.badge || 'PLAN'}
                            </span>
                          )}

                          <h3 className={`text-2xl font-[800] tracking-wide mb-2 text-[#0f172a] ${card.isPopular ? 'mt-4 lg:mt-2' : ''}`}>{card.title}</h3>
                          <p className="text-sm text-[#64748b] mb-6 pb-6 border-b border-[#e5e7eb]">
                            Best for: {card.subtitle}
                          </p>

                          <div className="mb-6">
                            <span className={cn("text-3xl md:text-4xl font-[800] tracking-tight", style.text)}>
                              {card.priceText}
                            </span>
                          </div>

                          <ul className="space-y-4 mb-8">
                            {card.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-3 text-sm text-[#475569] font-medium">
                                <Check className={cn("w-5 h-5 shrink-0", style.text)} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-auto">
                            <div className="text-sm text-[#64748b] mb-6 flex items-center gap-2 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" /> Timeline: {card.timeline}
                            </div>
                            <button 
                              onClick={() => {
                                const key = getPricingKey(card.title);
                                navigate('/contact', {
                                  state: {
                                    inquirySource: 'pricing',
                                    pricingPlan: card.title,
                                    pricingKey: key
                                  }
                                });
                              }}
                              className={cn(
                                "block w-full text-center py-3.5 rounded-[12px] font-semibold transition-all duration-300",
                                card.isPopular 
                                  ? `bg-gradient-to-br ${style.gradient} text-white shadow-md hover:scale-[1.02] hover:shadow-lg` 
                                  : "bg-white text-[#0f172a] border border-[#e5e7eb] hover:border-indigo-500 hover:text-indigo-600"
                              )}
                            >
                              {card.ctaText}
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. SMART SYSTEM PACKAGE (Premium Add-On) */}
      {smartPackage.active && (
        <section className="py-10 md:py-undefined px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[24px] p-8 md:p-12 overflow-hidden border border-[rgba(124,58,237,0.2)] shadow-sm"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(20,184,166,0.08))' }}>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-white text-[#7c3aed] text-xs font-bold tracking-widest rounded-full mb-6 border border-[#e9d5ff]">
                    ✦ PREMIUM ADD-ON
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0f172a]">{smartPackage.title}</h2>
                  <p className="text-[#64748b] text-lg mb-8 max-w-lg italic">
                    {smartPackage.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {smartPackage.tags?.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#e2e8f0]">
                        <span className={cn("w-2 h-2 rounded-full", ["bg-teal-500", "bg-purple-500", "bg-blue-500", "bg-orange-500", "bg-green-500"][i % 5])} />
                        <span className="text-sm font-medium text-[#1e293b]">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 text-center lg:text-right">
                  <div className="text-2xl font-semibold mb-6 text-[#0f172a] uppercase">{smartPackage.pricingText}</div>
                  <button 
                    onClick={() => navigate('/contact', {
                      state: {
                        inquirySource: 'pricing',
                        pricingPlan: smartPackage.title || 'Smart System Package',
                        pricingKey: 'smartSystemPackage'
                      }
                    })}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white shadow-[0_6px_20px_rgba(124,58,237,0.3)] rounded-full font-bold hover:scale-105 transition-transform duration-300"
                  >
                    {smartPackage.ctaText || "Book a Strategy Call"} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. GUIDED SELECTOR */}
      <section className="py-10 md:py-undefined px-4 relative z-10 bg-[#ffffff] overflow-hidden">
        {/* Soft grid & glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60 z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(124,58,237,0.06)] blur-[100px] rounded-full pointer-events-none z-0" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-[#0f172a] text-[clamp(21px,4vw,32px)] md:text-4xl font-[800] tracking-wide mb-4">Not sure what you need?</h2>
          <p className="text-[#64748b] text-lg mb-14">Tell us your goal and we'll suggest the right plan.</p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { 
                imageSrc: "/assets/images/pricing_web_app.png", 
                label: "WEB & APP",
                text: "I need a website / app", 
                tab: 0, 
                hoverBorder: "hover:border-[#6366f1] hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]", 
                glowColor: "bg-[rgba(99,102,241,0.12)]",
                hoverGlow: "group-hover:bg-[rgba(99,102,241,0.25)]"
              },
              { 
                imageSrc: "/assets/images/pricing_ai.png", 
                label: "AI AUTOMATION",
                text: "I want AI automation", 
                tab: 1, 
                hoverBorder: "hover:border-[#7c3aed] hover:shadow-[0_10px_30px_rgba(124,58,237,0.18)]", 
                glowColor: "bg-[rgba(124,58,237,0.15)]",
                hoverGlow: "group-hover:bg-[rgba(124,58,237,0.3)]"
              },
              { 
                imageSrc: "/assets/images/pricing_iot.png", 
                label: "IOT SYSTEMS",
                text: "I need IoT / smart systems", 
                tab: 2, 
                hoverBorder: "hover:border-[#14b8a6] hover:shadow-[0_10px_30px_rgba(20,184,166,0.18)]", 
                glowColor: "bg-[rgba(20,184,166,0.12)]",
                hoverGlow: "group-hover:bg-[rgba(20,184,166,0.25)]"
              }
            ].map((item, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => handleSelectTab(item.tab)}
                whileHover="hover"
                variants={{
                  hover: { scale: 1.02, y: -6 }
                }}
                className={`group relative bg-[rgba(255,255,255,0.75)] backdrop-blur-[12px] border border-black/[0.06] rounded-[20px] p-6 md:p-8 flex flex-col items-center justify-center gap-1 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-purple-400/30 active:ring-2 active:ring-purple-400/30 ${item.hoverBorder}`}
              >
                <div className="relative w-full h-[120px] sm:h-[140px] flex items-center justify-center mb-4">
                  {/* Glow Behind Illustration */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full blur-[35px] transition-colors duration-300 ${item.glowColor} ${item.hoverGlow}`} />
                  
                  {/* Illustration */}
                  <motion.img 
                    variants={{
                      hover: { scale: 1.05, y: -4 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    src={item.imageSrc} 
                    alt={item.label}
                    className="relative z-10 w-full h-full object-contain mix-blend-multiply" 
                  />
                </div>
                
                <span className="text-[12px] font-bold tracking-widest text-[#94a3b8] uppercase mt-2 mb-1">{item.label}</span>
                <span className="font-semibold text-lg text-[#0f172a]">{item.text}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CONVERSION STRIP */}
      <section className="py-10 md:py-undefined px-4 bg-[#f8fafc] border-y border-[#e2e8f0] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-8 text-[#0f172a]">Custom solutions available based on your requirements.</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/contact', {
                state: {
                  inquirySource: 'pricing',
                  pricingPlan: 'Free Consultation',
                  pricingKey: 'consultation'
                }
              })}
              className="px-8 py-3.5 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white rounded-full font-semibold shadow-[0_6px_20px_rgba(124,58,237,0.3)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all"
            >
              Book Free Consultation →
            </button>
            <Link to="/portfolio" className="px-8 py-3.5 bg-white text-[#0f172a] border border-[#e2e8f0] hover:border-[#7c3aed] hover:text-[#7c3aed] rounded-full font-semibold transition-all">
              View Our Work →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. MINI FAQ */}
      <div className="bg-[#ffffff] py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#7c3aed] mb-4">
            PRICING FAQ
          </span>
          <h2 className="text-3xl font-bold text-[#0f172a] mb-8">
            Common Questions
          </h2>
        </div>
        <FAQSection variant="mini" customFaqs={pricingFaqs} />
      </div>

      {/* 8. FINAL CTA */}
      <section className="py-10 md:py-undefined px-4 bg-white relative overflow-hidden border-t border-[#e2e8f0] z-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[rgba(124,58,237,0.06)] blur-[100px] rounded-full" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0f172a]">Ready to start your project?</h2>
          <p className="text-xl text-[#64748b] mb-10">Every great product starts with a conversation.</p>
          <button 
            onClick={() => navigate('/contact', {
              state: {
                inquirySource: 'pricing',
                pricingPlan: 'Free Consultation',
                pricingKey: 'consultation'
              }
            })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white rounded-full font-bold text-lg hover:scale-[1.02] shadow-[0_6px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] transition-all duration-300"
          >
            Book a Free Call <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
      
    </div>
  );
}
