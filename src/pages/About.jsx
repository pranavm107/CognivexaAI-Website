import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import OurStorySection from '../components/sections/OurStorySection';
import WhyBusinessesChoose from '../components/sections/WhyBusinessesChoose';
import FoundersSection from '../components/sections/FoundersSection';
import TeamsSection from '../components/sections/TeamsSection';
import { FollowerPointerCard } from '../components/ui/following-pointer';
import { CardSpotlight } from '../components/ui/card-spotlight';
import Testimonials from '../components/sections/Testimonials';
import ScrollReveal from '../components/ui/ScrollReveal';
import { StatefulButton } from '../components/ui/stateful-button';
import ContactSection from '../components/sections/ContactSection';


const About = () => {
    // IntersectionObserver removed - animations handled by ScrollReveal

    return (
        <>
            {/* About Hero */}
            <section className="py-10 md:py-undefined lg:py-[120px] pb-16 lg:pb-[100px] bg-white mt-8 md:mt-12">
                <div
                    className="w-full px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[60px] lg:gap-[80px] items-center text-center lg:text-left">

                    {/* Left Content */}
                    <ScrollReveal variant="featureLeft" className="mx-auto">
                        <h1 className="text-[clamp(36px,4vw,56px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-[24px]">
                            Engineering Intelligent Systems
                            <br></br>for Modern Businesses
                        </h1>

                        <p className="text-[clamp(13px,4vw,20px)] leading-[1.7] text-[#4A4A4A] mb-[36px]">
                            We design and build scalable AI-powered solutions that simplify complexity,<br></br>
                            automate operations, and drive measurable growth. Our team focuses on<br></br>
                            combining engineering precision with intelligent automation to create systems<br></br>
                            that are reliable, efficient, and future-ready.
                        </p>

                        <Link to="/contact" state={{ scrollToContact: true }}
                            className="inline-block px-[32px] py-[16px] text-[15px] font-semibold text-white rounded-[10px] bg-gradient-to-r from-[#B455F3] to-[#393AF3] shadow-[0_10px_28px_rgba(111,90,247,0.35)] transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(111,90,247,0.45)]">
                            Start Your Project
                        </Link>
                    </ScrollReveal>

                    {/* Right Visual */}
                    <ScrollReveal variant="featureRight" className="flex justify-center items-center">
                        <img src="/assets/images/abstract.png" alt="Abstract digital innovation visual" loading="eager"
                            className="w-full max-w-[480px] h-auto drop-shadow-2xl" />
                    </ScrollReveal>

                </div>
            </section>

            {/* Our Story Section - Redesigned Narrative */}
            {/* Our Story Section - Premium Corporate Version */}
            <OurStorySection />

            {/* Mission & Vision Section */}
            <section className="relative py-28 bg-white overflow-hidden" id="mission-vision">
                {/* 2. Floating Light Background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                    bg-gradient-to-r from-[#5B8CFF]/10 via-[#7C5CFF]/10 to-[#B84CFF]/10 blur-[140px] rounded-full"/>
                </div>

                <div className="max-w-6xl mx-auto px-6">
                    {/* 1. Soft Gradient Divider Line */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#7C5CFF]/40 to-transparent mb-16" />

                    {/* Header */}
                    <div className="text-center mb-20 relative z-10">
                        <p className="text-center text-sm md:text-base tracking-[0.25em] font-semibold 
text-[#7C5CFF] mb-8 uppercase">
                            OUR DIRECTION
                        </p>
                        {/* 5. Headline Underline Accent */}
                        <h2 className="relative inline-block text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Mission and Vision
                            <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-gradient-to-r from-[#5B8CFF] via-[#7C5CFF] to-[#B84CFF] rounded-full" />
                        </h2>
                        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
                            Clear direction. Strong execution. Long-term impact.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full relative z-10">
                        {/* Mission Card - Slide Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 w-full md:flex-1 relative z-10"
                        >
                            {/* 6. Micro Glow on Title */}
                            <p className="text-xs tracking-[0.3em] font-semibold text-[#7C5CFF] uppercase mb-3">
                                MISSION
                            </p>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-5">
                                Delivering Systems That Enable Sustainable Growth
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To build intelligent, scalable digital systems that simplify business operations and enable sustainable growth.
                            </p>
                        </motion.div>

                        {/* Spring Connector */}
                        <div className="hidden md:flex flex-shrink-0 -mx-12 z-0">
                            <div className="relative w-[160px]">
                                <img src="/assets/svg/spring.svg" alt="" className="w-full h-auto object-contain" />
                                <div className="absolute inset-0 bg-[#8000FF]" style={{
                                    mixBlendMode: 'overlay',
                                    maskImage: 'url("/assets/svg/spring.svg")',
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    WebkitMaskImage: 'url("/assets/svg/spring.svg")',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center'
                                }}></div>
                            </div>
                        </div>

                        {/* Vision Card - Slide Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 w-full md:flex-1 relative z-10"
                        >
                            {/* 6. Micro Glow on Title */}
                            <p className="text-xs tracking-[0.3em] font-semibold text-[#7C5CFF] uppercase mb-3">
                                VISION
                            </p>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-5">
                                Becoming a Trusted Technology Partner
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To become a trusted technology partner for businesses looking to integrate AI and automation into their core operations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= SPECIALIZED TEAMS SECTION ================= */}
            <TeamsSection variant="full" />

            {/* ================= FOUNDERS SECTION ================= */}
            {/* 🔒 TEMP DISABLED: Founders Section (Will be re-enabled later) */}
            {false && <FoundersSection variant="full" />}


            {/* ================= OUR PROMISE SECTION ================= */}
            <Testimonials />
            
            {/* Our Values Section */}
            <section
                className="py-[100px] lg:py-[130px] bg-[#f5f6fa]"
                id="our-values"
            >
                <div className="text-center mb-[60px] lg:mb-[80px]">
                    <ScrollReveal variant="heading">
                        <h2 className="text-[clamp(21px,4vw,32px)] lg:text-[clamp(29px,4vw,44px)] font-extrabold text-[#111]">
                            Our Values
                        </h2>
                    </ScrollReveal>
                </div>
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[90px] items-center">


                        {/* LEFT: Cards */}
                        <div className="relative">
                            {/* subtle background blocks like reference */}
                            <div
                                className="hidden lg:block absolute -top-[28px] -left-[28px] w-[180px] h-[180px] bg-[#efe9ff] rounded-[24px]"
                                aria-hidden="true"
                            />
                            <div
                                className="hidden lg:block absolute -bottom-[28px] -right-[28px] w-[220px] h-[220px] bg-[#efe9ff] rounded-[24px]"
                                aria-hidden="true"
                            />

                            <FollowerPointerCard title="CognivexaAI">
                                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-[26px]">
                                    {/* Card 1 */}
                                    <CardSpotlight
                                        color="#efe9ff"
                                        className="bg-white border-0 rounded-[18px] shadow-[0_18px_40px_rgba(17,17,17,0.10)] p-[28px] transition-transform duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#efe9ff] flex items-center justify-center mb-[18px] relative z-20">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 2V5"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M12 19V22"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M4.22 4.22L6.34 6.34"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M17.66 17.66L19.78 19.78"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M2 12H5"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M19 12H22"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M4.22 19.78L6.34 17.66"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M17.66 6.34L19.78 4.22"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M9 14.2C7.4 13.3 6.5 11.5 7.1 9.5C7.7 7.4 9.7 6 12 6C14.3 6 16.3 7.4 16.9 9.5C17.5 11.5 16.6 13.3 15 14.2V16C15 16.6 14.6 17 14 17H10C9.4 17 9 16.6 9 16V14.2Z"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-[18px] font-bold text-[#111] mb-[10px] relative z-20">
                                            Innovation with Purpose
                                        </h3>
                                        <p className="text-[14px] leading-[1.8] text-[#555] relative z-20">
                                            We apply modern technology to solve real business problems.
                                        </p>
                                    </CardSpotlight>

                                    {/* Card 2 */}
                                    <CardSpotlight
                                        color="#efe9ff"
                                        className="bg-white border-0 rounded-[18px] shadow-[0_18px_40px_rgba(17,17,17,0.10)] p-[28px] transition-transform duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#efe9ff] flex items-center justify-center mb-[18px] relative z-20">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 20H21"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L8 18L3 19L4 14L16.5 3.5Z"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-[18px] font-bold text-[#111] mb-[10px] relative z-20">
                                            Engineering Excellence
                                        </h3>
                                        <p className="text-[14px] leading-[1.8] text-[#555] relative z-20">
                                            We prioritize clean architecture, performance, and reliability.
                                        </p>
                                    </CardSpotlight>

                                    {/* Card 3 */}
                                    <CardSpotlight
                                        color="#efe9ff"
                                        className="bg-white border-0 rounded-[18px] shadow-[0_18px_40px_rgba(17,17,17,0.10)] p-[28px] transition-transform duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#efe9ff] flex items-center justify-center mb-[18px] relative z-20">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 2L20 6V12C20 17 16.5 20.5 12 22C7.5 20.5 4 17 4 12V6L12 2Z"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M9 12L11 14L15 10"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-[18px] font-bold text-[#111] mb-[10px] relative z-20">
                                            Transparency
                                        </h3>
                                        <p className="text-[14px] leading-[1.8] text-[#555] relative z-20">
                                            We communicate clearly and deliver with accountability.
                                        </p>
                                    </CardSpotlight>

                                    {/* Card 4 */}
                                    <CardSpotlight
                                        color="#efe9ff"
                                        className="bg-white border-0 rounded-[18px] shadow-[0_18px_40px_rgba(17,17,17,0.10)] p-[28px] transition-transform duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="w-[52px] h-[52px] rounded-full bg-[#efe9ff] flex items-center justify-center mb-[18px] relative z-20">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3 17L9 11L13 15L21 7"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M17 7H21V11"
                                                    stroke="#7b4dff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-[18px] font-bold text-[#111] mb-[10px] relative z-20">
                                            Scalability First
                                        </h3>
                                        <p className="text-[14px] leading-[1.8] text-[#555] relative z-20">
                                            We build systems that grow with your business.
                                        </p>
                                    </CardSpotlight>
                                </div>
                            </FollowerPointerCard>
                        </div>

                        {/* RIGHT: About Content */}
                        <div className="max-w-[520px]">
                            <p className="text-[12px] tracking-[0.35em] text-[#7b4dff] font-semibold mb-[16px]">
                                OUR VALUES
                            </p>

                            <h2 className="text-[clamp(22px,4vw,34px)] lg:text-[clamp(33px,4vw,50px)] font-extrabold text-[#111] leading-[1.05] mb-[18px]">
                                Built for Precision and Scale
                            </h2>

                            <p className="text-[15px] lg:text-[16px] leading-[1.85] text-[#555]">
                                Our approach is rooted in technical discipline and purposeful innovation. We prioritize structural integrity and long-term value, ensuring that every solution we deliver is not just functional, but a foundation for future growth.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Why Businesses Choose CognivexaAI */}
            <WhyBusinessesChoose />

            {/* Final CTA Section */}
            <section className="py-10 md:py-undefined px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center py-10 md:py-undefined px-8 rounded-[2rem] bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-6 md:p-undefined -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    
                    <div className="relative z-10">
                        <ScrollReveal variant="heading">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let’s Build Something Meaningful</h2>
                        </ScrollReveal>
                        
                        <ScrollReveal variant="text">
                            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
                                We are currently working with select clients and giving dedicated attention to every project.
                            </p>
                        </ScrollReveal>
                        
                        <ScrollReveal variant="button">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/contact" 
                                    className="bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg">
                                    Start Your Project
                                </Link>
                                <Link to="/contact" 
                                    className="border border-white/40 hover:border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 active:scale-95 transition-all">
                                    Book a Free Call
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Final Contact Section */}
            <ContactSection />
        </>
    );
};

export default About;
