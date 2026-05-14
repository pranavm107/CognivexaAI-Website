import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Code, Zap } from 'lucide-react';
import { FadeUp, ScaleIn } from '../AnimationWrapper';

const promises = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Technical Excellence",
    desc: "We prioritize clean, maintainable code that scales with your growth. No technical debt, just high-performance engineering."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Absolute Transparency",
    desc: "You'll always know where your project stands. We provide detailed weekly updates and clear communication at every stage."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Long-term Scalability",
    desc: "We build systems that are future-proof. Your technology will be ready to handle increased load and complexity as you scale."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Radical Reliability",
    desc: "Our code is written for the real world. We ensure your systems run reliably in production environments with 24/7 stability."
  }
];

const CommitmentSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden" id="our-commitment">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(124,58,237,0.03)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <FadeUp>
            <span className="inline-block px-4 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-[#7c3aed] text-[11px] font-black uppercase tracking-[0.2em] mb-4">
              OUR COMMITMENT
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4">
              Our Commitment to Your Vision
            </h2>
            <p className="text-gray-500 text-lg">Engineering with integrity, scaling with purpose.</p>
          </FadeUp>
        </div>

        <ScaleIn className="mb-24">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-[#7c3aed] text-7xl font-serif mb-8 opacity-40 leading-none">“</div>
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-medium mb-12 italic max-w-4xl">
                At CognivexaAI, we don't just build software; we engineer the systems that power the next generation of business. Our commitment is to technical excellence and absolute transparency.
              </p>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-purple-500/20">
                  PM
                </div>
                <div>
                  <div className="text-white font-bold text-lg tracking-tight">Pranav M.</div>
                  <div className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">Founder, CognivexaAI</div>
                </div>
              </div>
            </div>
          </div>
        </ScaleIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#7c3aed] mb-8 shadow-sm group-hover:bg-[#7c3aed] group-hover:text-white transition-all duration-300">
                {promise.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">
                {promise.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {promise.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
