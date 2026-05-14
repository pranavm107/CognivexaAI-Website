import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CheckCircle2, Zap, TrendingUp, Clock, Activity, Layout, GitMerge } from "lucide-react";
import { AuroraText } from "../ui/AuroraText";

// --- Data ---
const FEATURES = [
    {
        id: "innovation",
        label: (
            <AuroraText speed={0.5} colors={["#38BDF8", "#3B82F6"]}>
                INNOVATION
            </AuroraText>
        ),
        title: (
            <>
                Innovative{" "}
                <AuroraText speed={0.6} colors={["#38BDF8", "#3B82F6", "#6366F1"]}>
                    Projects
                </AuroraText>
            </>
        ),
        desc: "At Evolvex, you do not work on theoretical exercises. You contribute to production systems used by real organizations. Every feature you build directly improves usability, system performance, and scalability in live environments. Your work reaches users, not just internal demos.",
        bullets: [
            "Production-grade architecture",
            "Modern engineering stack",
            "Real user impact",
            "Performance-first systems",
        ],
        icon: Layout,
        accent: "bg-blue-500",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        id: "growth",
        label: (
            <AuroraText speed={0.5} colors={["#EC4899", "#F472B6"]}>
                GROWTH
            </AuroraText>
        ),
        title: (
            <>
                Growth-Focused{" "}
                <AuroraText speed={0.6} colors={["#A855F7", "#EC4899", "#F472B6"]}>
                    Culture
                </AuroraText>
            </>
        ),
        desc: "Learning is integrated into the workflow, not treated as an extra task. Structured feedback, technical mentorship, and exposure to real challenges help your skills compound consistently over time.",
        bullets: [
            "Weekly technical reviews",
            "Peer mentorship",
            "Skill progression roadmap",
            "Exposure to real challenges",
        ],
        icon: TrendingUp,
        accent: "bg-purple-500",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        id: "environment",
        label: (
            <AuroraText speed={0.5} colors={["#10B981", "#22D3EE"]}>
                WORK DESIGN
            </AuroraText>
        ),
        title: (
            <>
                Flexible & Supportive{" "}
                <AuroraText speed={0.6} colors={["#14B8A6", "#10B981", "#22D3EE"]}>
                    Environment
                </AuroraText>
            </>
        ),
        desc: "Sustainable performance produces the best outcomes. Clear planning, focused work time, and a trust-driven structure allow creativity to thrive without burnout. We value depth, clarity, and rhythm over constant urgency.",
        bullets: [
            "Flexible work structure",
            "Clear planning cycles",
            "Respect for deep work",
            "Healthy collaboration rhythm",
        ],
        icon: Clock,
        accent: "bg-teal-500",
        gradient: "from-teal-500 to-emerald-500",
    },
    {
        id: "leadership",
        label: (
            <AuroraText speed={0.5} colors={["#F59E0B", "#F97316"]}>
                OWNERSHIP
            </AuroraText>
        ),
        title: (
            <>
                Opportunities to{" "}
                <AuroraText speed={0.6} colors={["#F59E0B", "#F97316", "#EF4444"]}>
                    Lead
                </AuroraText>
            </>
        ),
        desc: "Leadership at Evolvex emerges from initiative. Engineers and designers influence architecture, system decisions, and product direction through ownership and responsibility, not hierarchy.",
        bullets: [
            "Ownership of features",
            "Technical decision involvement",
            "Initiative-driven leadership",
            "System design participation",
        ],
        icon: GitMerge,
        accent: "bg-orange-500",
        gradient: "from-orange-500 to-red-500",
    },
];

// --- Visual Components (Enhanced System UI Mocks) ---

const DashboardMock = () => (
    <div className="w-full h-full p-6 flex flex-col gap-4 relative overflow-hidden">
        {/* Glass Overlay Shine */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-white/50 border border-white/60 shadow-sm flex flex-col justify-center p-4 backdrop-blur-md">
                    <div className={`w-8 h-8 rounded-full mb-2 ${i === 1 ? 'bg-blue-100' : i === 2 ? 'bg-indigo-100' : 'bg-cyan-100'}`} />
                    <div className="w-16 h-2 bg-gray-200/80 rounded-full" />
                </div>
            ))}
        </div>

        {/* Main Chart Panel */}
        <div className="flex-1 bg-white/60 rounded-2xl border border-white/80 shadow-sm p-5 relative overflow-hidden backdrop-blur-md flex flex-col justify-end">
            <div className="absolute top-5 left-5 w-32 h-3 bg-gray-200/80 rounded-full" />

            {/* Charts */}
            <div className="flex items-end gap-3 h-40 w-full">
                {[0.4, 0.6, 0.5, 0.8, 0.6, 0.9, 0.7, 0.5].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end h-full group">
                        <div style={{ height: `${h * 100}%` }} className="w-full bg-gradient-to-t from-blue-500/20 to-blue-400/5 rounded-t-lg relative border-t border-x border-white/40 group-hover:bg-blue-500/30 transition-all duration-500">
                            <div className="absolute bottom-0 w-full h-[3px] bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const GrowthMock = () => (
    <div className="w-full h-full p-8 flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent opacity-60" />

        <div className="w-full max-w-[280px] space-y-5 relative z-10">
            {/* Skill Modules */}
            {[{ l: "System Design", p: 85 }, { l: "Cloud Architecture", p: 60 }, { l: "Team Leadership", p: 92 }].map((skill, i) => (
                <div key={i} className="bg-white/50 border border-white/60 rounded-xl p-4 shadow-sm backdrop-blur-sm group hover:bg-white/70 transition-colors">
                    <div className="flex justify-between text-[11px] items-center text-purple-900/70 font-bold tracking-wider mb-2">
                        <span>{skill.l.toUpperCase()}</span>
                        <span>{skill.p}%</span>
                    </div>
                    <div className="h-2 w-full bg-indigo-50 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.p}%` }}
                            transition={{ duration: 1.5, delay: 0.2 + (i * 0.2) }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] relative"
                        >
                            <div className="absolute right-0 top-0 h-full w-[2px] bg-white/50" />
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>

        {/* Badge */}
        <div className="absolute bottom-6 right-6">
            <div className="px-4 py-2 bg-white/80 rounded-full shadow-sm border border-purple-100/50 text-[10px] font-bold text-purple-600 flex items-center gap-2 backdrop-blur-md">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </div>
                Level 3 Engineer
            </div>
        </div>
    </div>
);

const PlanningMock = () => (
    <div className="w-full h-full p-6 flex gap-4 relative">
        <div className="absolute inset-0 bg-teal-50/10" />

        {/* Columns */}
        {["To Do", "In Progress"].map((col, i) => (
            <div key={i} className={`flex-1 h-full rounded-2xl border ${i === 0 ? 'bg-white/40 border-white/60' : 'bg-teal-50/30 border-teal-100/40'} flex flex-col p-3 gap-3 backdrop-blur-sm`}>
                <div className="flex items-center gap-2 px-1 mb-1">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-slate-300' : 'bg-teal-400'}`} />
                    <span className="text-[10px] uppercase font-bold text-slate-400">{col}</span>
                </div>

                {/* Cards */}
                <div className="w-full bg-white/80 rounded-xl p-4 shadow-sm border border-white/50 space-y-3 group hover:-translate-y-1 transition-transform duration-300">
                    <div className={`w-12 h-1 rounded-full ${i === 0 ? 'bg-orange-300' : 'bg-blue-300'}`} />
                    <div className="w-4/5 h-2 bg-slate-100 rounded-full" />
                    <div className="w-1/2 h-2 bg-slate-100 rounded-full" />
                </div>

                <div className="w-full bg-white/60 rounded-xl p-4 shadow-sm border border-white/50 space-y-3 opacity-70">
                    <div className={`w-8 h-1 rounded-full ${i === 0 ? 'bg-slate-300' : 'bg-green-300'}`} />
                    <div className="w-3/4 h-2 bg-slate-100 rounded-full" />
                </div>
            </div>
        ))}
    </div>
);

const ArchitectureMock = () => (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-orange-50/5">
        {/* Background Circles */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[120%] h-[120%] border border-orange-400/30 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[80%] h-[80%] border border-orange-400/20 rounded-full dashed" />
        </div>

        {/* Nodes Layout */}
        <div className="relative z-10 flex flex-col gap-8 items-center">
            {/* Main Node */}
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-orange-500/10 border border-orange-100 flex items-center justify-center relative">
                <Activity className="text-orange-500" size={28} />
                {/* Connection Points */}
                <div className="absolute -bottom-2 w-1 h-4 bg-orange-200" />
            </div>

            {/* Child Nodes */}
            <div className="flex gap-12 relative">
                <svg className="absolute top-0 left-0 w-full -translate-y-full h-8 overflow-visible" viewBox="0 0 100 32" preserveAspectRatio="none">
                    <path d="M 50 0 L 50 16 L 20 32" stroke="#fed7aa" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <path d="M 50 0 L 50 16 L 80 32" stroke="#fed7aa" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>

                <div className="w-14 h-14 bg-white/80 rounded-2xl shadow-lg border border-orange-50 flex items-center justify-center backdrop-blur-md">
                    <GitMerge className="text-orange-400" size={20} />
                </div>
                <div className="w-14 h-14 bg-white/80 rounded-2xl shadow-lg border border-orange-50 flex items-center justify-center backdrop-blur-md">
                    <Layout className="text-orange-400" size={20} />
                </div>
            </div>
        </div>
    </div>
);

const Mocks = [DashboardMock, GrowthMock, PlanningMock, ArchitectureMock];

// --- Card Component ---

const StackedCard = ({ item, index, total, scrollYProgress, reduceMotion }) => {
    // Precise scroll steps
    const step = 1 / total;
    const start = index * step;
    const end = start + step;

    // Transform Ranges
    const inputRange = [start - 0.15, start, end, end + 0.15];

    // Animations
    const scale = useTransform(scrollYProgress, inputRange, [1, 1, 1, 0.90]);
    const translateY = useTransform(scrollYProgress, inputRange, ["110%", "0%", "0%", "-10%"]);
    const opacity = useTransform(scrollYProgress, inputRange, [0, 1, 1, 0]);

    // Override for first card to prevent entry animation
    const inputRangeFirst = [0, step, step + 0.15];
    const scaleFirst = useTransform(scrollYProgress, inputRangeFirst, [1, 1, 0.90]);
    const translateYFirst = useTransform(scrollYProgress, inputRangeFirst, ["0%", "0%", "-10%"]);
    const opacityFirst = useTransform(scrollYProgress, inputRangeFirst, [1, 1, 0]);

    const style = reduceMotion
        ? { y: 0, opacity: 1, scale: 1 }
        : {
            y: index === 0 ? translateYFirst : translateY,
            scale: index === 0 ? scaleFirst : scale,
            opacity: index === 0 ? opacityFirst : opacity
        };

    const MockUI = Mocks[index] || DashboardMock;

    return (
        <motion.div
            style={{ ...style, zIndex: index }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4"
        >
            <div className={`
                relative 
                w-full max-w-[1200px]
                h-[min(680px,85vh)]
                bg-white/70 backdrop-blur-3xl
                rounded-[32px] 
                border border-white/60
                shadow-[0_40px_100px_-15px_rgba(0,0,0,0.12)]
                flex flex-col
                overflow-hidden
                group
                transform-gpu
            `}>
                {/* Light Sweep Effect (Hover) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Top System Bar */}
                <div className="h-11 w-full flex items-center px-6 border-b border-black/[0.04] bg-white/30 backdrop-blur-md relative z-20">
                    <div className="flex gap-2 opacity-80">
                        <div className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-black/5" />
                        <div className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-black/5" />
                        <div className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-black/5" />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] relative z-10">

                    {/* Background Big Number */}
                    <div className="absolute -top-6 right-6 text-[220px] font-bold text-black/[0.03] select-none pointer-events-none tracking-tighter mix-blend-multiply">
                        0{index + 1}
                    </div>

                    {/* Left: Text Content */}
                    <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center h-full">
                        <div className="relative">
                            {/* Label */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-[11px] font-extrabold tracking-[0.25em] text-black/50 uppercase">
                                    {item.label}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#0A0A0A] mb-6 leading-[1.05] tracking-tight">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[17px] md:text-[18px] text-[#444] leading-[1.7] font-medium mb-10 max-w-[540px]">
                                {item.desc}
                            </p>

                            {/* Bullets */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                {item.bullets.map((bullet, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className={`mt-1 w-4 h-4 rounded-full ${item.accent} bg-opacity-10 grid place-items-center`}>
                                            <CheckCircle2 className={`w-3 h-3 ${item.accent.replace('bg-', 'text-')}`} />
                                        </div>
                                        <span className="text-[14px] font-bold text-black/70">
                                            {bullet}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual Experience Panel */}
                    <div className="hidden lg:flex p-10 lg:pr-14 items-center justify-center">
                        <div className="w-full h-full max-h-[460px] bg-white/40 rounded-3xl border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] backdrop-blur-sm relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                            <MockUI />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function LifeAtEvolvex() {
    const containerRef = useRef(null);
    const reduceMotion = useReducedMotion();

    // 440vh for deeper scroll feel
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            ref={containerRef}
            id="life-at-evolvex"
            className="relative w-full h-[400vh] bg-[#FAFAFA] overflow-visible"
            style={{ position: 'relative' }}
        >
            {/* Background Aesthetics */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,1),_rgba(248,250,252,1))]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
            </div>

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4">
                <div className="relative w-full h-full flex items-center justify-center">
                    {FEATURES.map((feature, idx) => (
                        <StackedCard
                            key={feature.id}
                            item={feature}
                            index={idx}
                            total={FEATURES.length}
                            scrollYProgress={scrollYProgress}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
