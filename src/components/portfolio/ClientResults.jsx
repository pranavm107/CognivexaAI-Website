import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const Counter = ({ value, suffix = "", prefix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
        });
        return () => controls.stop();
    }, [value]);

    return (
        <span>
            {prefix}{displayValue}{suffix}
        </span>
    );
};

const results = [
    {
        id: 1,
        number: 10,
        label: "Projects Delivered",
        suffix: "+",
        color: "from-purple-500 to-indigo-500"
    },
    {
        id: 2,
        number: 95,
        label: "Client Satisfaction",
        suffix: "%",
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        number: 3,
        label: "Faster Delivery",
        suffix: "x",
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: 4,
        number: 50,
        label: "Value Generated",
        prefix: "₹",
        suffix: "L+",
        color: "from-orange-500 to-pink-500"
    }
];

const ClientResults = () => {
    return (
        <section className="py-24 bg-[#030712] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-900/10 blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Results That Matter</h2>
                    <p className="text-gray-400">Our impact across industries through technology and innovation.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {results.map((result) => (
                        <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: result.id * 0.1 }}
                            className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 text-center hover:bg-white/[0.08] transition-colors"
                        >
                            {/* Glowing Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                            
                            <div className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r ${result.color} text-transparent bg-clip-text`}>
                                <Counter 
                                    value={result.number} 
                                    suffix={result.suffix} 
                                    prefix={result.prefix} 
                                />
                            </div>
                            
                            <div className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                                {result.label}
                            </div>
                            
                            {/* Subtle Glow Under Number */}
                            <div className={`mt-4 mx-auto w-12 h-1 bg-gradient-to-r ${result.color} rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientResults;
