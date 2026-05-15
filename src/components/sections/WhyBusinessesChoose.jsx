import React, { useState } from 'react';

import ScrollReveal from '../ui/ScrollReveal';

const WhyWorkWithUs = () => {
    // State for hover effects. null means default state (both flex-1)
    const [leftHover, setLeftHover] = useState(null); // 'growth' | 'innovation'
    const [rightHover, setRightHover] = useState(null); // 'collab' | 'balance'

    const handleMouseEnter = (column, card) => {
        if (column === 'left') setLeftHover(card);
        else setRightHover(card);
    };

    const handleMouseLeave = (column) => {
        if (column === 'left') setLeftHover(null);
        else setRightHover(null);
    };

    const getCardClasses = (column, cardName) => {
        const hoverState = column === 'left' ? leftHover : rightHover;
        const isExpanded = hoverState === cardName;

        // Base classes from the user's snippet
        let classes = "transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] w-full flex flex-col items-start px-8 py-[29px] relative rounded-3xl gap-2.5 bg-[#6838cc] self-stretch overflow-hidden group border border-transparent";

        // Dynamic classes based on state
        if (isExpanded) {
            classes += " flex-none h-[600px] expanded";
        } else {
            classes += " flex-1";
        }

        return classes;
    };

    return (
        <section className="py-[80px]" id="why-work" aria-labelledby="why-work-title">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
                <ScrollReveal variant="heading" className="text-center mb-[32px]">
                    <h2 id="why-work-title" className="text-[clamp(21px,4vw,32px)] font-extrabold text-[#0b1220] mb-2">Why Businesses Choose CognivexaAI</h2>
                </ScrollReveal>

                <div className="flex flex-col md:flex-row gap-[28px] w-full max-w-[1200px] mx-auto md:h-[880px] p-4">

                    <div className="flex flex-col flex-1 gap-[28px] h-full" id="card-left-container">
                        {/* Card 1: Growth Opportunities */}
                        <div id="card-growth"
                            className={getCardClasses('left', 'growth')}
                            onMouseEnter={() => handleMouseEnter('left', 'growth')}
                            onMouseLeave={() => handleMouseLeave('left')}>

                            <div className="w-full flex self-stretch flex-col items-start gap-[22px] flex-[0_0_auto] relative">
                                <div className="w-full flex self-stretch flex-col items-start gap-3.5 flex-[0_0_auto] px-0 py-2 relative">
                                    <div className="font-sans self-stretch mt-[-1.00px] tracking-[0] text-2xl text-white relative h-[29px] font-bold leading-[normal]">
                                        Strategic Engineering Thinking
                                    </div>

                                    {/* Text Container */}
                                    <div className="font-sans self-stretch tracking-[0] text-sm text-[#ffffffcc] relative font-medium leading-[normal] h-[60px] transition-all duration-500 group-[.expanded]:h-[207px]">
                                        {/* Short Text */}
                                        <p className="absolute inset-0 transition-opacity duration-500 opacity-100 group-[.expanded]:opacity-0 pointer-events-none group-[.expanded]:pointer-events-none">
                                            We don’t just build features — we design systems that solve core business challenges.
                                        </p>
                                        {/* Long Text */}
                                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-[.expanded]:opacity-100 pointer-events-none group-[.expanded]:pointer-events-auto">
                                            Our approach goes beyond code. We analyze your business architecture to identify bottlenecks and opportunities for automation.<br /><br />
                                            By designing systems with a focus on long-term strategy, we ensure that every technical decision supports your business objectives.<br /><br />
                                            The result is a unified digital ecosystem that works for you, not the other way around.
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <img
                                    className="object-cover absolute transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] bottom-[-249px] w-[230px] right-[-46px] h-[230px] group-[.expanded]:bottom-[-264px] group-[.expanded]:w-80 group-[.expanded]:right-2 group-[.expanded]:h-[300px]"
                                    alt="Growth Opportunities" src="/assets/images/Strategic-Technology.png" />
                            </div>
                        </div>

                        {/* Card 2: Innovation-Driven */}
                        <div id="card-innovation"
                            className={getCardClasses('left', 'innovation')}
                            onMouseEnter={() => handleMouseEnter('left', 'innovation')}
                            onMouseLeave={() => handleMouseLeave('left')}>

                            <div className="w-full flex self-stretch flex-col items-start gap-[22px] flex-[0_0_auto] relative">
                                <div className="w-full flex self-stretch flex-col items-start gap-3.5 flex-[0_0_auto] px-0 py-2 relative">
                                    <div className="font-sans self-stretch mt-[-1.00px] tracking-[0] text-2xl text-white relative h-[29px] font-bold leading-[normal]">
                                        Scalable and Future-Ready Solutions
                                    </div>

                                    {/* Text Container */}
                                    <div className="font-sans self-stretch tracking-[0] text-sm text-[#ffffffcc] relative font-medium leading-[normal] h-[60px] transition-all duration-500 group-[.expanded]:h-[187px]">
                                        {/* Short Text */}
                                        <p className="absolute inset-0 transition-opacity duration-500 opacity-100 group-[.expanded]:opacity-0 pointer-events-none group-[.expanded]:pointer-events-none">
                                            Our solutions are built to evolve with your business.
                                        </p>
                                        {/* Long Text */}
                                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-[.expanded]:opacity-100 pointer-events-none group-[.expanded]:pointer-events-auto">
                                            We build with tomorrow in mind. Our engineering standards prioritize modularity and scalability, allowing your systems to expand seamlessly as your user base grows.<br /><br />
                                            We integrate the latest AI capabilities and cloud-native architectures to ensure your platform remains competitive and performant.<br /><br />
                                            From MVP to enterprise scale, our solutions are built to last.
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <img
                                    className="object-cover absolute transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] bottom-[-255px] w-[228px] -right-12 h-[227px] group-[.expanded]:bottom-[-298px] group-[.expanded]:w-80 group-[.expanded]:right-0 group-[.expanded]:h-[300px]"
                                    alt="Innovation Driven" src="/assets/images/Scalable.png" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-[28px] h-full" id="card-right-container">
                        {/* Card 1: Collaborative Culture */}
                        <div id="card-collab"
                            className={getCardClasses('right', 'collab')}
                            onMouseEnter={() => handleMouseEnter('right', 'collab')}
                            onMouseLeave={() => handleMouseLeave('right')}>

                            <div className="w-full flex self-stretch flex-col items-start gap-[22px] flex-[0_0_auto] relative">
                                <div className="w-full flex self-stretch flex-col items-start gap-3.5 flex-[0_0_auto] px-0 py-2 relative">
                                    <div className="font-sans self-stretch mt-[-1.00px] tracking-[0] text-2xl text-white relative h-[29px] font-bold leading-[normal]">
                                        Reliable and Transparent Delivery
                                    </div>

                                    {/* Text Container */}
                                    <div className="font-sans self-stretch tracking-[0] text-sm text-[#ffffffcc] relative font-medium leading-[normal] h-[60px] transition-all duration-500 group-[.expanded]:h-[207px]">
                                        {/* Short Text */}
                                        <p className="absolute inset-0 transition-opacity duration-500 opacity-100 group-[.expanded]:opacity-0 pointer-events-none group-[.expanded]:pointer-events-none">
                                            You always know what is happening, what is next, and what to expect.
                                        </p>
                                        {/* Long Text */}
                                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-[.expanded]:opacity-100 pointer-events-none group-[.expanded]:pointer-events-auto">
                                            Trust is built on transparency. We provide regular updates, clear documentation, and direct access to our development team.<br /><br />
                                            Our agile process ensures that project milestones are met with precision and that you are always in the loop regarding progress and technical decisions.<br /><br />
                                            No surprises, just reliable delivery you can count on.
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <img
                                    className="object-cover absolute transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] bottom-[-249px] w-[230px] right-[-46px] h-[230px] group-[.expanded]:bottom-[-264px] group-[.expanded]:w-80 group-[.expanded]:right-2 group-[.expanded]:h-[300px]"
                                    alt="People working open" src="/assets/images/Transparent-and-Reliable Delivery.png" />
                            </div>
                        </div>

                        {/* Card 2: Work-Life Balance */}
                        <div id="card-balance"
                            className={getCardClasses('right', 'balance')}
                            onMouseEnter={() => handleMouseEnter('right', 'balance')}
                            onMouseLeave={() => handleMouseLeave('right')}>

                            <div className="w-full flex self-stretch flex-col items-start gap-[22px] flex-[0_0_auto] relative">
                                <div className="w-full flex self-stretch flex-col items-start gap-3.5 flex-[0_0_auto] px-0 py-2 relative">
                                    <div className="font-sans self-stretch mt-[-1.00px] tracking-[0] text-2xl text-white relative h-[29px] font-bold leading-[normal]">
                                        Long-Term Partnership Approach
                                    </div>

                                    {/* Text Container */}
                                    <div className="font-sans self-stretch tracking-[0] text-sm text-[#ffffffcc] relative font-medium leading-[normal] h-[60px] transition-all duration-500 group-[.expanded]:h-[187px]">
                                        {/* Short Text */}
                                        <p className="absolute inset-0 transition-opacity duration-500 opacity-100 group-[.expanded]:opacity-0 pointer-events-none group-[.expanded]:pointer-events-none">
                                            We focus on building relationships, not just completing projects.
                                        </p>
                                        {/* Long Text */}
                                        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-[.expanded]:opacity-100 pointer-events-none group-[.expanded]:pointer-events-auto">
                                            We don't just deliver a project and leave. We view ourselves as your long-term technology partner, dedicated to your success.<br /><br />
                                            As your business evolves, we provide the ongoing support and strategic guidance needed to keep your systems optimized and ahead of the curve.<br /><br />
                                            Your growth is our primary metric for success.
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <img
                                    className="object-cover absolute transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] bottom-[-255px] w-[228px] -right-12 h-[227px] group-[.expanded]:bottom-[-298px] group-[.expanded]:w-80 group-[.expanded]:right-0 group-[.expanded]:h-[300px]"
                                    alt="Element life style" src="/assets/images/Dedicated-Partnership-Approach.png" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyWorkWithUs;
