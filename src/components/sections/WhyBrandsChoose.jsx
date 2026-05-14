import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';

const WhyBrandsChoose = () => {
    return (
        <section className="section flex flex-col items-center" id="why-brands" aria-labelledby="why-brands-title">

            <div className="text-center mb-[56px]">
                <ScrollReveal variant="heading">
                    <h2 id="why-brands-title"
                        className="text-[35.2px] md:text-[41.6px] font-bold text-[#0b1220] mb-2 leading-tight">
                        Why Brands Choose Evolvex
                    </h2>
                </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[60px] justify-center mx-auto mb-[30px]">

                <ScrollReveal variant="card" delay={0.1}>
                    <article
                        className="w-full max-w-[320px] h-auto min-h-[400px] rounded-[16px] p-[32px] relative overflow-hidden group flex flex-col items-center text-center justify-start pt-[64px] hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: '#E6DEFF' }}>

                        <div className="relative z-20 flex flex-col gap-4 items-center">
                            <h3 className="font-semibold text-[22.4px] leading-[1.2] text-[#0b1220]">
                                Engineering-Driven Execution
                            </h3>
                            <p className="m-0 text-[#0b1220] opacity-75 text-[15.2px] leading-[1.5]">
                                Our processes are built on strong engineering foundations, ensuring every product is structured,
                                optimized, and technically sound.
                            </p>
                        </div>

                        <div className="absolute left-0 bottom-[-20px] w-[200px] h-[200px] pointer-events-none z-10">
                            <img src="/assets/images/deco-purple-1.png" alt="" className="w-full h-full object-contain object-left-bottom" />
                        </div>
                    </article>
                </ScrollReveal>

                <ScrollReveal variant="card" delay={0.2}>
                    <article
                        className="w-full max-w-[320px] h-auto min-h-[400px] rounded-[16px] p-[32px] relative overflow-hidden group flex flex-col items-center text-center justify-start pt-[64px] hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: '#E6DEFF' }}>

                        <div className="relative z-20 flex flex-col gap-4 items-center">
                            <h3 className="font-semibold text-[22.4px] leading-[1.2] text-[#0b1220]">
                                AI-Focused Development
                            </h3>
                            <p className="m-0 text-[#0b1220] opacity-75 text-[15.2px] leading-[1.5]">
                                We integrate intelligence across the entire product lifecycle, from data-driven insights to automation
                                and predictive capabilities.
                            </p>
                        </div>

                        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-[200px] h-[200px] pointer-events-none z-10">
                            <img src="/assets/images/deco-purple-2.png" alt="" className="w-full h-full object-contain object-bottom" />
                        </div>
                    </article>
                </ScrollReveal>

                <ScrollReveal variant="card" delay={0.3}>
                    <article
                        className="w-full max-w-[320px] h-auto min-h-[400px] rounded-[16px] p-[32px] relative overflow-hidden group flex flex-col items-center text-center justify-start pt-[64px] hover:scale-105 transition-transform duration-300"
                        style={{ backgroundColor: '#E6DEFF' }}>

                        <div className="relative z-20 flex flex-col gap-4 items-center">
                            <h3 className="font-semibold text-[22.4px] leading-[1.2] text-[#0b1220]">
                                Transparent Collaboration
                            </h3>
                            <p className="m-0 text-[#0b1220] opacity-75 text-[15.2px] leading-[1.5]">
                                We believe in clarity, open communication, and a smooth development workflow that keeps clients informed
                                and empowered.
                            </p>
                        </div>

                        <div className="absolute right-0 bottom-[-20px] w-[200px] h-[200px] pointer-events-none z-10">
                            <img src="/assets/images/deco-purple-3.png" alt=""
                                className="w-full h-full object-contain object-right-bottom" />
                        </div>
                    </article>
                </ScrollReveal>

            </div>

            <ScrollReveal variant="card" delay={0.4}>
                <div
                    className="w-full max-w-[1100px] h-[220px] rounded-[20px] top-0 relative overflow-hidden flex items-center justify-center text-center mx-auto"
                    style={{ background: 'linear-gradient(90deg, #E6DEFF 0%, #FFFFFF 50%, #E6DEFF 100%)' }}>

                    <div className="absolute left-0 top-0 w-[180px] h-[180px] pointer-events-none z-0">
                        <img src="/assets/images/deco-purple-4.png" alt="" className="w-full h-full object-contain object-left-top" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
                        <h3 className="text-[17.6px] font-bold text-[#0b1220] leading-tight mb-3">
                            Let’s Build Something Meaningful Together
                        </h3>
                        <p className="m-0 text-[#0b1220] opacity-70 text-[17.6px]">
                            Our team is ready to help you shape products that are innovative, scalable, and intelligently engineered.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default WhyBrandsChoose;
