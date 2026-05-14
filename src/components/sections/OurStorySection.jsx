"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

export default function OurStorySection() {

    return (
        <section className="bg-white">
            {/* Top Section with HeroHighlight Background */}
            <HeroHighlight containerClassName="pt-28 lg:pt-36 pb-12 overflow-hidden bg-white relative h-auto">
                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Eyebrow */}
                    <p className="text-center text-sm md:text-base tracking-[0.25em] font-semibold 
text-[#7C5CFF] mb-8 uppercase">
                        WHO WE ARE
                    </p>

                    {/* Heading with Highlight */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight max-w-4xl mx-auto"
                    >
                        We bring structure, intelligence, and
                        <br />
                        <Highlight className="bg-gradient-to-r from-[#5B8CFF] via-[#7C5CFF] to-[#B84CFF] bg-clip-text text-transparent">
                            clarity
                        </Highlight>{" "}
                        to digital systems.
                    </motion.h2>

                    {/* Intro */}
                    <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mt-8 mb-20">
                        We help businesses move from fragmented tools and manual workflows to unified, intelligent systems that scale with confidence.
                    </p>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-20 items-start">

                        {/* Story Text */}
                        <div className="text-gray-600 text-lg leading-relaxed space-y-6 mt-28">
                            <p>
                                Most organizations don’t fail because of lack of effort — they struggle because their systems are disconnected, inefficient, and difficult to scale.
                            </p>
                            <p>
                                At CognivexaAI, we solve this by designing structured digital ecosystems that are intuitive, automated, and built for long-term growth.
                            </p>
                        </div>

                        {/* Principle Cards */}
                        <div className="space-y-8">
                            {[
                                {
                                    title: "Clarity drives performance",
                                    desc: "Clear systems enable faster decisions and better execution.",
                                },
                                {
                                    title: "Structure enables scale",
                                    desc: "Strong foundations prevent breakdowns as your business grows.",
                                },
                                {
                                    title: "Technology serves people",
                                    desc: "We build solutions that enhance human productivity, not replace it.",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-md border border-white/60 hover:shadow-lg transition"
                                >
                                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                                    <p className="text-gray-600">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </HeroHighlight>

            {/* Bottom Section (Divider, Philosophy, Metrics) - No HeroHighlight Background */}
            <div className="max-w-7xl mx-auto px-6 pb-28 lg:pb-36">

                {/* Divider */}
                <div className="border-t border-gray-200 mb-24 mt-0"></div>

                {/* Philosophy Highlight Line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center text-2xl font-medium text-gray-900 max-w-3xl mx-auto"
                >
                    <Highlight className="bg-gradient-to-r from-[#5B8CFF] via-[#7C5CFF] to-[#B84CFF] bg-clip-text text-transparent">
                        Simplicity is not the absence of sophistication.
                    </Highlight>{" "}
                    It is the result of intelligent design.
                </motion.p>

                {/* Metrics */}
                <div className="flex justify-center gap-20 mt-16 text-center">
                    <div>
                        <p className="text-3xl font-semibold bg-gradient-to-r from-[#5B8CFF] via-[#7C5CFF] to-[#B84CFF] bg-clip-text text-transparent">
                            Focused
                        </p>
                        <p className="text-sm text-gray-500 tracking-wider">EARLY-STAGE</p>
                    </div>
                    <div>
                        <p className="text-3xl font-semibold bg-gradient-to-r from-[#5B8CFF] via-[#7C5CFF] to-[#B84CFF] bg-clip-text text-transparent">
                            Fast
                        </p>
                        <p className="text-sm text-gray-500 tracking-wider">EXECUTION CYCLES</p>
                    </div>
                    <div>
                        <p className="text-3xl font-semibold bg-gradient-to-r from-[#5B8CFF] via-[#7C5CFF] to-[#B84CFF] bg-clip-text text-transparent">
                            Expertise
                        </p>
                        <p className="text-sm text-gray-500 tracking-wider">MULTI-DOMAIN</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
