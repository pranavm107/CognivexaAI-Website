import { FollowerPointerCard } from '@/components/ui/following-pointer';
import { PointerHighlight } from '@/components/ui/PointerHighlight';
import WhyWorkWithUs from '@/components/sections/WhyWorkWithUs';
import WorkingWithUsSection from '@/components/sections/WorkingWithUsSection';
import LifeAtEvolvex from '@/components/sections/LifeAtEvolvex';
import CareersCTA from '@/components/sections/CareersCTA';
import React from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { StatefulButton } from '@/components/ui/stateful-button';

const Careers = () => {
    // IntersectionObserver removed - animations handled by ScrollReveal

    return (
        <>
            {/* Careers Hero Section */}
            {/* New Full Screen Hero Section */}
            <section className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-violet-100 to-[#FFE8E9] overflow-hidden z-0">
                <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
    * { font-family: "Poppins", sans-serif; }
  `}</style>

                {/* Decorative Background Blur */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

                {/* Desktop Hero Image (Edge-to-Edge Breakout) */}
                <div className="hidden lg:block absolute right-[-20px] top-[63%] -translate-y-1/2 w-[50vw] h-[60vh] z-0">
                    <FollowerPointerCard title="Career Growth Zone" className="w-full h-full">
                        <img
                            className="w-full h-full object-cover object-center rounded-l-[20px] shadow-2xl"
                            src="/assets/images/Join-our-team1.png"
                            alt="Team meeting"
                        />
                    </FollowerPointerCard>
                </div>

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 pointer-events-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center h-full w-full">

                        {/* Left Column: Content */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 pb-10 lg:pb-0 w-full pointer-events-auto">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-gray-900 leading-[1.15] tracking-tight">
                                Join Our Team <br className="hidden lg:block" />
                                <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                                    Shaping the future.
                                </span>
                            </h1>

                            <div className="text-lg md:text-xl text-gray-700 mt-6 max-w-lg leading-relaxed">
                                At{' '}
                                <PointerHighlight
                                    containerClassName="inline-block"
                                    rectangleClassName="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                                    pointerClassName="text-blue-500"
                                >
                                    <span className="relative z-10">Evolvex</span>
                                </PointerHighlight>
                                , our engineers and designers build intelligent digital products and AI-powered solutions that help businesses grow faster, work smarter, and scale with confidence.
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center lg:justify-start">
                                <a href="/open-roles" className="px-8 py-4 rounded-full text-base font-medium text-white bg-gray-900 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer min-w-[160px] inline-flex justify-center items-center">
                                    Join our team
                                </a>

                                <a href="/open-roles" className="px-8 py-4 rounded-full text-base font-medium text-gray-800 bg-white/60 border border-white/60 hover:bg-white hover:border-white transition-all shadow-sm hover:shadow-md cursor-pointer min-w-[160px] inline-flex justify-center items-center">
                                    Explore Opportunities
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Hero Image (Mobile Only) */}
                        <div className="block lg:hidden order-1 flex justify-center items-center w-full pointer-events-auto">
                            <div className="w-full max-w-[520px] sm:max-w-[640px]">
                                <FollowerPointerCard title="Career Growth Zone">
                                    <img
                                        className="
              w-full
              h-[320px] sm:h-[420px] md:h-[480px]
              object-cover object-center
              rounded-3xl
              drop-shadow-2xl
            "
                                        src="/assets/images/Join-our-team1.png"
                                        alt="Team meeting"
                                    />
                                </FollowerPointerCard>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* Old Hero Section (Commented Out)
            <section className="relative py-[80px] lg:py-[140px] bg-white overflow-hidden" data-animate="fade-up">

                <div
                    className="absolute inset-0 bg-[radial-gradient(900px_400px_at_0%_0%,rgba(143,133,255,0.15),transparent_60%),radial-gradient(900px_400px_at_100%_0%,rgba(255,192,203,0.15),transparent_60%)] pointer-events-none">
                </div>

                <div
                    className="w-full max-w-[1200px] mx-auto px-5 relative mt-[180px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[60px] lg:gap-[80px] items-center text-center lg:text-left">

                    <div className="mx-auto lg:mx-0">
                        <h1 className="text-[40px] lg:text-[64px] font-bold leading-[1.1] text-[#111] mb-[24px]">
                            Join Our Team
                        </h1>

                        <p className="text-[16px] lg:text-[18px] leading-[1.6] text-[#555] mb-[40px] max-w-[580px] mx-auto lg:mx-0">
                            Work with a team that values innovation, collaboration, and excellence.
                            Shape the future of our platform while growing your career.
                        </p>

                        <div className="flex flex-wrap gap-[20px] justify-center lg:justify-start">
                            <a href="/open-roles"
                                className="inline-flex px-[48px] py-[14px] lg:px-[56px] lg:py-[16px] rounded-[12px] bg-gradient-to-r from-[#B455F3] to-[#3937F3] text-white text-[15px] font-semibold">
                                Apply Now
                            </a>

                            <a href="/open-roles"
                                className="group relative inline-flex p-[1.2px] rounded-[12px] bg-gradient-to-r from-[#B455F3] to-[#3937F3]">
                                <span className="block w-full h-full bg-white rounded-[10.5px] px-[30px] py-[12.5px] lg:px-[34px] lg:py-[14.5px]">
                                    <span className="bg-gradient-to-r from-[#B455F3] to-[#3937F3] bg-clip-text text-transparent text-[15px] font-semibold">
                                        Explore Opportunities
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <img src="/assets/images/Join-Our-Team.png" alt="Careers illustration showing job opportunities"
                            className="max-w-full w-[480px] lg:w-[540px] h-auto object-contain drop-shadow-lg" />
                    </div>

                </div>
            </section>
            */}

            {/* About Working With Us */}
            <WorkingWithUsSection />

            {/* Life At Evolvex Heading */}
            <section className="relative pt-[120px] pb-[40px] bg-[#FAFAFA] overflow-hidden">
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="relative text-center max-w-[920px] mx-auto">

                        {/* Background Text */}
                        <span
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2
        font-black tracking-widest
        bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-400
        bg-clip-text text-transparent
        opacity-[0.07] whitespace-nowrap select-none pointer-events-none z-0"
                            style={{ fontSize: 'clamp(60px, 15vw, 180px)', lineHeight: 1 }}
                        >
                            EXPERIENCE
                        </span>

                        {/* Foreground Heading */}
                        <div className="relative z-10">
                            <h2 className="text-[38px] md:text-[48px] lg:text-[64px]
          font-extrabold text-[#111] tracking-tight">
                                The Evolvex Experience
                            </h2>

                            <p className="mt-6 text-[18px] text-[#555] max-w-[720px] mx-auto leading-[1.7]">
                                Experience how innovation, growth, ownership, and balance come together
                                to shape meaningful work and impactful careers.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* Life at Evolvex */}
            <LifeAtEvolvex />



            {/* Why Join Us */}
            <section className="pt-[100px] lg:pt-[140px] pb-[60px] lg:pb-[80px] bg-white relative overflow-hidden"
                id="why-join-us">
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">

                    <div className="relative text-center max-w-[920px] mx-auto">

                        {/* Background Text */}
                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2
            font-black tracking-widest
            bg-gradient-to-r from-[#B2EBF2] via-[#D1C4E9] to-[#F8BBD0]
            bg-clip-text text-transparent
            opacity-50
            whitespace-nowrap select-none pointer-events-none z-0"
                            style={{ fontSize: 'clamp(60px, 15vw, 180px)', lineHeight: 1 }}>
                            WHY JOIN US?
                        </span>


                        <div className="relative z-20 flex flex-col items-center text-center px-4">
                            <ScrollReveal variant="heading">
                                <h1 className="text-[38.4px] md:text-[48px] lg:text-[64px]
                font-extrabold text-[#1a1a1a] mt-[12px]
                leading-[1.15] tracking-[0.2%]">
                                    Why Join Us?
                                </h1>

                                <div className="flex justify-center mt-[32px]">
                                    <svg width="96" height="12" viewBox="0 0 96 12" fill="none">
                                        <circle cx="6" cy="6" r="6" fill="url(#grad-dot)" />
                                        <rect x="22" y="0" width="74" height="12" rx="6" fill="url(#grad-pill)" />
                                        <defs>
                                            <linearGradient id="grad-dot" x1="0" x2="1">
                                                <stop offset="0" stopColor="#B2EBF2" />
                                                <stop offset="0.85" stopColor="#D1C4E9" />
                                                <stop offset="1" stopColor="#F8BBD0" />
                                            </linearGradient>
                                            <linearGradient id="grad-pill" x1="0" x2="1">
                                                <stop offset="0" stopColor="#84FFFF" />
                                                <stop offset="0.65" stopColor="#D1C4E9" />
                                                <stop offset="1" stopColor="#F8BBD0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <p
                                    className="text-[20px] lg:text-[20px] leading-[1.8] text-[#555] mt-[20px] text-center max-w-[780px] mx-auto relative z-10">
                                    We believe in empowering talented individuals to reach their full potential. <br></br> At Evolvex, you will find opportunities to learn, lead, and make a lasting impact.
                                </p>
                            </ScrollReveal>

                        </div>
                    </div>
                </div>
                {/* Why Join Us – Feature Cards */}
                <WhyWorkWithUs />
            </section>



            {/* Careers CTA */}
            {/* CTA */}
            <section className="relative -mt-[40px] lg:-mt-[60px] z-10">
                <CareersCTA />
            </section>

            {/* Apply Now */}
            <section className="py-[120px] relative" id="apply-now">
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">

                    {/* Section Heading */}
                    <div className="relative text-center max-w-[920px] mx-auto">

                        {/* Background Text */}
                        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2
            font-black tracking-widest
            bg-gradient-to-r from-[#B2EBF2] via-[#D1C4E9] to-[#F8BBD0]
            bg-clip-text text-transparent
            opacity-50
            whitespace-nowrap select-none pointer-events-none z-0"
                            style={{ fontSize: 'clamp(50px, 12vw, 140px)', lineHeight: 1 }}>
                            APPLY NOW
                        </span>


                        <ScrollReveal variant="heading" className="relative z-20 flex flex-col items-center text-center px-4">

                            <h1 className="text-[34px] md:text-[48px] lg:text-[64px]
              font-extrabold text-[#1a1a1a] mb-[12px] mt-[-5px]
              leading-[1.15] tracking-[0.4%]">
                                Apply Now
                            </h1>
                        </ScrollReveal>
                    </div>

                    {/* Content Grid */}
                    <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[64px] mt-[60px] items-center">

                        {/* Illustration */}
                        <ScrollReveal variant="featureLeft" className="flex justify-center lg:justify-end lg:-translate-x-[60px] lg:-translate-y-[60px]">
                            <img src="/assets/images/apply-now-illustration.png" alt="Job application illustration"
                                className="w-full max-w-[800px] block drop-shadow-lg" />
                        </ScrollReveal>

                        {/* Application Form */}
                        <ScrollReveal variant="featureRight" className="w-full">
                            <form className="max-w-[440px] w-full mx-auto md:mx-0">

                                <div className="mb-[24px]">
                                    <label htmlFor="fullName" className="block text-[14px] font-bold text-[#111] mb-[8px]">Full Name</label>
                                    <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required
                                        className="w-full p-[14px_16px] text-[15px] rounded-[10px] border-[1.5px] border-[#cfc7ff]/60 outline-none transition-all duration-300 font-inherit hover:border-[#6f5cf6] focus:border-[#6f5cf6] focus:shadow-[0_0_0_4px_rgba(111,92,246,0.1)] placeholder:text-[#999]" />
                                </div>

                                <div className="mb-[24px]">
                                    <label htmlFor="email" className="block text-[14px] font-bold text-[#111] mb-[8px]">Email</label>
                                    <input type="email" id="email" name="email" placeholder="Enter your email address" required
                                        className="w-full p-[14px_16px] text-[15px] rounded-[10px] border-[1.5px] border-[#cfc7ff]/60 outline-none transition-all duration-300 font-inherit hover:border-[#6f5cf6] focus:border-[#6f5cf6] focus:shadow-[0_0_0_4px_rgba(111,92,246,0.1)] placeholder:text-[#999]" />
                                </div>

                                <div className="mb-[24px]">
                                    <label htmlFor="phone" className="block text-[14px] font-bold text-[#111] mb-[8px]">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" placeholder="Your contact number"
                                        className="w-full p-[14px_16px] text-[15px] rounded-[10px] border-[1.5px] border-[#cfc7ff]/60 outline-none transition-all duration-300 font-inherit hover:border-[#6f5cf6] focus:border-[#6f5cf6] focus:shadow-[0_0_0_4px_rgba(111,92,246,0.1)] placeholder:text-[#999]" />
                                </div>

                                <div className="mb-[24px]">
                                    <label htmlFor="interest" className="block text-[14px] font-bold text-[#111] mb-[8px]">Area of Interest</label>
                                    <input type="text" id="interest" name="interest" placeholder="e.g. Backend Developer"
                                        className="w-full p-[14px_16px] text-[15px] rounded-[10px] border-[1.5px] border-[#cfc7ff]/60 outline-none transition-all duration-300 font-inherit hover:border-[#6f5cf6] focus:border-[#6f5cf6] focus:shadow-[0_0_0_4px_rgba(111,92,246,0.1)] placeholder:text-[#999]" />
                                </div>

                                <div className="mb-[24px]">
                                    <label htmlFor="coverLetter" className="block text-[14px] font-bold text-[#111] mb-[8px]">Cover Letter</label>
                                    <textarea id="coverLetter" name="coverLetter" rows="4" placeholder="Write your cover letter here"
                                        className="w-full p-[14px_16px] text-[15px] rounded-[10px] border-[1.5px] border-[#cfc7ff]/60 outline-none transition-all duration-300 font-inherit hover:border-[#6f5cf6] focus:border-[#6f5cf6] focus:shadow-[0_0_0_4px_rgba(111,92,246,0.1)] placeholder:text-[#999] resize-none"></textarea>
                                </div>

                                {/* Resume Upload - Styled to match Figma */}
                                <div className="mt-[12px] mb-[32px]">
                                    <label
                                        className="group flex items-center w-full p-[14px_16px] rounded-[10px] border-[1.5px] border-[#cfc7ff]/60 cursor-pointer transition-all duration-300 hover:border-[#6C4CF4] hover:bg-[#fcfbff]">
                                        <input type="file" name="resume" accept=".pdf,.doc,.docx" hidden />
                                        <div className="w-[32px] h-[32px] flex items-center justify-center mr-[12px]">
                                            <img src="/assets/svg/attachment.svg" alt="Attachment" className="w-30 h-30" />
                                        </div>
                                        <span className="text-[14px] text-[#000000] font-medium group-hover:text-[#6C4CF4] transition-colors">Upload your resume (PDF/DOC)</span>
                                    </label>
                                </div>

                                <StatefulButton
                                    className="w-full h-[48px] inline-flex items-center justify-center rounded-[8px] bg-gradient-to-r from-[#B455F3] to-[#393AF3] text-white text-[16px] font-bold shadow-[0_4px_14px_rgba(108,76,244,0.3)] transition-transform duration-200 hover:scale-[1.02]"
                                    onClick={(e) => { e.preventDefault(); return new Promise(resolve => setTimeout(resolve, 3000)); }}
                                >
                                    Submit Application
                                </StatefulButton>

                            </form>
                        </ScrollReveal>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Careers;
