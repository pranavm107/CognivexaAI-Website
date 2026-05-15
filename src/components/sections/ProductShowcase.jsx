import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Link } from 'react-router-dom';
import DotGrid from '../ui/DotGrid';

const MacWindowControls = () => (
    <div className="absolute top-4 left-5 flex items-center gap-2 z-30">
        <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] shadow-inner" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-inner" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#28C840] shadow-inner" />
    </div>
);

const CodePanel = ({ title, status, lines }) => {
    const [activeLine, setActiveLine] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (lines && lines.length > 0) {
                const randomLine = Math.floor(Math.random() * lines.length);
                setActiveLine(randomLine);
                setTimeout(() => setActiveLine(-1), 1500);
            }
        }, 4000 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, [lines]);

    return (
        <div className="relative h-[420px] bg-white rounded-2xl overflow-hidden border border-gray-100 p-8 font-mono text-sm text-gray-700 shadow-xl group transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-200">
            {/* 1. Live Execution Light Sweep */}
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "200%", opacity: [0, 0.05, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent skew-x-12 pointer-events-none z-0 blur-xl"
            />

            <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4 relative z-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</span>
                {/* 5. Cloud Region Indicator */}
                <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-300 font-mono tracking-tight hidden sm:block">AWS · ap-south-1</span>
                    <span className="text-xs text-green-400 flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        {status}
                    </span>
                </div>
            </div>

            <div className="space-y-1 opacity-90 relative z-10">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: false }}
                        className={`px-1 -mx-1 rounded transition-colors duration-700 ${activeLine === i ? "bg-violet-500/10" : "bg-transparent"}`}
                    >
                        <span className="text-gray-500 mr-4 select-none w-4 inline-block">{i + 1}</span>
                        <span dangerouslySetInnerHTML={{ __html: line }} />
                    </motion.div>
                ))}
                {/* 4. Ghost Terminal Cursor */}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-2 h-4 bg-violet-500/30 align-middle ml-1"
                />
            </div>

            {/* 3. Micro Resource Activity Bars */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] flex items-end opacity-30 z-20 gap-[1px]">
                {/* CPU - Pulse */}
                <motion.div animate={{ height: ["20%", "80%", "30%"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-8 bg-violet-500 rounded-t-sm" />
                {/* Memory - Wave */}
                <motion.div animate={{ height: ["40%", "20%", "60%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-8 bg-blue-500 rounded-t-sm" />
                {/* Network - Flicker */}
                <motion.div animate={{ opacity: [0.3, 0.8, 0.4] }} transition={{ duration: 0.2, repeat: Infinity }} className="w-8 bg-emerald-500 h-full rounded-t-sm" />
            </div>

            <div className="absolute bottom-8 right-8 flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full z-20">
                {/* 6. Continuous Validation Pulse (Badge) */}
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-emerald-700 font-bold tracking-wide">System Validated</span>
            </div>
        </div>
    );
};

const ProductShowcase = ({ id }) => {
    const containerRef = useRef(null);
    const panelRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Track scroll progress within this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (panelRef.current) {
                const rect = panelRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);



    const springConfig = { stiffness: 300, damping: 30, bounce: 0 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // --- ANIMATION RANGES ---

    // 1. Expansion Phase (0 - 15%)
    // The panel grows from a small tab to full screen
    const width = useTransform(smoothProgress, [0, 0.15, 0.85, 1], ["90%", "100%", "100%", "90%"]);
    const height = useTransform(smoothProgress, [0, 0.15, 0.85, 1], ["80px", "100vh", "100vh", "90vh"]);
    const borderRadius = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [24, 0, 0, 24]);
    const tabContentOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
    const panelContentOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
    const panelY = useTransform(smoothProgress, [0.1, 0.2], [50, 0]);

    // Background Color Shift
    const backgroundColor = useTransform(
        smoothProgress,
        [0, 0.2, 0.85, 1],
        ["#ffffff", "#f9fafb", "#f9fafb", "#ffffff"]
    );

    // 2. Slide 1 (Infrastructure) (15% - 45%)
    // Enters at 15% (already technically visible via panelContentOpacity), stays until 45%
    const slide1Opacity = useTransform(smoothProgress, [0.15, 0.2, 0.45, 0.5], [0, 1, 1, 0]);
    const slide1Y = useTransform(smoothProgress, [0.15, 0.2, 0.45, 0.5], [50, 0, 0, -50]);
    const slide1Scale = useTransform(smoothProgress, [0.45, 0.5], [1, 0.95]); // Subtle shrink on exit

    // 3. Slide 2 (Deep System) (50% - 80%)
    const slide2Opacity = useTransform(smoothProgress, [0.45, 0.5, 0.8, 0.85], [0, 1, 1, 0]);
    const slide2Y = useTransform(smoothProgress, [0.45, 0.5, 0.8, 0.85], [50, 0, 0, -50]);

    // 4. Collapse / Exit Phase (85% - 100%)
    // We retain the last slide and return to "normal" width, then scroll away
    const finalScale = useTransform(smoothProgress, [0, 1], [1, 1]); // No scale down
    const finalOpacity = useTransform(smoothProgress, [0, 1], [1, 1]); // No fade out

    const Badge = ({ text }) => (
        <div className="px-4 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-widest">
            {text}
        </div>
    );

    const ShowcaseImage = ({ src }) => (
        <div className="relative h-[420px] w-full flex items-center justify-center">
            <div className="relative w-full h-full bg-gradient-to-tr from-[#1a1a2e] to-[#16213e] rounded-xl border border-white/10 shadow-2xl p-4 overflow-hidden group">
                <img src={src} className="w-full h-full object-cover rounded-lg opacity-90 group-hover:scale-105 transition-transform duration-700" />
            </div>
        </div>
    );



    const SlideIndicator = () => {
        const i1Color = useTransform(smoothProgress, [0.15, 0.36], ["#7c3aed", "#94a3b8"]);
        const i2Color = useTransform(smoothProgress, [0.15, 0.34, 0.36, 0.54], ["#94a3b8", "#94a3b8", "#7c3aed", "#94a3b8"]);
        const i3Color = useTransform(smoothProgress, [0.34, 0.52, 0.54, 0.72], ["#94a3b8", "#94a3b8", "#7c3aed", "#94a3b8"]);
        const i4Color = useTransform(smoothProgress, [0.52, 0.70, 0.72, 1.0], ["#94a3b8", "#94a3b8", "#7c3aed", "#7c3aed"]);

        // Helper to ensure default color is faint white if no range active (fallback)
        // Note: useTransform ranges interpolate, so precise checkpoints ensure clean switches

        return (
            <div className="absolute bottom-8 left-8 z-30 hidden md:block select-none pointer-events-none">
                <div className="flex flex-col gap-1.5 font-mono text-[10px] tracking-widest font-medium">
                    <motion.div style={{ color: i1Color }} className="transition-colors duration-300">01 PRODUCT ENGINEERING</motion.div>
                    <motion.div style={{ color: i2Color }} className="transition-colors duration-300">02 CUSTOM SOFTWARE</motion.div>
                    <motion.div style={{ color: i3Color }} className="transition-colors duration-300">03 MOBILE APPS</motion.div>
                    <motion.div style={{ color: i4Color }} className="transition-colors duration-300">04 AI SYSTEMS</motion.div>
                </div>
            </div>
        )
    };








    return (
        <section
            id={id}
            ref={containerRef}
            className="relative h-[500vh] bg-transparent mb-40" // Increased height to slow down scroll animation
            style={{ zIndex: 50, position: 'relative' }}
        >
            <div className="sticky top-0 min-h-[100svh] w-full flex items-center justify-center overflow-hidden">

                {/* Expanding Panel */}
                <motion.div
                    ref={panelRef}
                    style={{
                        width,
                        height,
                        borderRadius,
                        backgroundColor,
                        scale: finalScale,
                        opacity: finalOpacity,
                    }}
                    className="relative shadow-2xl shadow-purple-500/5 border border-gray-100 overflow-hidden flex flex-col items-center justify-center cursor-none"
                >
                    <MacWindowControls />
                    <SlideIndicator />

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[40] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

                    {/* Edge Light Tracking Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-1000"
                        style={{
                            // Background glow removed as per request
                        }}
                    >
                        <motion.span
                            className="anim-pointer absolute z-50 text-blue-500 pointer-events-none opacity-100 transition-opacity duration-300"
                            style={{
                                top: mouseY,
                                left: mouseX,
                                transform: 'translate(-50%, -50%)' // Center the pointer on the mouse
                            }}
                        >
                            <svg stroke="#6C4CF4" fill="#6C4CF4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                                viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 -rotate-90">
                                <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
                            </svg>
                        </motion.span>
                    </div>

                    {/* Glowing Accent (Subtle) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />

                    {/* --- INITIAL TAB CONTENT (The Intro Panel) --- */}
                    <motion.div
                        style={{ opacity: tabContentOpacity }}
                        className="absolute inset-0 bg-[linear-gradient(135deg,#0B0F1A,#141B2D,#1A1F3A)] overflow-hidden flex items-center justify-between px-6 md:px-12"
                    >
                        {/* Vignette & Texture Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay pointer-events-none z-0" />
                        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none z-20" />

                        {/* DotGrid Background Animation */}
                        <div className="absolute inset-0 z-0 opacity-60 pointer-events-none md:pointer-events-auto">
                            <DotGrid
                                dotSize={2}
                                gap={24}
                                baseColor="#271E37"
                                activeColor="#6c4cf4"
                                proximity={120}
                                shockRadius={200}
                                shockStrength={5}
                                resistance={750}
                                returnDuration={1.5}
                                neural={true} // Activate neural lines
                            />
                        </div>

                        {/* LEFT SIDE: Title & Badge */}
                        <div className="flex items-center gap-6 relative z-10 w-full max-w-4xl mx-auto md:mx-0">
                            {/* Icon Badge - Removed as per request */}
                            {/* Text Info */}
                            {/* Text Info */}
                            <div className="flex flex-col">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
                                    The Future of <motion.span animate={{ opacity: [1, 0.8, 1] }} transition={{ duration: 4, repeat: Infinity }} className="text-purple-600">Intelligent Engineering</motion.span>
                                </h2>
                                <p className="text-lg text-gray-600 font-medium mt-3 tracking-wide">
                                    Where software, systems, and intelligence converge
                                </p>
                                <p className="text-sm text-gray-400 mt-4 font-normal max-w-2xl hidden md:block">
                                    Explore scalable platforms, real-time architecture, mobile ecosystems, and AI-driven automation — engineered for performance, resilience, and growth.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Scroll Indicator */}
                        <div className="hidden lg:flex flex-col items-end gap-3 relative z-10 min-w-max pl-10 border-l border-gray-100 ml-10">
                            <span className="text-gray-400 text-xs font-bold tracking-[0.25em] uppercase text-right leading-relaxed">
                                Scroll to <br /> Explore Lab
                            </span>
                            <motion.div
                                animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center -space-y-3"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5">
                                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* --- FULL SCREEN CONTENT --- */}
                    <motion.div
                        style={{ opacity: panelContentOpacity, y: panelY }}
                        className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 flex items-center justify-center"
                    >

                        {/* SLIDE 1: Infrastructure Canvas */}
                        {/* SLIDE 1 — Product Engineering */}
                        <motion.div
                            style={{
                                opacity: useTransform(smoothProgress, [0.15, 0.2, 0.32, 0.36], [0, 1, 1, 0]),
                                y: useTransform(smoothProgress, [0.15, 0.2, 0.32, 0.36], [50, 0, 0, -50]),
                                x: useTransform(smoothProgress, [0.15, 0.36], [0, -20]) // Subtle parallax exit
                            }}
                            className="absolute inset-0 flex items-center justify-center z-10"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-undefined items-center w-full">
                                <div className="space-y-8 lg:pl-10 text-left">
                                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">Product Engineering</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        We design and build scalable, resilient digital products from the ground up.
                                        From architecture planning to production deployment, our engineering teams
                                        transform complex ideas into high-performance platforms.
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        <Badge text="Cloud-native" />
                                        <Badge text="Scalable Backend" />
                                        <Badge text="DevOps & CI/CD" />
                                    </div>
                                    <div className="pt-8">
                                        <Link to="/contact" className="inline-flex px-8 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all hover:scale-105 shadow-lg shadow-purple-500/20 active:scale-95">
                                            Start a Similar Project
                                        </Link>
                                    </div>
                                </div>
                                <CodePanel
                                    title="infrastructure.tf"
                                    status="Provisioned"
                                    lines={[
                                        `<span class="text-purple-400">provider</span> <span class="text-green-300">"aws"</span> {`,
                                        `&nbsp;&nbsp;region = <span class="text-yellow-300">"ap-south-1"</span>`,
                                        `}`,
                                        ``,
                                        `<span class="text-purple-400">module</span> <span class="text-green-300">"platform_core"</span> {`,
                                        `&nbsp;&nbsp;source  = <span class="text-yellow-300">"./modules/core"</span>`,
                                        `&nbsp;&nbsp;vpc_cidr = <span class="text-yellow-300">"10.0.0.0/16"</span>`,
                                        `}`,
                                        ``,
                                        `<span class="text-purple-400">resource</span> <span class="text-green-300">"aws_autoscaling_group"</span> <span class="text-blue-300">"app_cluster"</span> {`,
                                        `&nbsp;&nbsp;desired_capacity = <span class="text-yellow-300">3</span>`,
                                        `&nbsp;&nbsp;max_size         = <span class="text-yellow-300">6</span>`,
                                        `}`,
                                        ``,
                                        `<span class="text-gray-600"># Cloud-native platform deployed</span>`
                                    ]}
                                />

                            </div>
                        </motion.div>

                        {/* SLIDE 2 — Custom Software */}
                        <motion.div
                            style={{
                                opacity: useTransform(smoothProgress, [0.32, 0.36, 0.5, 0.54], [0, 1, 1, 0]),
                                y: useTransform(smoothProgress, [0.32, 0.36, 0.5, 0.54], [50, 0, 0, -50]),
                                x: useTransform(smoothProgress, [0.36, 0.54], [0, -20])
                            }}
                            className="absolute inset-0 flex items-center justify-center z-10"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-undefined items-center w-full">
                                <div className="space-y-8 lg:pl-10 text-left">
                                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">Custom Software Development</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Every business has unique workflows. We craft tailored software solutions
                                        that solve operational challenges while ensuring flexibility and scalability.
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        <Badge text="Enterprise software solutions" />
                                        <Badge text="Workflow automation" />
                                        <Badge text="System integrations" />
                                    </div>
                                    <div className="pt-6">
                                        <Link to="/contact" className="inline-flex px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium transition-all hover:scale-105 active:scale-95">
                                            Start a Similar Project
                                        </Link>
                                    </div>
                                </div>
                                <CodePanel
                                    title="enterprise.service.ts"
                                    status="Running"
                                    lines={[
                                        `<span class="text-purple-400">class</span> <span class="text-green-300">WorkflowEngine</span> {`,
                                        `&nbsp;&nbsp;<span class="text-purple-400">async</span> <span class="text-blue-300">processOrder</span>(data) {`,
                                        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">await</span> validateInput(data);`,
                                        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">await</span> integrateERP(data);`,
                                        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-purple-400">return</span> automateApproval(data);`,
                                        `&nbsp;&nbsp;}`,
                                        `}`,
                                        ``,
                                        `<span class="text-purple-400">router</span>.post(<span class="text-yellow-300">"/workflow"</span>, executeWorkflow);`,
                                        `<span class="text-purple-400">router</span>.get(<span class="text-yellow-300">"/reports"</span>, generateReports);`,
                                        ``,
                                        `<span class="text-gray-600"># Enterprise integrations active</span>`
                                    ]}
                                />

                            </div>
                        </motion.div>

                        {/* SLIDE 3 — Mobile Apps */}
                        <motion.div
                            style={{
                                opacity: useTransform(smoothProgress, [0.5, 0.54, 0.68, 0.72], [0, 1, 1, 0]),
                                y: useTransform(smoothProgress, [0.5, 0.54, 0.68, 0.72], [50, 0, 0, -50]),
                                x: useTransform(smoothProgress, [0.54, 0.72], [0, -20])
                            }}
                            className="absolute inset-0 flex items-center justify-center z-10"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-undefined items-center w-full">
                                <div className="space-y-8 lg:pl-10 text-left">
                                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">Mobile App Development</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        We build secure, intuitive, and high-performance mobile applications
                                        for iOS, Android, and cross-platform environments.
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        <Badge text="Native & cross-platform apps" />
                                        <Badge text="UI/UX-driven design" />
                                        <Badge text="Performance optimization" />
                                    </div>
                                    <div className="pt-6">
                                        <Link to="/contact" className="inline-flex px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium transition-all hover:scale-105 active:scale-95">
                                            Start a Similar Project
                                        </Link>
                                    </div>
                                </div>
                                <CodePanel
                                    title="MobileApp.jsx"
                                    status="Live"
                                    lines={[
                                        `<span class="text-purple-400">import</span> <span class="text-green-300">React</span> <span class="text-purple-400">from</span> <span class="text-yellow-300">"react"</span>;`,
                                        `<span class="text-purple-400">import</span> { View, Text } <span class="text-purple-400">from</span> <span class="text-yellow-300">"react-native"</span>;`,
                                        ``,
                                        `<span class="text-purple-400">export default function</span> <span class="text-green-300">Dashboard</span>() {`,
                                        `&nbsp;&nbsp;<span class="text-purple-400">return</span> (`,
                                        `&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="text-blue-300">View</span>&gt;`,
                                        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="text-blue-300">Text</span>&gt;Welcome User&lt;/<span class="text-blue-300">Text</span>&gt;`,
                                        `&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span class="text-blue-300">View</span>&gt;`,
                                        `&nbsp;&nbsp;);`,
                                        `}`,
                                        ``,
                                        `<span class="text-gray-600"># Cross-platform mobile UI rendered</span>`
                                    ]}
                                />

                            </div>
                        </motion.div>

                        {/* SLIDE 4 — AI */}
                        <motion.div
                            style={{
                                opacity: useTransform(smoothProgress, [0.68, 0.72], [0, 1]),
                                y: useTransform(smoothProgress, [0.68, 0.72], [50, 0])
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-undefined items-center w-full">
                                <div className="space-y-8 lg:pl-10 text-left">
                                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">Artificial Intelligence & Automation</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Leverage intelligent systems to automate decisions, streamline operations,
                                        and unlock data-driven growth.
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        <Badge text="Machine Learning solutions" />
                                        <Badge text="Predictive analytics" />
                                        <Badge text="Intelligent process automation" />
                                    </div>
                                    <div className="pt-6 relative z-50">
                                        <Link to="/contact" className="inline-flex px-6 py-3 rounded-lg bg-[#6C4CF4] hover:bg-[#5b3ddb] text-white font-medium transition-colors shadow-lg shadow-purple-900/30 cursor-pointer relative z-50 pointer-events-auto">
                                            Start a Similar Project
                                        </Link>
                                    </div>
                                </div>
                                <CodePanel
                                    title="ai_pipeline.py"
                                    status="Optimized"
                                    lines={[
                                        `<span class="text-purple-400">from</span> sklearn.ensemble <span class="text-purple-400">import</span> RandomForestClassifier`,
                                        `<span class="text-purple-400">from</span> sklearn.preprocessing <span class="text-purple-400">import</span> StandardScaler`,
                                        ``,
                                        `scaler = StandardScaler()`,
                                        `X_train = scaler.fit_transform(data)`,
                                        ``,
                                        `model = RandomForestClassifier(n_estimators=<span class="text-yellow-300">120</span>)`,
                                        `model.fit(X_train, y_train)`,
                                        ``,
                                        `predictions = model.predict(live_input)`,
                                        `<span class="text-gray-600"># Intelligent decision engine active</span>`
                                    ]}
                                />

                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductShowcase;
