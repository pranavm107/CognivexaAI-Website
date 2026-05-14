import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ShowcaseProject from './src/models/ShowcaseProject.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const showcaseProjects = [
  {
    title: "AI Chatbot Platform",
    slug: "ai-chatbot-platform",
    shortDescription: "Intelligent customer support automation system.",
    image: "/images/portfolio/ai-chatbot.png",
    category: "AI",
    technologies: ["NLP", "OpenAI", "React"],
    ctaText: "View Case Study",
    ctaLink: "/portfolio/ai-chatbot",
    featured: true,
    active: true,
    order: 1
  },
  {
    title: "SaaS Analytics Dashboard",
    slug: "saas-analytics-dashboard",
    shortDescription: "Modern analytics platform for business growth.",
    image: "/images/portfolio/saas-dashboard.png",
    category: "SAAS",
    technologies: ["React", "Node.js", "PostgreSQL"],
    ctaText: "View Case Study",
    ctaLink: "/portfolio/saas-dashboard",
    featured: false,
    active: true,
    order: 2
  },
  {
    title: "Mobile Fitness App",
    slug: "mobile-fitness-app",
    shortDescription: "Cross-platform health tracking application.",
    image: "/images/portfolio/mobile-app.png",
    category: "MOBILE",
    technologies: ["React Native", "Firebase"],
    ctaText: "View Case Study",
    ctaLink: "/portfolio/mobile-fitness",
    featured: false,
    active: true,
    order: 3
  },
  {
    title: "IoT Smart Monitoring System",
    slug: "iot-smart-monitoring-system",
    shortDescription: "Real-time sensor data monitoring and control platform.",
    image: "/images/portfolio/iot-system.png",
    category: "IOT",
    technologies: ["IoT", "Python", "AWS"],
    ctaText: "View Case Study",
    ctaLink: "/portfolio/iot-system",
    featured: true,
    active: true,
    order: 4
  }
];

const seedShowcaseProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await ShowcaseProject.deleteMany({});
    console.log('Cleared existing showcase projects');

    await ShowcaseProject.insertMany(showcaseProjects);
    console.log('Showcase projects seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding showcase projects:', error);
    process.exit(1);
  }
};

seedShowcaseProjects();
