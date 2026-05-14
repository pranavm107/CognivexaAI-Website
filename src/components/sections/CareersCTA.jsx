import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function CareersCTA() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="py-[100px] lg:py-[120px]" id="careers-cta">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
                <motion.div
                    initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-[1300px] mx-auto overflow-hidden rounded-[28px] border border-white/20 shadow-[0_45px_140px_rgba(0,0,0,0.18)]"
                >
                    {/* Background gradient system */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6C4CF4] via-[#7C5CFF] to-[#FF4FD8]" />

                    {/* Soft overlay depth */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.12),transparent_55%)]" />

                    {/* Subtle noise texture */}
                    <div
                        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
                        }}
                        aria-hidden="true"
                    />

                    {/* Animated decorative shapes */}
                    {!reduceMotion && (
                        <>
                            <motion.div
                                className="absolute -left-[140px] top-1/2 -translate-y-1/2 h-[360px] w-[360px] rounded-full bg-white/12 blur-[0px]"
                                animate={{ y: [-6, 6, -6] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                aria-hidden="true"
                            />
                            <motion.div
                                className="absolute -right-[110px] -top-[80px] h-[240px] w-[240px] rounded-[42px] bg-white/10 rotate-[12deg]"
                                animate={{ rotate: [12, 8, 12], y: [0, 10, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                aria-hidden="true"
                            />
                            <motion.div
                                className="absolute right-[10%] bottom-[-90px] h-[260px] w-[260px] rounded-full bg-white/8"
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                                aria-hidden="true"
                            />
                            <motion.div
                                className="absolute right-[-80px] top-1/2 -translate-y-1/2 h-[240px] w-[240px] rounded-[44px] bg-white/10 rotate-[-8deg]"
                                animate={{ rotate: [-8, -4, -8] }}
                                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                                aria-hidden="true"
                            />
                        </>
                    )}

                    {/* Content */}
                    <div className="relative z-10 min-h-[360px] flex items-center justify-center px-6 py-14">
                        <div className="max-w-[860px] text-center">
                            {/* Top tag 
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md">
                                <span className="h-[7px] w-[7px] rounded-full bg-white" />
                                <p className="text-[12px] tracking-[0.26em] font-extrabold uppercase text-white/90">
                                    Careers
                                </p>
                            </div> */}

                            <h2 className="mt-6 text-[30px] md:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.1]">
                                Discover Your Next Role with Us
                            </h2>

                            <p className="mt-4 text-[15px] md:text-[18px] leading-[1.7] text-white/90 max-w-[640px] mx-auto">
                                Browse our current openings and take the next step in your career with Evolvex.
                            </p>

                            {/* CTA Button */}
                            <div className="mt-10 flex items-center justify-center">
                                <a
                                    href="/open-roles"
                                    className="group relative inline-flex items-center justify-center rounded-full bg-white px-[34px] py-[16px] text-[15px] md:text-[16px] font-extrabold text-[#6C4CF4] shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition hover:scale-[1.03] active:scale-[0.99]"
                                >
                                    {/* shine effect */}
                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                        <span className="absolute -left-[40%] top-0 h-full w-[40%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:animate-[shine_1s_ease-in-out]" />
                                    </span>

                                    <span className="relative z-10">
                                        Discover Roles at Evolvex
                                    </span>

                                    <span className="relative z-10 ml-3 text-[#6C4CF4]/60 group-hover:text-[#6C4CF4] transition">
                                        →
                                    </span>
                                </a>
                            </div>

                            {/* Micro trust line */}
                            <p className="mt-6 text-[12px] text-white/75 font-semibold">
                                We respond to shortlisted profiles within 3 to 5 business days.
                            </p>
                        </div>
                    </div>

                    {/* keyframes for shine */}
                    <style>
                        {`
              @keyframes shine {
                0% { transform: translateX(0) skewX(-20deg); opacity: 0; }
                20% { opacity: 1; }
                100% { transform: translateX(260%) skewX(-20deg); opacity: 0; }
              }
            `}
                    </style>
                </motion.div>
            </div>
        </section>
    );
}
