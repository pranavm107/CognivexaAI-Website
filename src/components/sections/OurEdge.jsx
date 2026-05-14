import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, MessageSquare, Code2, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

// --- Sub-components for Animations ---

const TerminalUI = () => {
  const [lines, setLines] = React.useState([
    { text: "Initializing AI engine...", color: "text-gray-400" },
  ]);

  React.useEffect(() => {
    const sequence = [
      { text: "Analyzing query...", color: "text-gray-400", delay: 1500 },
      { text: "Intent: 'automated_workflow'", color: "text-purple-400", delay: 3000 },
      { text: "Confidence: 0.992", color: "text-blue-400", delay: 4500 },
      { text: "Generating response...", color: "text-green-400", delay: 6000 },
      { text: "Done.", color: "text-gray-400", delay: 7500 },
    ];

    const timeouts = sequence.map((step, i) => {
      return setTimeout(() => {
        setLines(prev => [...prev, step]);
        if (i === sequence.length - 1) {
          setTimeout(() => setLines([{ text: "Initializing AI engine...", color: "text-gray-400" }]), 2000);
        }
      }, step.delay);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full bg-[#0B0F1A] rounded-xl p-4 font-mono text-[11px] border border-white/5 shadow-2xl overflow-hidden relative group-hover:border-purple-500/30 transition-colors">
      <div className="flex gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i + line.text}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-start gap-2 ${line.color}`}
          >
            <span className="text-purple-500/70">{">"}</span>
            <span>{line.text}</span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1.5 h-3.5 bg-purple-500 ml-1 translate-y-0.5"
        />
      </div>
      
      {/* Decorative scanline */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

const RapidIterationVisual = () => {
  return (
    <div className="mt-4 bg-gray-50 rounded-xl p-4">
      <div className="space-y-2">
        {["Prototype", "Iterate", "Deploy"].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-500 text-xs font-bold">{i+1}</span>
            </div>
            <div className="h-2 bg-orange-200 rounded-full flex-1" 
              style={{ width: `${100 - i*20}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardPreview = () => {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-3 space-y-3 overflow-hidden group-hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="w-16 h-2 bg-gray-100 rounded" />
        <div className="w-8 h-2 bg-purple-100 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-10 bg-purple-50 rounded-lg animate-pulse" />
        <div className="h-10 bg-blue-50 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="h-10 bg-indigo-50 rounded-lg animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
      <div className="space-y-1.5">
        <div className="w-full h-1.5 bg-gray-50 rounded" />
        <div className="w-3/4 h-1.5 bg-gray-50 rounded" />
      </div>
    </div>
  );
};

const PipelineVisual = () => {
  return (
    <div className="space-y-2 mt-4">
      {[
        { label: "CONCEPT", color: "gray", active: true },
        { label: "MVP BUILD", color: "purple", active: true },
        { label: "TESTING", color: "blue", active: true },
        { label: "LAUNCH", color: "green", active: true, icon: "⚡" }
      ].map((step, i) => (
        <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg
          ${step.active ? 'bg-white border border-gray-100 shadow-sm' : 'opacity-40'}`}>
          <div className={`w-2 h-2 rounded-full bg-${step.color}-400`} />
          <span className="text-xs font-semibold text-gray-700 tracking-wide">
            {step.icon} {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const OurEdge = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-28 relative overflow-hidden bg-white" id="why-us">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-100/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <ScrollReveal variant="heading">
            <div className="inline-flex items-center px-4 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-purple-600 text-[11px] font-bold uppercase tracking-widest shadow-sm mb-4">
              Our Differentiators
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Built Different.<br />
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-transparent bg-clip-text">
                Delivered Better.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="text">
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              We don't just build software; we engineer competitive advantages 
              through AI-first principles and radical transparency.
            </p>
          </ScrollReveal>
        </div>

        {/* Asymmetric Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* 1. Featured Card: AI-First Engineering */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 group relative rounded-[2rem] bg-white border border-gray-100 p-8 md:p-10 shadow-sm hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            {/* Gradient Border/Glow effect */}
            <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/20 rounded-[2rem] transition-colors pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-100/30 blur-[60px] rounded-full group-hover:bg-purple-200/40 transition-colors" />

            <div className="flex flex-col lg:flex-row gap-10 relative z-10 h-full">
              <div className="flex-1 space-y-6">
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Brain className="w-7 h-7" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    AI-First Engineering
                  </h3>
                  <p className="text-gray-600 text-[16px] leading-relaxed">
                    We don't "add" AI. We build from the ground up with 
                    intelligence at the core. Every system is optimized for 
                    automated reasoning, predictive analytics, and LLM orchestration.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['GPT-4o', 'Claude 3.5', 'LangChain', 'PyTorch'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-gray-100 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-100 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terminal UI Animation */}
              <div className="lg:w-64 xl:w-80 flex-shrink-0 self-center">
                <TerminalUI />
              </div>
            </div>
          </motion.div>

          {/* 2. Tall Card: Fast Delivery */}
          <motion.div
            variants={cardVariants}
            className="md:row-span-2 group relative rounded-[2rem] bg-gray-50/50 border border-gray-100 p-8 md:p-10 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
          >
            <div className="space-y-6 flex-1">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-100 group-hover:scale-110 group-hover:rotate-[-3deg] transition-transform duration-300">
                <Zap className="w-7 h-7" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Rapid Iteration
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Speed is our superpower. We deploy working prototypes in days, 
                  not months. Our agile process ensures you see value immediately.
                </p>
              </div>
            </div>

            {/* Rapid Iteration Animation */}
            <div className="mt-auto">
              <RapidIterationVisual />
            </div>
          </motion.div>

          {/* 3. Small Card: Transparency */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[2rem] bg-white border border-gray-100 p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Radical Transparency
                </h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  Direct Slack access, weekly syncs, and real-time project boards. 
                  No hidden costs, no surprises.
                </p>
              </div>
              
              <DashboardPreview />
            </div>
          </motion.div>

          {/* 4. Small Card: Production Ready */}
          <motion.div
            variants={cardVariants}
            className="group relative rounded-[2rem] bg-white border border-gray-100 p-8 shadow-sm hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-100 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Production Ready
                </h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">
                  Clean code, full documentation, and CI/CD baked in. 
                  We build for the long haul.
                </p>
              </div>

              <PipelineVisual />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <ScrollReveal variant="button" className="mt-20 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 group px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
          >
            Experience the Edge
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default OurEdge;
