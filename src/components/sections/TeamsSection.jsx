import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Monitor, Wifi, Palette, Cpu } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../admin/services/apiClient';

const iconMap = { Brain, Monitor, Wifi, Palette, Cpu };

const themeMap = {
  purple: { gradient: "from-purple-600 to-indigo-600", lightBg: "from-purple-50 to-indigo-50", border: "border-purple-200", glow: "rgba(124,58,237,0.15)" },
  blue: { gradient: "from-blue-600 to-cyan-500", lightBg: "from-blue-50 to-cyan-50", border: "border-blue-200", glow: "rgba(59,130,246,0.15)" },
  teal: { gradient: "from-teal-600 to-green-500", lightBg: "from-teal-50 to-green-50", border: "border-teal-200", glow: "rgba(13,148,136,0.15)" },
  pink: { gradient: "from-pink-600 to-rose-500", lightBg: "from-pink-50 to-rose-50", border: "border-pink-200", glow: "rgba(236,72,153,0.15)" },
  orange: { gradient: "from-orange-600 to-amber-500", lightBg: "from-orange-50 to-amber-50", border: "border-orange-200", glow: "rgba(245,158,11,0.15)" },
  green: { gradient: "from-green-600 to-emerald-500", lightBg: "from-green-50 to-emerald-50", border: "border-green-200", glow: "rgba(16,185,129,0.15)" }
};

const AnimatedWords = ({ text, className = "", gradientClassName = "" }) => {
  const words = text.split(" ");
  return (
    <h2 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className={`inline-block mr-[0.25em] ${gradientClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
};

const TeamsSection = ({ variant = 'full' }) => {
  const [activeTeam, setActiveTeam] = useState(0);

  const { data: teamsRes, isLoading } = useQuery({
    queryKey: ['specialized-teams'],
    queryFn: () => apiClient.get('/specialized-teams?active=true')
  });

  const teamData = teamsRes?.results || [];

  if (isLoading) return <div className="py-20 text-center animate-pulse font-bold text-gray-400">Loading Team Excellence...</div>;
  if (!teamData.length) return null;

  const fullVariant = (
    <section className="py-[120px] relative overflow-hidden" 
             style={{ 
                 background: '#ffffff',
                 backgroundImage: 'radial-gradient(rgba(124,58,237,0.04) 1px, transparent 1px)',
                 backgroundSize: '28px 28px'
             }}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.07) 0%, transparent 55%)' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-purple-500 mb-6"
          >
            <span className="w-8 h-px bg-purple-400" /> OUR SPECIALIZED TEAMS <span className="w-8 h-px bg-purple-400" />
          </motion.span>
          <AnimatedWords text="Built by Dedicated Experts" className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-2" />
          <AnimatedWords text="Not Generalists" className="text-4xl md:text-5xl font-black leading-tight" gradientClassName="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="text-gray-500 text-lg max-w-2xl mx-auto text-center mt-6 leading-relaxed">
            Every solution is handled by a dedicated team of specialists — ensuring quality, speed, and scalability at every stage.
          </motion.p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-12 mb-16 flex-wrap">
          {teamData.map((team, i) => (
            <motion.button key={team._id} onClick={() => setActiveTeam(i)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${activeTeam === i ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg shadow-purple-200" : "bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600"}`}
            >
              {team.shortTitle || team.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTeam} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
            {(() => {
                const team = teamData[activeTeam];
                const style = themeMap[team.theme] || themeMap.purple;
                const IconComp = iconMap[team.icon] || Cpu;
                return (
                    <div className="relative rounded-3xl border overflow-hidden bg-white" style={{ borderColor: style.border, boxShadow: `0 32px 80px ${style.glow}` }}>
                      <div className={`h-1.5 w-full bg-gradient-to-r ${style.gradient}`} />
                      <div className={`p-8 md:p-10 bg-gradient-to-br ${style.lightBg}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div>
                            <div className="flex items-center gap-4 mb-6">
                              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-3xl shadow-lg text-white`}>
                                <IconComp size={28} />
                              </div>
                              <div>
                                <h3 className="text-2xl font-black text-gray-900">{team.name}</h3>
                                <p className={`text-sm font-semibold bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`}>{team.tagline}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">{team.description}</p>
                            {team.optionalHighlights?.length > 0 && (
                                <div className="flex gap-6 md:gap-8 mb-8">
                                    {team.optionalHighlights.map((stat, i) => (
                                        <div key={i}>
                                            <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent`}>{stat.value}</div>
                                            <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {(team.expertiseAreas || []).map((tag, i) => (
                                <span key={i} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${style.border} bg-white text-gray-700`}>{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Team Roles</h4>
                            {(team.teamRoles || []).map((role, i) => (
                              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-200 group">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shrink-0 text-white font-bold text-sm`}>{i + 1}</div>
                                <div>
                                  <h5 className="text-[14px] font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{role.title}</h5>
                                  <p className="text-[13px] text-gray-400 mt-0.5 leading-relaxed">{role.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                );
            })()}
          </motion.div>
        </AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 md:px-8 rounded-full border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shrink-0" />
            <p className="text-xs md:text-sm font-medium text-gray-700">We don't assign generalists — <span className="text-purple-700 font-bold">each product is owned by a dedicated domain team.</span></p>
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shrink-0 hidden md:block" />
          </div>
        </motion.div>
      </div>
    </section>
  );

  const miniVariant = (
    <section className="teams-section relative overflow-hidden bg-white" id="specialized-teams">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center px-3 py-1 bg-purple-100 rounded-full text-purple-600 text-[10px] font-bold uppercase tracking-[0.2em]">Our Structure</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built by <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Dedicated Experts</span></motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamData.map((team, i) => {
             const style = themeMap[team.theme] || themeMap.purple;
             const IconComp = iconMap[team.icon] || Cpu;
             return (
                <motion.div key={team._id} initial={{ opacity: 0, rotateY: -12, x: -20 }} whileInView={{ opacity: 1, rotateY: 0, x: 0 }} transition={{ duration: 0.6, delay: i * 0.12, ease: [0.4,0,0.2,1] }} viewport={{ once: true }} style={{ perspective: 800 }} whileHover={{ y: -6, transition: { duration: 0.25 } }} className="team-card group bg-white cursor-pointer">
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${style.gradient} mb-5`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-2xl mb-4 shadow-md text-white`}><IconComp size={24} /></div>
                <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-2">{team.name}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-4 min-h-[50px]">{team.tagline}</p>
                <div className="space-y-1.5">
                    {(team.teamRoles || []).slice(0, 2).map((role, j) => (
                    <div key={j} className="flex items-center gap-2 text-[12px] text-gray-500">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${style.gradient} shrink-0`} />
                        <span className="truncate">{role.title}</span>
                    </div>
                    ))}
                    {(team.teamRoles?.length > 2) && (
                        <div className="text-[11px] text-purple-500 font-semibold mt-2 pt-2 border-t border-gray-50">+{team.teamRoles.length - 2} more roles →</div>
                    )}
                </div>
                </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );

  return variant === 'full' ? fullVariant : miniVariant;
};

export default TeamsSection;
