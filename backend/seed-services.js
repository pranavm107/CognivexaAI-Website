import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import Service from './src/models/Service.model.js';

const services = [
    {
        title: "AI & Automation Solutions",
        slug: "ai-automation-solutions",
        shortDescription: "Streamline operations with intelligent automation and conversational AI.",
        icon: "Bot",
        iconColor: "text-purple-600",
        backgroundColor: "bg-purple-50",
        accentGradient: "from-purple-500 to-purple-400",
        offerings: [
            "AI Chatbots & Virtual Assistants",
            "Business Process Automation",
            "Custom AI Model Integration",
            "Natural Language Processing"
        ],
        active: true,
        order: 1
    },
    {
        title: "Custom Software Development",
        slug: "custom-software-development",
        shortDescription: "Tailor-made software built to solve your unique business challenges.",
        icon: "Code2",
        iconColor: "text-indigo-600",
        backgroundColor: "bg-indigo-50",
        accentGradient: "from-indigo-500 to-indigo-400",
        offerings: [
            "Enterprise Resource Planning (ERP)",
            "Customer Relationship Management (CRM)",
            "API Development & Integration",
            "Legacy System Modernization"
        ],
        active: true,
        order: 2
    },
    {
        title: "Web Development",
        slug: "web-development",
        shortDescription: "High-performance websites and web applications for a digital-first world.",
        icon: "Globe",
        iconColor: "text-blue-600",
        backgroundColor: "bg-blue-50",
        accentGradient: "from-blue-500 to-blue-400",
        offerings: [
            "Full-stack Web Applications",
            "E-commerce Solutions",
            "Progressive Web Apps (PWA)",
            "CMS Development"
        ],
        active: true,
        order: 3
    },
    {
        title: "Mobile App Development",
        slug: "mobile-app-development",
        shortDescription: "Seamless mobile experiences that connect you with your users anywhere.",
        icon: "Smartphone",
        iconColor: "text-teal-600",
        backgroundColor: "bg-teal-50",
        accentGradient: "from-teal-500 to-teal-400",
        offerings: [
            "iOS & Android Native Apps",
            "Cross-platform (React Native/Flutter)",
            "App Store Optimization",
            "Mobile UI/UX Design"
        ],
        active: true,
        order: 4
    },
    {
        title: "Startup MVP Development",
        slug: "startup-mvp-development",
        shortDescription: "From concept to launch, we help you build and scale your vision quickly.",
        icon: "Rocket",
        iconColor: "text-orange-600",
        backgroundColor: "bg-orange-50",
        accentGradient: "from-orange-500 to-orange-400",
        offerings: [
            "Product Strategy & Roadmap",
            "Rapid Prototyping",
            "Feature Prioritization",
            "Iterative Development"
        ],
        active: true,
        order: 5
    },
    {
        title: "AI Tools & Integrations",
        slug: "ai-tools-integrations",
        shortDescription: "Enhance your existing products with cutting-edge AI capabilities.",
        icon: "Zap",
        iconColor: "text-pink-600",
        backgroundColor: "bg-pink-50",
        accentGradient: "from-pink-500 to-pink-400",
        offerings: [
            "Generative AI Implementations",
            "Data Analysis & Visualization",
            "Predictive Analytics",
            "Computer Vision Solutions"
        ],
        active: true,
        order: 6
    },
    {
        title: "IoT Solutions",
        slug: "iot-solutions",
        shortDescription: "Connect your hardware and software for a truly integrated ecosystem.",
        icon: "Cpu",
        iconColor: "text-emerald-600",
        backgroundColor: "bg-emerald-50",
        accentGradient: "from-emerald-500 to-emerald-400",
        offerings: [
            "Smart Device Integration",
            "Real-time Monitoring Systems",
            "IoT Dashboard Development",
            "Connectivity Solutions"
        ],
        active: true,
        order: 7
    },
    {
        title: "UI/UX + DevOps & Support",
        slug: "ui-ux-devops-support",
        shortDescription: "Design-driven development backed by robust infrastructure and support.",
        icon: "Layout",
        iconColor: "text-cyan-600",
        backgroundColor: "bg-cyan-50",
        accentGradient: "from-cyan-500 to-cyan-400",
        offerings: [
            "User Research & Wireframing",
            "High-fidelity UI Design",
            "CI/CD Pipeline Setup",
            "24/7 Technical Support"
        ],
        active: true,
        order: 8
    }
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    console.log('Connected to MongoDB');
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log('Services seeded successfully');
    process.exit(0);
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
});
