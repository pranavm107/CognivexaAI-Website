import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ShieldCheck,
    GraduationCap,
    Users2,
    HeartHandshake,
    Sparkles,
    Timer,
    Laptop2,
    BadgeCheck,
} from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

const panel = {
    hidden: { opacity: 0, y: 14, scale: 0.985 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

const list = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

function Tag({ icon: Icon, label }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur">
            <Icon className="h-4 w-4 text-[#6C4CF4]" />
            <span className="text-[13px] font-semibold text-[#1b1b1b]">{label}</span>
        </div>
    );
}

function BenefitCard({ icon: Icon, title, desc, index }) {
    return (
        <motion.div
            variants={item}
            className="group relative overflow-hidden rounded-[18px] border border-black/5 bg-white/70 px-5 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.06)] backdrop-blur transition will-change-transform hover:-translate-y-[2px] hover:shadow-[0_28px_80px_rgba(0,0,0,0.10)]"
        >
            {/* hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-[#6C4CF4]/12 blur-2xl" />
                <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#FF4FD8]/10 blur-2xl" />
            </div>

            <div className="relative z-10 flex items-start gap-4">
                {/* icon */}
                <div className="relative">
                    <div className="grid h-11 w-11 place-items-center mt-2 rounded-[14px] border border-black/5 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                        <motion.div
                            initial={false}
                            whileHover={{ rotate: index % 2 === 0 ? 6 : -6, scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 250, damping: 18 }}
                        >
                            <Icon className="h-5 w-5 text-[#6C4CF4]" />
                        </motion.div>
                    </div>

                    {/* tiny dot detail */}

                </div>

                {/* content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                        <h4 className="truncate text-[16px] lg:text-[17px] font-extrabold text-[#101018]">
                            {title}
                        </h4>
                        <span className="hidden md:inline-flex text-[12px] font-semibold text-black/30">
                            0{index + 1}
                        </span>
                    </div>

                    <p className="mt-1 text-[13px] lg:text-[14px] leading-[1.65] text-[#3f3f46]">
                        {desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function WorkingWithUsSection() {
    const reduceMotion = useReducedMotion();

    const benefits = [
        {
            icon: ShieldCheck,
            title: "Ownership-first execution",
            desc: "We move with accountability. If you own it, you shape it end-to-end.",
        },
        {
            icon: GraduationCap,
            title: "Continuous learning",
            desc: "Mentorship, reviews, and skill-building baked into real project work.",
        },
        {
            icon: Users2,
            title: "High-trust collaboration",
            desc: "Design, engineering, and product work as one team without silos.",
        },
        {
            icon: HeartHandshake,
            title: "Well-being & balance",
            desc: "We optimize for sustainable pace, not burnout productivity.",
        },
    ];

    return (
        <section
            id="working-with-us"
            className="relative overflow-hidden py-[90px] lg:py-[120px] pb-[110px] lg:pb-[140px]"
        >
            {/* background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F7F4FF] via-white to-[#FFF6FB]" />

            {/* subtle grid texture */}
            <div
                className="absolute inset-0 opacity-[0.25]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(17,17,17,0.08) 1px, transparent 0)",
                    backgroundSize: "26px 26px",
                }}
                aria-hidden="true"
            />

            {/* premium blobs */}
            <span
                className="absolute -top-[160px] -left-[140px] h-[340px] w-[340px] rounded-full bg-[#6C4CF4]/18 blur-[95px]"
                aria-hidden="true"
            />
            <span
                className="absolute top-[140px] -right-[160px] h-[380px] w-[380px] rounded-full bg-[#FF4FD8]/14 blur-[110px]"
                aria-hidden="true"
            />

            <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 items-center gap-[44px] lg:grid-cols-2 lg:gap-[70px]">
                    {/* LEFT */}
                    <motion.div
                        initial={reduceMotion ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.35 }}
                        variants={list}
                    >
                        <motion.p
                            variants={fadeUp}
                            className="inline-flex items-center gap-2 text-[13px] tracking-[0.18em] font-extrabold uppercase text-[#6C4CF4]"
                        >
                            <span className="h-[6px] w-[6px] rounded-full bg-[#6C4CF4]" />
                            About Working With Us
                        </motion.p>

                        <motion.h2
                            variants={fadeUp}
                            className="mt-4 text-[34px] lg:text-[52px] leading-[1.05] font-extrabold text-[#0f0f14]"
                        >
                            Build with clarity.
                            <span className="block bg-gradient-to-r from-[#6C4CF4] to-[#FF4FD8] bg-clip-text text-transparent">
                                Grow with purpose.
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mt-5 max-w-[560px] text-[15px] lg:text-[18px] leading-[1.8] text-[#4b4b55]"
                        >
                            At Evolvex, we create an environment where strong engineers and designers ship quality work,
                            learn continuously, and feel proud of what they build together.
                        </motion.p>

                        {/* Trust tags */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            <Tag icon={BadgeCheck} label="Mentorship culture" />
                            <Tag icon={Laptop2} label="Remote-friendly" />
                            <Tag icon={Timer} label="Fast iterations" />
                            <Tag icon={Sparkles} label="Creative ownership" />
                        </motion.div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={reduceMotion ? "visible" : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.32 }}
                        variants={panel}
                        className="relative"
                    >
                        {/* board wrapper */}
                        <div className="relative rounded-[30px] border border-white/60 bg-white/55 backdrop-blur-xl shadow-[0_35px_120px_rgba(0,0,0,0.14)]">
                            {/* top bar like premium UI */}
                            <div className="flex items-center justify-between px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="h-[10px] w-[10px] rounded-full bg-[#FF4D4D]" />
                                    <span className="h-[10px] w-[10px] rounded-full bg-[#FFB020]" />
                                    <span className="h-[10px] w-[10px] rounded-full bg-[#4CD964]" />
                                </div>

                                <p className="text-[12px] font-extrabold tracking-[0.18em] text-black/35 uppercase">
                                    Culture Board
                                </p>

                                <span className="h-8 w-8 rounded-full bg-black/5" />
                            </div>

                            {/* divider */}
                            <div className="h-px w-full bg-black/5" />

                            {/* content */}
                            <motion.div
                                variants={list}
                                className="p-5 lg:p-6"
                            >
                                <div className="grid gap-4">
                                    {benefits.map((b, idx) => (
                                        <BenefitCard
                                            key={b.title}
                                            icon={b.icon}
                                            title={b.title}
                                            desc={b.desc}
                                            index={idx}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* subtle floating accent */}

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
