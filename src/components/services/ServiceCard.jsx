import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Bot, Code2, Globe, Smartphone, Rocket, Zap, Cpu, Layout, Cloud, Boxes } from 'lucide-react';

export const iconMap = {
  Bot: <Bot className="w-7 h-7" />,
  Code2: <Code2 className="w-7 h-7" />,
  Globe: <Globe className="w-7 h-7" />,
  Smartphone: <Smartphone className="w-7 h-7" />,
  Rocket: <Rocket className="w-7 h-7" />,
  Zap: <Zap className="w-7 h-7" />,
  Cpu: <Cpu className="w-7 h-7" />,
  Layout: <Layout className="w-7 h-7" />,
  Cloud: <Cloud className="w-7 h-7" />,
  Boxes: <Boxes className="w-7 h-7" />
};

export const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service?.icon] || iconMap['Globe'];

  return (
    <div className="group relative h-full bg-white/70 backdrop-blur-sm rounded-[24px] border border-gray-100 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-200 flex flex-col p-8 overflow-hidden">
        {/* Hover gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-indigo-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-indigo-500/5 group-hover:to-blue-500/5 transition-all duration-500"></div>

        {/* Top colored accent */}
        <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r ${service?.accentGradient || 'from-blue-500 to-blue-400'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
            <div className={`w-14 h-14 rounded-2xl ${service?.backgroundColor || 'bg-blue-50'} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg`}>
                <div className={`${service?.iconColor || 'text-blue-600'}`}>
                    {IconComponent}
                </div>
            </div>

            <h3 className="text-2xl font-bold text-[#140a4f] mb-4 group-hover:text-purple-700 transition-colors duration-300">
                {service.title}
            </h3>

            <p className="text-gray-600 mb-8 line-clamp-2 text-sm leading-relaxed">
                {service.shortDescription}
            </p>

            <ul className="space-y-3 mb-8 flex-grow">
                {service.offerings && service.offerings.map((offering, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check className={`w-4 h-4 mt-0.5 ${service.iconColor} flex-shrink-0`} />
                        <span>{offering}</span>
                    </li>
                ))}
            </ul>

            <Link
                to="/contact"
                className="inline-flex items-center text-sm font-bold text-[#140a4f] group/btn hover:text-purple-600 transition-colors duration-300"
            >
                {service.ctaText || 'Explore Service'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
        </div>
    </div>
  );
};
