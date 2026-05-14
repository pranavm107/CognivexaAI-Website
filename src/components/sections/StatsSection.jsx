import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    value: "5+",
    label: "Years Combined Experience",
    icon: "⚡",
    subtext: "Across AI, web & mobile"
  },
  {
    value: "10+",
    label: "Technologies Mastered",
    icon: "🛠️",
    subtext: "React, Node, Python, OpenAI & more"
  },
  {
    value: "3",
    label: "Specialized Teams",
    icon: "👥",
    subtext: "AI · Web · IoT & Design"
  },
  {
    value: "100%",
    label: "Dedicated Attention",
    icon: "🎯",
    subtext: "No outsourcing, ever"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
