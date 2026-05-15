import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Code, Users } from 'lucide-react';

const promises = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "No Outsourcing. Ever.",
    desc: "Your project is built directly by our core team. No freelancers, no handoffs, no surprises."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Weekly Updates",
    desc: "You'll always know where your project stands. We send progress updates every week, guaranteed."
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Production-Ready Code",
    desc: "We don't build demos. Every line of code is written to run reliably in the real world."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Direct Access to Founders",
    desc: "As an early-stage agency, you work directly with the people who built the system — not account managers."
  }
];

const Testimonials = () => {
  return (
    <section className="py-10 md:py-undefined bg-white relative overflow-hidden" id="our-promise">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(124,58,237,0.03)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 border border-purple-100 rounded-full text-purple-600 text-[11px] font-bold uppercase tracking-widest mb-4"
          >
            OUR COMMITMENT
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
          >
            What You Can Always <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">Expect From Us</span>
          </motion.h2>
        </div>

        {/* Vision Statement Card (Option A Integration) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.4,0,0.2,1] }}
          viewport={{ once: true }}
          className="founder-quote-card relative"
        >
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -ml-20 -mb-20"></div>
            
            <div className="relative z-10">
              <div className="text-purple-400 text-6xl font-serif mb-6 opacity-50">"</div>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium mb-8 italic">
                We're building CognivexaAI to be the agency we wished existed when we were clients — honest communication, clean code, and systems that actually work in production.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  PA
                </div>
                <div>
                  <div className="text-white font-bold">Pranav Agneesh</div>
                  <div className="text-white/50 text-sm">Founder, CognivexaAI</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="promise-grid">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4,0,0.2,1] }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="promise-card group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                {promise.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                {promise.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {promise.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
