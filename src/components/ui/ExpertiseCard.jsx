import React from "react";

export default function ExpertiseCard({
    title,
    desc,
    bgClass = "bg-[#FBFAFF]", // Default uniform light color
    accentClass,
    icon,
    meta = "Service",
    onClick,
}) {
    return (
        <article
            onClick={onClick}
            className={`group relative h-[280px] rounded-[18px] overflow-hidden border border-black/5 shadow-[0_18px_70px_rgba(0,0,0,0.08)] cursor-pointer transition-transform ${bgClass}`}
        >
            {/* Accent strip */}
            <div className={`absolute left-0 top-0 h-[3px] w-full ${accentClass}`} />

            {/* Soft highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 to-transparent opacity-70" />

            {/* Hover glow layer */}
            <div className="absolute -top-[140px] -right-[140px] h-[280px] w-[280px] rounded-full bg-white/35 blur-[40px] opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

            <div className="relative z-10 p-[26px] flex flex-col h-full">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4">
                    {/* Icon */}
                    <div className="h-[50px] w-[50px] rounded-[16px] bg-white/70 border border-white/70 shadow-[0_12px_26px_rgba(0,0,0,0.08)] backdrop-blur grid place-items-center">
                        {icon}
                    </div>

                    {/* Meta chip */}
                    <span className="inline-flex items-center rounded-full border border-black/5 bg-white/60 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-black/45">
                        {meta}
                    </span>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-[20px] lg:text-[22px] font-extrabold text-[#141033] leading-[1.15]">
                    {title}
                </h3>

                <p className="mt-3 text-[15px] leading-[1.7] text-black/55 max-w-[290px]">
                    {desc}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-6 flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-black/45">
                        Explore service details
                    </span>
                    <span className="text-[18px] text-black/30 group-hover:text-black/55 transition">
                        →
                    </span>
                </div>
            </div>

            {/* bottom rounded accent (keep your signature style but improved) */}
            <span className="absolute bottom-[-22px] left-[22px] w-[92px] h-[46px] rounded-t-[46px] bg-black/10" />
        </article>
    );
}
