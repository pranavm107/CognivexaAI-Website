
import React from 'react';

const TrustedBy = () => {
    const companyLogos = ["slack", "framer", "netflix", "google", "linkedin", "instagram", "facebook"];

    return (
        <section className="py-10 bg-white border-b border-gray-50">
            <style>{`
                .marquee-logo-inner {
                    animation: marqueeLogoScroll linear infinite;
                }

                @keyframes marqueeLogoScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="container mx-auto px-4 mb-6 text-center">
                <p className="text-lg md:text-xl font-bold text-slate-800 uppercase tracking-widest">Tech & Platforms We Work With</p>
            </div>

            <div className="overflow-hidden w-full relative select-none">
                <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-logo-inner flex items-center will-change-transform min-w-[200%]" style={{ animationDuration: "18s" }}>
                    {[...companyLogos, ...companyLogos].map((company, index) => (
                        <img
                            key={index}
                            src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                            alt={company}
                            className="h-9 md:h-10 lg:h-12 w-auto mx-10 opacity-70 hover:opacity-100 transition object-contain"
                            draggable={false}
                        />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-24 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </section>
    );
};

export default TrustedBy;
