import React, { useEffect, useState } from 'react';
import Squares from '../components/ui/Squares';
import ScrollReveal from '../components/ui/ScrollReveal';
import { StatefulButton } from '../components/ui/stateful-button';

const OpenRoles = () => {
    // IntersectionObserver removed - animations handled by ScrollReveal


    const [visibleCount, setVisibleCount] = useState(6);

    const jobs = [
        {
            title: "Frontend Developer",
            type: "FULL-TIME",
            exp: "0–1 Yrs",
            salary: "₹4.5 – ₹7 LPA",
            desc: "Designs and implements engaging, responsive web interfaces for a seamless user experience.",
            skills: ["React", "HTML / CSS", "JavaScript", "+3 more"],
            location: "Pollachi, India",
            link: "frontend",
            isIntern: false
        },
        {
            title: "Backend Developer",
            type: "FULL-TIME",
            exp: "0–1 Yrs",
            salary: "₹4.5 – ₹7 LPA",
            desc: "Develops and maintains server-side logic, databases, and APIs for smooth application performance.",
            skills: ["Node.js", "Python", "API Development", "+3 more"],
            location: "Pollachi, India",
            link: "backend",
            isIntern: false
        },
        {
            title: "React Native Developer",
            type: "FULL-TIME",
            exp: "0–1 Yrs",
            salary: "₹4.5 – ₹7 LPA",
            desc: "Builds high-performance mobile apps for iOS and Android.",
            skills: ["React Native", "JavaScript", "REST APIs", "+3 more"],
            location: "Pollachi, India",
            link: "rn",
            isIntern: false
        },
        {
            title: "AI / ML Engineer",
            type: "FULL-TIME",
            exp: "0–1 Yrs",
            salary: "₹4.5 – ₹7 LPA",
            desc: "Develops AI and machine learning models to solve complex problems and drive insights.",
            skills: ["Python", "Machine Learning", "Deep Learning", "+3 more"],
            location: "Pollachi, India",
            link: "aiml",
            isIntern: false
        },
        {
            title: "UI / UX Designer",
            type: "FULL-TIME",
            exp: "0–1 Yrs",
            salary: "₹4.5 – ₹7 LPA",
            desc: "Creates intuitive, visually appealing interfaces and improves overall user experience.",
            skills: ["Figma", "Wireframing", "Prototyping", "+3 more"],
            location: "Pollachi, India",
            link: "uiux",
            isIntern: false
        },
        {
            title: "Test Engineer Intern",
            type: "INTERNSHIP",
            stipend: "₹6,000",
            desc: "Assists in testing software features, identifying basic defects, and supporting QA activities.",
            location: "Remote / Hybrid",
            link: "test-intern",
            isIntern: true
        },
        {
            title: "DevOps Engineer",
            type: "FULL-TIME",
            exp: "1–3 Yrs",
            salary: "₹6 – ₹10 LPA",
            desc: "Manages infrastructure, CI/CD pipelines, and ensures system reliability and scalability.",
            skills: ["AWS", "Docker", "Kubernetes", "+3 more"],
            location: "Remote / Hybrid",
            link: "devops",
            isIntern: false
        },
        {
            title: "Cloud Architect",
            type: "FULL-TIME",
            exp: "2–4 Yrs",
            salary: "₹8 – ₹15 LPA",
            desc: "Designs and oversees the implementation of cloud computing strategies and cloud systems.",
            skills: ["Azure", "AWS", "Cloud Security", "+3 more"],
            location: "Pollachi, India",
            link: "cloud",
            isIntern: false
        }
    ];

    const handleViewAll = (e) => {
        e.preventDefault();
        setVisibleCount(jobs.length);
    };

    return (
        <>
            {/* Hero Section */}
            <section
                className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[linear-gradient(135deg,#eef6ff_0%,#f6f3ff_45%,#fff6f8_100%)]"
                aria-label="Open roles hero"
            >
                {/* Background Gradients */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[30%] left-[10%] w-[1200px] max-w-full h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(173,216,255,0.45),transparent_60%)]" />
                    <div className="absolute top-[20%] right-[-10%] w-[1200px] max-w-full h-[600px] bg-[radial-gradient(closest-side,rgba(255,200,230,0.45),transparent_60%)]" />
                </div>

                {/* ✅ Squares FULL EDGE-TO-EDGE */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none md:pointer-events-auto">
                    <Squares
                        speed={0.15}
                        squareSize={70}
                        direction="down"
                        borderColor="#e7e3ff"
                        hoverFillColor="#6c4cf4"
                    />
                </div>

                {/* ✅ Content wrapper (only content max width) */}
                <div className="relative z-10 w-full">
                    <div className="mx-auto w-full max-w-[1200px] px-5 grid grid-cols-1 items-center">
                        <ScrollReveal variant="heading" className="max-w-[720px] mx-auto lg:mx-0 text-center lg:text-left">
                            <h1 className="text-[38px] md:text-[48px] lg:text-[56px] font-extrabold leading-[1.15] text-[#121212] mb-[24px]">
                                Explore Opportunities at <br className="hidden md:block" /> Evolvex AI
                            </h1>

                            <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#4a4a4a] max-w-[640px] mx-auto lg:mx-0 mb-[36px]">
                                Join our mission to build intelligent, scalable and human-first digital solutions.
                                Discover roles that match your passion and expertise.
                            </p>

                            <a
                                href="#roles-list"
                                className="inline-flex items-center justify-center px-[32px] py-[14px] text-[15px] font-semibold rounded-[12px] text-white bg-gradient-to-br from-[#B455F3] to-[#3937F3] shadow-[0_10px_25px_rgba(106,76,255,0.35)] transition-transform duration-250 hover:-translate-y-[3px] hover:shadow-[0_16px_35px_rgba(106,76,255,0.45)]"
                            >
                                View Current Openings
                            </a>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Open Positions List */}
            <section className="py-[100px]" id="open-positions">
                <div className="w-full max-w-[1200px] mx-auto px-5">

                    <header className="text-center mb-[56px]">
                        <h2 className="text-[28px] md:text-[36px] font-bold text-[#111] mb-[12px]">Current Open Positions</h2>
                        <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#555] max-w-[600px] mx-auto">
                            We are looking for talented and motivated individuals to join our growing team.
                            Explore the openings below and apply to be part of our journey.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[32px] justify-center" id="roles-list">

                        {jobs.slice(0, visibleCount).map((job, index) => (
                            <article key={index}
                                className="w-full h-full min-h-[299px] bg-[#F8F2FC] border border-[#EFE2F8] rounded-[10px] p-[20px_22px] flex flex-col justify-between transition-all duration-250 hover:-translate-y-[4px] hover:shadow-[0_12px_30px_rgba(104,56,205,0.12)]">
                                <div>
                                    <h3 className="text-[18px] font-semibold text-[#1E1E1E] mb-[10px]">{job.title}</h3>

                                    <div className="flex items-center flex-wrap gap-[10px] mb-[12px]">
                                        <span
                                            className={`text-[12px] font-semibold p-[4px_8px] rounded-[4px] tracking-[0.4px] ${job.isIntern ? 'bg-[#E7F8EA] text-[#08A02C]' : 'bg-[#F1E0FF] text-[#8300B3]'}`}>
                                            {job.type}
                                        </span>
                                        {!job.isIntern && (
                                            <>
                                                <span className="flex items-center gap-[6px] text-[13px] text-[#6B6B6B]">
                                                    <img src="/assets/svg/briefcase.svg" alt="Experience" className="w-[16px] h-[16px]" />
                                                    {job.exp}
                                                </span>
                                                <span className="flex items-center gap-[6px] text-[13px] text-[#6B6B6B]">
                                                    <img src="/assets/svg/wallet.svg" alt="Salary" className="w-[16px] h-[16px]" />
                                                    {job.salary}
                                                </span>
                                            </>
                                        )}
                                        {job.isIntern && (
                                            <span className="text-[13px] text-[#6B6B6B]">Stipend: {job.stipend}</span>
                                        )}
                                    </div>

                                    <p className="text-[14px] leading-[1.6] text-[#555] mb-[12px]">
                                        {job.desc}
                                    </p>

                                    {!job.isIntern && (
                                        <div className="flex flex-wrap gap-[8px] mb-[14px]">
                                            {job.skills.map((skill, i) => (
                                                <span key={i} className="text-[12px] p-[4px_10px] rounded-[14px] bg-[#EEEAF7] text-[#555]">{skill}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="w-full h-[1px] bg-[#EFE2F8] mb-[16px]"></div>
                                    <div className="text-[13px] text-gray-500 mb-[16px] flex items-center gap-[6px]">
                                        <img src="/assets/svg/MapPin.svg" alt="Location" className="w-[14px] h-[14px]" />
                                        {job.location}
                                    </div>

                                    <div className="flex gap-[38px]">
                                        <a href={`/job-details?role=${job.link}`}
                                            className="inline-flex items-center justify-center w-[137px] h-[39px] text-[14px] font-semibold rounded-[4px] bg-transparent text-[#6838CD] border border-[#6838CD] hover:opacity-90">View
                                            details</a>
                                        <a href={`/job-details?role=${job.link}`}
                                            className="inline-flex items-center justify-center w-[137px] h-[39px] text-[14px] font-semibold rounded-[4px] bg-[#6838CD] text-white border-none hover:opacity-90">Apply
                                            now</a>
                                    </div>
                                </div>
                            </article>
                        ))}

                    </div>

                    <div className="text-center mt-[48px]">
                        {visibleCount < jobs.length && (
                            <button onClick={handleViewAll} className="text-[16px] font-semibold text-[#6838CD] hover:underline">
                                View all
                            </button>
                        )}
                    </div>

                </div>
            </section>

            {/* End Note */}
            <section className="py-[60px] md:py-[80px] bg-white">
                <div className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 my-10'>
                    <div className="flex flex-col text-center items-center justify-center gap-6 px-4 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
                        <h2 className="text-[22px] md:text-[28px] font-bold text-[#1a1a1a] mb-[8px]">
                            Thank you for exploring our current opportunities.
                        </h2>
                        <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#4a4a4a] max-w-[720px] mx-auto">
                            If you did not find a suitable position today, we encourage you <br className="hidden md:block" /> to stay
                            connected and reach out to us for future openings.
                        </p>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-[96px] bg-white relative overflow-hidden" aria-labelledby="contact-heading">
                <div className="w-full max-w-[1200px] mx-auto px-5 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal variant="featureLeft">
                            <header className="mb-[40px]">
                                <h2 id="contact-heading" className="text-[40px] lg:text-[48px] font-medium text-[#6C4CF0] mb-6 leading-tight">
                                    Contact Us</h2>
                                <p className="text-[#494949] text-[20px] leading-[1.6]">We are here to assist you with services, <br />
                                    collaborations, or general inquiries.Our team <br /> responds within 24 hours.</p>
                            </header>
                            <ul className="space-y-8">
                                <li className="flex items-start" style={{ gap: '45px' }}>
                                    <div className="w-6 h-6 flex items-center justify-center text-[#6C4CF0] shrink-0 mt-1">
                                        <img src="/assets/svg/Mail.svg" alt="Email" className="w-6 h-6 object-contain" />
                                    </div>
                                    <div>
                                        <span className="block text-[#000000] text-[20px] font-regular">contact@evolvex.ai</span>
                                    </div>
                                </li>
                                <li className="flex items-start" style={{ gap: '45px' }}>
                                    <div className="w-6 h-6 flex items-center justify-center text-[#6C4CF0] shrink-0 mt-1">
                                        <img src="/assets/svg/Location-.svg" alt="Location" className="w-6 h-6 object-contain" />
                                    </div>
                                    <div>
                                        <span className="block text-[#000000] text-[20px] font-regular">venketasa colony, Pollachi<br />Coimbatore
                                            - 642000</span>
                                    </div>
                                </li>
                                <li className="flex items-start" style={{ gap: '45px' }}>
                                    <div className="w-6 h-6 flex items-center justify-center text-[#6C4CF0] shrink-0 mt-1">
                                        <img src="/assets/svg/Mobile.svg" alt="Phone" className="w-6 h-6 object-contain" />
                                    </div>
                                    <div>
                                        <span className="block text-[#000000] text-[20px] font-regular">+91 123 654 7890</span>
                                    </div>
                                </li>
                            </ul>
                        </ScrollReveal>
                        <ScrollReveal variant="featureRight" className="relative mt-8 lg:mt-0 lg:h-[600px] flex items-center">
                            <form action="#" method="post" className="space-y-5 w-full max-w-[480px] relative z-20">
                                <div>
                                    <input type="text" placeholder="Name"
                                        className="w-full h-[56px] px-6 py-4 rounded-[8px] border border-[#D8D8D8] bg-transparent hover:border-[#6C4CF4] focus:border-[#6C4CF0] focus:ring-4 focus:ring-[#6C4CF0]/10 outline-none transition-all placeholder:text-gray-400 text-[#494949] text-[16px] mt-6"
                                        required />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email"
                                        className="w-full h-[56px] px-6 py-4 rounded-[8px] border border-[#D8D8D8] bg-transparent hover:border-[#6C4CF4] focus:border-[#6C4CF0] focus:ring-4 focus:ring-[#6C4CF0]/10 outline-none transition-all placeholder:text-gray-400 text-[#494949] text-[16px] mt-6"
                                        required />
                                </div>
                                <div>
                                    <input type="tel" placeholder="Phone"
                                        className="w-full h-[56px] px-6 py-4 rounded-[8px] border border-[#D8D8D8] bg-transparent hover:border-[#6C4CF4] focus:border-[#6C4CF0] focus:ring-4 focus:ring-[#6C4CF0]/10 outline-none transition-all placeholder:text-gray-400 text-[#494949] text-[16px] mt-6" />
                                </div>
                                <div>
                                    <textarea rows="4" placeholder="Send Us a Message"
                                        className="w-full px-6 py-4 rounded-[8px] border border-[#D8D8D8] bg-transparent hover:border-[#6C4CF4] focus:border-[#6C4CF0] focus:ring-4 focus:ring-[#6C4CF0]/10 outline-none transition-all placeholder:text-gray-400 text-[#494949] resize-none text-[16px] mt-6"></textarea>
                                </div>
                                <div className="relative">
                                    <StatefulButton
                                        className="w-full h-[64px] px-6 py-4 rounded-[6px] text-white font-medium text-[17.6px] mt-6 shadow-lg transition-all hover:opacity-90 flex items-center justify-center gap-3 relative overflow-hidden"
                                        style={{ background: 'linear-gradient(90deg, #135AC6 0%, #6C4CF4 100%)' }}
                                        onClick={(e) => { e.preventDefault(); return new Promise(resolve => setTimeout(resolve, 3000)); }}
                                    >
                                        Submit
                                    </StatefulButton>
                                    <img src="/assets/svg/letter_send.svg" alt=""
                                        className="absolute left-1/2 -translate-x-1/2 top-[20px] w-[240px] h-[112px] object-contain pointer-events-none z-50 filter brightness-0 invert" />
                                </div>
                            </form>
                            <div
                                className="pointer-events-none absolute w-[480px] md:w-[600px] h-[300px] top-1/2 -right-[60px] lg:-right-[40px] z-10 hidden md:block mt-8"
                                style={{ transform: 'translate(24%, -50%)' }}>
                                <img src="/assets/images/Contact Us.png" alt="Contact Us 3D Illustration"
                                    className="w-full h-auto object-contain opacity-100" />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OpenRoles;
