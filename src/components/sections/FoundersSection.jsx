import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";

const founders = [
  {
    name: "Pranav Agneesh M",
    role: "Founder & CEO",
    bio: "AI engineer and full-stack architect with a passion for building intelligent systems that solve real business problems. Specializes in LLM integration, automation, and scalable backend architecture.",
    highlights: ["AI & LLM Systems", "Full-Stack Development", "10+ Projects Built", "Automation Expert"],
    avatar: "PA",
    gradient: "from-purple-600 to-indigo-600",
    socials: {
      linkedin: "https://linkedin.com/in/praneeth-kumar",
      github: "https://github.com/praneeth-kumar",
      twitter: "#"
    }
  },
  {
    name: "Nagasundaram PB",
    role: "Co-Founder & CTO",
    bio: "Product strategist and developer focused on SaaS architecture, MVP execution, and growth engineering. Bridges the gap between user experience and technical excellence.",
    highlights: ["SaaS & MVP Building", "Product Strategy", "UI/UX Engineering", "Growth Systems"],
    avatar: "PM",
    gradient: "from-blue-600 to-cyan-500",
    socials: {
      linkedin: "https://linkedin.com/in/pranav-m",
      github: "https://github.com/pranavm107",
      twitter: "#"
    }
  }
];

export default function FoundersSection({ variant = "full" }) {
  return (
    <section className={`py-10 md:py-undefined px-4 bg-white relative overflow-hidden ${variant === 'mini' ? 'bg-gray-50/30' : ''}`}>

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-50 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-50 blur-[120px] rounded-full -translate-y-1/2" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#7c3aed 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-purple-500 mb-4">
            THE TEAM
          </span>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Meet the{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Founders
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Built by engineers who understand business, not just code.
          </p>
        </motion.div>

        {/* Founder Cards Grid */}
        <div className={`grid grid-cols-1 ${variant === 'mini' ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2'} gap-8`}>
          {founders.map((founder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-2xl hover:shadow-purple-100/60 hover:border-purple-200 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient corner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${founder.gradient} opacity-5 blur-2xl rounded-full`} />
              </div>

              {/* Top row — Avatar + Name + Role */}
              <div className="flex items-center gap-5 mb-6">
                {/* Avatar */}
                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${founder.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {founder.avatar}
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                    {founder.name}
                  </h3>
                  <span className={`inline-block mt-1 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-gradient-to-r ${founder.gradient} text-white`}>
                    {founder.role}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className={`h-px w-full bg-gradient-to-r ${founder.gradient} opacity-20 mb-6`} />

              {/* Bio */}
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                {founder.bio}
              </p>

              {/* Highlight tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {founder.highlights.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: founder.socials.linkedin, label: "LinkedIn" },
                  { icon: Github, href: founder.socials.github, label: "GitHub" },
                  { icon: Twitter, href: founder.socials.twitter, label: "Twitter" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-purple-100 bg-purple-50/50">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-sm text-gray-600 font-medium">
              We don't just build projects —{" "}
              <span className="text-purple-700 font-semibold">
                we build scalable systems that drive real results.
              </span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
