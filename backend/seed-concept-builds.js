import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ConceptBuild from './src/models/ConceptBuild.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const builds = [
  {
    title: "AI Customer Support System",
    slug: "ai-customer-support-system",
    description: "A fully functional LLM-based support system with conversation memory, smart escalation logic, and an admin dashboard. Built as a concept — production-ready and customizable.",
    badge: "CONCEPT BUILD",
    statusTitle: "Production Ready",
    statusSubtitle: "STATUS",
    image: "/images/portfolio/how-we-build-1.png",
    ctaText: "Explore This Build →",
    ctaLink: "/portfolio",
    alignment: "left",
    order: 1,
    active: true
  },
  {
    title: "Real-Time Analytics Dashboard",
    slug: "real-time-analytics-dashboard",
    description: "High-performance data visualization with live data streams, customizable widgets, and role-based access control. Full-stack concept build — adaptable to any stack.",
    badge: "INTERNAL BUILD",
    statusTitle: "Live Demo",
    statusSubtitle: "AVAILABLE",
    image: "/images/portfolio/how-we-build-2.jpeg",
    ctaText: "Explore This Build →",
    ctaLink: "/portfolio",
    alignment: "right",
    order: 2,
    active: true
  },
  {
    title: "Generative AI Content Workspace",
    slug: "generative-ai-content-workspace",
    description: "AI-powered content generation platform with brand voice training, multi-format output, and team collaboration. Built with GPT-4 — white-label ready.",
    badge: "CONCEPT BUILD",
    statusTitle: "Full Stack",
    statusSubtitle: "END-TO-END",
    image: "/images/portfolio/how-we-build-3.jpeg",
    ctaText: "Explore This Build →",
    ctaLink: "/portfolio",
    alignment: "left",
    order: 3,
    active: true
  }
];

const seedBuilds = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await ConceptBuild.deleteMany({});
    await ConceptBuild.insertMany(builds);

    console.log('Concept builds seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding concept builds:', error);
    process.exit(1);
  }
};

seedBuilds();
