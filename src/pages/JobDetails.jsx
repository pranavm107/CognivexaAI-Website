import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ScrollReveal from '../components/ui/ScrollReveal';
import { StatefulButton } from '../components/ui/stateful-button';

const JobDetails = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const roleParam = query.get('role');

    const [jobTitle, setJobTitle] = useState('Frontend Developer');

    useEffect(() => {
        const titleMap = {
            frontend: 'Frontend Developer',
            backend: 'Backend Developer',
            rn: 'React Native Developer',
            aiml: 'AI/ML Engineer'
        };

        if (roleParam && titleMap[roleParam]) {
            setJobTitle(titleMap[roleParam]);
        }
    }, [roleParam]);

    // IntersectionObserver removed - animations handled by ScrollReveal

    return (
        <>
            {/* Breadcrumb */}
            <section className="bg-[#f4f4f4] py-[12px] text-[13px] text-[#6b6b6b]">
                <div className="w-full px-5 flex items-center gap-[8px]">
                    <Link to="/careers" className="hover:text-[#6838CD] transition-colors">Careers</Link>
                    <span>›</span>
                    <Link to="/open-roles" className="hover:text-[#6838CD] transition-colors">Explore Opportunities</Link>
                    <span>›</span>
                    <span>Job Detail</span>
                </div>
            </section>

            {/* Hero Banner */}
            <ScrollReveal variant="heading" className="bg-gradient-to-br from-[#b98af3] to-[#6b2bd9] py-[80px] text-center">
                <div className="w-full px-5">
                    <h1 className="text-[clamp(18px,4vw,28px)] md:text-[clamp(26px,4vw,40px)] font-bold text-white leading-[1.3]">
                        We Empower Ambitious Talent<br />
                        <span className="block font-normal opacity-95">To Build Intelligent Digital Solutions</span>
                    </h1>
                </div>
            </ScrollReveal>

            {/* Company Summary */}
            <section className="-mt-[50px] relative z-10 p-[0_24px] md:p-0">
                <div className="w-[1200px] mx-auto px-5 flex flex-col md:flex-row justify-between items-end gap-[20px]">

                    <div className="flex items-start gap-[24px]">
                        <div
                            className="w-[108px] h-[108px] rounded-[12px] bg-[#6b2bd9] text-white font-semibold flex items-center justify-center text-[clamp(14px,4vw,22px)] border-[1px] border-white shadow-sm shrink-0">
                            Evolvex!!
                        </div>

                        <div className="mt-[60px] mb-[12px]">
                            <h3 className="text-[clamp(16px,4vw,24px)] font-bold mb-[8px] text-[#2F343A] flex items-center">
                                Evolvex AI Solutions Pvt. Ltd.
                                <img src="/assets/svg/Verified.svg" alt="Verified" className="w-[20px] h-[20px] ml-[8px]" />
                            </h3>

                            <p className="text-[15px] text-[#2F343A] mb-[12px]">
                                Where Top Talent Builds the Future of Intelligent Software
                            </p>

                            <ul className="flex flex-wrap gap-[24px] p-0 m-0 list-none text-[13px] text-[#555]">
                                <li className="flex items-center gap-[8px]">
                                    <img src="/assets/svg/building.svg" alt="Industry" className="w-[16px] h-[16px]" />
                                    Tech | AI | Product Engineering
                                </li>
                                <li className="flex items-center gap-[8px]">
                                    <img src="/assets/svg/Location-.svg" alt="Location" className="w-[16px] h-[16px]" />
                                    Pollachi, India
                                </li>
                                <li className="flex items-center gap-[8px]">
                                    <img src="/assets/svg/Case.svg" alt="Work Type" className="w-[16px] h-[16px]" />
                                    Hybrid / On-Site
                                </li>
                                <li className="flex items-center gap-[8px]">
                                    <img src="/assets/svg/Peoples.svg" alt="Employees" className="w-[16px] h-[16px]" />
                                    1–50 employees
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-[12px] mb-[12px]">
                        <a href="https://www.linkedin.com/company/evolvex-ai" target="_blank" rel="noopener noreferrer"
                            className="transition-transform hover:-translate-y-1">
                            <img src="/assets/svg/linked-in.svg" alt="LinkedIn" className="w-[36px] h-[36px]" />
                        </a>
                        <a href="https://twitter.com/evolvex_ai" target="_blank" rel="noopener noreferrer"
                            className="transition-transform hover:-translate-y-1">
                            <img src="/assets/svg/x-twitter.svg" alt="X (Twitter)" className="w-[36px] h-[36px]" />
                        </a>
                        <a href="https://www.instagram.com/evolvex.ai" target="_blank" rel="noopener noreferrer"
                            className="transition-transform hover:-translate-y-1">
                            <img src="/assets/svg/instagram.svg" alt="Instagram" className="w-[36px] h-[36px]" />
                        </a>
                    </div>

                </div>
            </section>

            {/* Job Details Card */}
            <section className="pt-[40px] pb-[10px]">
                <div className="max-w-[1200px] mx-auto bg-white border border-[#EDEDED] rounded-[10px] p-[30px_24px] md:p-[40px_48px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">


                    <h2 className="text-[clamp(17px,4vw,26px)] font-semibold mb-[10px] text-[#111]" id="jobTitle">{jobTitle}</h2>

                    <p className="text-[14px] text-[4a4a4a] mb-[12px]">
                        <strong>Full-Time| On-Site | Coimbatore</strong>
                    </p>

                    <div className="flex flex-col md:flex-row gap-[8px] md:gap-[24px] text-[14px] text-[#333]">
                        <span>Salary: ₹4.5 – ₹7 LPA</span>
                        <span>Experience: 0–3 Years</span>
                    </div>

                </div>
            </section>

            {/* Job Description Section */}
            <section className="pt-[0px] pb-[80px] bg-white">
                <div className="w-full px-5">

                    <div
                        className="max-w-[1200px] mx-auto bg-white border border-[#EDEDED] rounded-[10px] p-[30px_24px] md:p-[40px_48px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]">

                        {/* About the Company */}
                        <h3 className="text-[17px] md:text-[18px] font-semibold text-[#1E1E1E] mt-0 mb-[12px]">About the Company</h3>

                        <p className="text-[14px] text-[#333] mb-[10px]"><strong>Evolvex AI Solutions Pvt. Ltd.</strong></p>

                        <p className="text-[13.5px] md:text-[14px] leading-[1.7] text-[#555] mb-[14px]">
                            A technology-driven engineering studio building scalable, AI-powered
                            software solutions for mobility, automation, and enterprise platforms.
                            Our team focuses on innovation, clean engineering practices, and
                            high-performance product design.
                        </p>

                        <ul className="pl-[18px] mb-[18px]">
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px]"><strong>Industry:</strong> Technology, AI,
                                Software Engineering</li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px]"><strong>Team Size:</strong> 1 – 50 employees
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px]"><strong>Culture:</strong> Product-focused,
                                quality-driven, collaborative</li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px]"><strong>Work Style:</strong> Structured
                                sprints, modern tech stack, growth-oriented</li>
                        </ul>

                        {/* Role Summary */}
                        <h3 className="text-[17px] md:text-[18px] font-semibold text-[#1E1E1E] mt-[28px] mb-[12px]">Role Summary</h3>

                        <p className="text-[13.5px] md:text-[14px] leading-[1.7] text-[#555] mb-[14px]">
                            We are looking for a skilled Frontend Developer to join our product
                            engineering team. You will build intuitive interfaces, improve user
                            experience, and collaborate closely with designers and backend engineers.
                        </p>

                        {/* Key Responsibilities */}
                        <h3 className="text-[17px] md:text-[18px] font-semibold text-[#1E1E1E] mt-[28px] mb-[12px]">Key Responsibilities
                        </h3>

                        <ul className="mb-[18px]">
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>Develop responsive and user-centric web or mobile interfaces.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>Implement reusable UI components using React or React Native.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>Integrate APIs and work closely with backend services.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>Optimise applications for speed, reliability, and performance.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>Participate in sprint planning and technical discussions.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>Ensure design fidelity and follow UI/UX best practices.</span>
                            </li>
                        </ul>

                        {/* Required Skills */}
                        <h3 className="text-[17px] md:text-[18px] font-semibold text-[#1E1E1E] mt-[28px] mb-[12px]">Required Skills</h3>

                        <h4 className="text-[15px] font-semibold text-[#1E1E1E] mt-[18px] mb-[8px]">Essential Skills</h4>
                        <ul className="mb-[18px]">
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Strong expertise in JavaScript, TypeScript, React, or React Native.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Experience with Redux / Context API.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Good understanding of REST APIs.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Familiarity with Git and agile workflows.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Solid grasp of responsive design principles.</span>
                            </li>
                        </ul>

                        <h4 className="text-[15px] font-semibold text-[#1E1E1E] mt-[18px] mb-[8px]">Bonus Skills</h4>
                        <ul className="mb-[18px]">
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Experience with Expo, Next.js, Tailwind CSS.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Exposure to Supabase, Firebase, or similar.</span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[6px] flex items-start gap-[8px]">
                                <img src="/assets/svg/park-outline_dot.svg" alt="Dot" className="w-[16px] h-[16px] mt-[3px] shrink-0" />
                                <span>Basic knowledge of CI/CD or DevOps tools.</span>
                            </li>
                        </ul>

                        {/* Experience & Qualification */}
                        <h3 className="text-[17px] md:text-[18px] font-semibold text-[#1E1E1E] mt-[28px] mb-[12px]">Experience &amp;
                            Qualification</h3>

                        <ul className="mb-[18px]">
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>
                                    <strong className="text-[#1E1E1E] font-semibold">Experience Required: </strong>
                                    0–3 years of professional experience (freshers with strong portfolios are welcome).
                                </span>
                            </li>
                            <li className="text-[13.5px] md:text-[14px] text-[#555] mb-[8px] flex items-start gap-[8px]">
                                <img src="/assets/svg/checkbox-circle-line.svg" alt="Check" className="w-[18px] h-[18px] mt-[2px] shrink-0" />
                                <span>
                                    <strong className="text-[#1E1E1E] font-semibold">Qualification: </strong>
                                    Any relevant degree / diploma / proven project portfolio.
                                </span>
                            </li>
                        </ul>

                    </div>

                </div>
            </section>

            {/* Apply Position Form */}
            <section className="py-[72px] pb-[96px] bg-white apply-position" id="apply-position">
                <ScrollReveal variant="card" className="w-full px-5">

                    {/* Section Header */}
                    <header className="text-center mb-[56px]">
                        <h2 className="text-[clamp(18px,4vw,28px)] lg:text-[clamp(21px,4vw,32px)] font-bold text-[#111] mb-[8px]">Apply for this Position</h2>
                        <p className="text-[15px] lg:text-[16px] text-[#6b7280]">
                            Submit your details and our hiring team will reach out to you shortly.
                        </p>
                    </header>

                    {/* Application Form */}
                    <form
                        className="max-w-[820px] mx-auto grid grid-cols-1 md:grid-cols-[350px_350px] justify-center gap-x-[48px] gap-y-[28px]"
                        action="#" method="post" encType="multipart/form-data">

                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-[14px] font-semibold text-[#111] mb-[6px]">Full Name <span
                                className="text-[#ef4444]">*</span></label>
                            <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required
                                className="w-full h-[56px] px-[16px] text-[14px] text-[#111] bg-white border-[1.5px] border-[#6C4CF4] rounded-[6px] outline-none transition-shadow placeholder-[#9ca3af] focus:border-[#6C4CF4] focus:shadow-[0_0_0_3px_rgba(108,76,244,0.15)]" />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-[14px] font-semibold text-[#111] mb-[6px]">Email <span
                                className="text-[#ef4444]">*</span></label>
                            <input type="email" id="email" name="email" placeholder="Enter your email address" required
                                className="w-full h-[56px] px-[16px] text-[14px] text-[#111] bg-white border-[1.5px] border-[#6C4CF4] rounded-[6px] outline-none transition-shadow placeholder-[#9ca3af] focus:border-[#6C4CF4] focus:shadow-[0_0_0_3px_rgba(108,76,244,0.15)]" />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phone" className="block text-[14px] font-semibold text-[#111] mb-[6px]">Phone Number <span
                                className="text-[#ef4444]">*</span></label>
                            <input type="tel" id="phone" name="phone" placeholder="Your contact number" required
                                className="w-full h-[56px] px-[16px] text-[14px] text-[#111] bg-white border-[1.5px] border-[#6C4CF4] rounded-[6px] outline-none transition-shadow placeholder-[#9ca3af] focus:border-[#6C4CF4] focus:shadow-[0_0_0_3px_rgba(108,76,244,0.15)]" />
                        </div>

                        {/* Current City */}
                        <div>
                            <label htmlFor="city" className="block text-[14px] font-semibold text-[#111] mb-[6px]">Current city <span
                                className="text-[#ef4444]">*</span></label>
                            <input type="text" id="city" name="city" placeholder="Mention the city you live in" required
                                className="w-full h-[56px] px-[16px] text-[14px] text-[#111] bg-white border-[1.5px] border-[#6C4CF4] rounded-[6px] outline-none transition-shadow placeholder-[#9ca3af] focus:border-[#6C4CF4] focus:shadow-[0_0_0_3px_rgba(108,76,244,0.15)]" />
                        </div>

                        {/* LinkedIn / Portfolio */}
                        <div>
                            <label htmlFor="portfolio" className="block text-[14px] font-semibold text-[#111] mb-[6px]">LinkedIn /
                                Portfolio</label>
                            <input type="url" id="portfolio" name="portfolio" placeholder="LinkedIn / Portfolio URL"
                                className="w-full h-[56px] px-[16px] text-[14px] text-[#111] bg-white border-[1.5px] border-[#6C4CF4] rounded-[6px] outline-none transition-shadow placeholder-[#9ca3af] focus:border-[#6C4CF4] focus:shadow-[0_0_0_3px_rgba(108,76,244,0.15)]" />
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label htmlFor="experience" className="block text-[14px] font-semibold text-[#111] mb-[6px]">Experience level <span
                                className="text-[#ef4444]">*</span></label>
                            <select id="experience" name="experience" required defaultValue=""
                                className="w-full h-[56px] px-[16px] text-[14px] text-[#111] bg-white border-[1.5px] border-[#6C4CF4] rounded-[6px] outline-none transition-shadow cursor-pointer focus:border-[#6C4CF4] focus:shadow-[0_0_0_3px_rgba(108,76,244,0.15)]">
                                <option value="" disabled>Select experience level</option>
                                <option value="fresher">Fresher</option>
                                <option value="0-1">0–1 Years</option>
                                <option value="1-3">1–3 Years</option>
                                <option value="3-5">3–5 Years</option>
                                <option value="5+">5+ Years</option>
                            </select>
                        </div>

                        {/* Motivation */}
                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="motivation" className="block text-[14px] font-semibold text-[#111] mb-[6px]">
                                Why do you want to join Evolvex AI Solutions? <span className="text-[#ef4444]">*</span>
                            </label>
                            <textarea id="motivation" name="motivation" rows="5"
                                placeholder="Tell us about your motivation and interest..." required
                                className="w-full h-[115px] p-[14px_16px] text-[14px] text-[#111] border-[1.5px] border-[#6C4CF4] rounded-[6px] resize-none outline-none transition-shadow placeholder-[#9ca3af] focus:border-[#6C4CF4] focus:shadow-[0_0_0_3px_rgba(108,76,244,0.15)]"></textarea>
                        </div>

                        {/* Upload Resume */}
                        <div className="col-span-1 md:col-span-2">
                            <label htmlFor="resume" className="block text-[14px] font-semibold text-[#111] mb-[6px]">Upload Resume <span
                                className="text-[#ef4444]">*</span></label>

                            <div
                                className="relative w-full h-[138px] border-[1.5px] border-dashed border-[#c7c7c7] rounded-[8px] bg-[#fafafa] flex flex-col items-center justify-center text-center mt-[8px] cursor-pointer hover:border-[#6C4CF4] hover:bg-[#f7f6ff] transition-colors group">
                                <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                <p className="text-[13px] text-[#6b7280] leading-[1.5] pointer-events-none">
                                    Click to upload or drag and drop<br />
                                    <small className="block mt-1">PDF, DOC, DOCX (Max 5MB)</small>
                                </p>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="col-span-1 md:col-span-2 mt-[4px] flex items-start gap-[10px] text-[14px] text-[#374151]">
                            <input type="checkbox" required className="mt-[3px] w-[16px] h-[16px] accent-[#6C4CF4]" />
                            <span>
                                I agree to the <a href="/terms" target="_blank" className="text-[#6C4CF4] font-medium hover:underline">Terms &amp; Conditions</a> and consent to the processing of my application.
                            </span>
                        </div>

                        {/* Submit */}
                        <div className="col-span-1 md:col-span-2 mt-[12px] text-center">
                            <StatefulButton
                                className="w-[220px] h-[48px] rounded-[6px] bg-gradient-to-br from-[#6C4CF4] to-[#8B5CF6] text-white text-[15px] font-semibold border-none cursor-pointer transition-all duration-250 hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(108,76,244,0.35)]"
                                onClick={(e) => { e.preventDefault(); return new Promise(resolve => setTimeout(resolve, 3000)); }}
                            >
                                Submit Application
                            </StatefulButton>
                        </div>

                    </form>

                </ScrollReveal>
            </section>
        </>
    );
};

export default JobDetails;
