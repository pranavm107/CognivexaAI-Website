import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ConceptProject from './src/models/ConceptProject.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const conceptProjects = [
  {
    title: "AI Chatbot Interface UI",
    slug: "ai-chatbot-interface-ui",
    category: "AI AUTOMATION",
    description: "A conversational AI interface designed to automate customer queries and support workflows.",
    technologies: ["React", "OpenAI"],
    gradientTheme: "purple",
    previewType: "dashboard",
    badgeLabel: "CONCEPT",
    ctaText: "Explore Concept",
    ctaLink: "/contact",
    statusLabel: "Coming Soon",
    active: true,
    order: 1
  },
  {
    title: "Sales Automation Dashboard",
    slug: "sales-automation-dashboard",
    category: "SAAS DASHBOARD",
    description: "An intelligent sales pipeline tracker with automated lead scoring and reminders.",
    technologies: ["Next.js", "PostgreSQL"],
    gradientTheme: "indigo",
    previewType: "dashboard",
    badgeLabel: "DEMO",
    ctaText: "Explore Concept",
    ctaLink: "/contact",
    statusLabel: "Coming Soon",
    active: true,
    order: 2
  },
  {
    title: "Analytics Dashboard UI",
    slug: "analytics-dashboard-ui",
    category: "ANALYTICS",
    description: "Real-time data visualization platform for monitoring business performance metrics.",
    technologies: ["React", "D3.js"],
    gradientTheme: "orange",
    previewType: "analytics",
    badgeLabel: "INTERNAL BUILD",
    ctaText: "Explore Concept",
    ctaLink: "/contact",
    statusLabel: "Coming Soon",
    active: true,
    order: 3
  },
  {
    title: "SaaS Web App Landing",
    slug: "saas-web-app-landing",
    category: "WEB APP",
    description: "Modern, high-converting landing page concept for a technical SaaS product.",
    technologies: ["React", "Tailwind"],
    gradientTheme: "emerald",
    previewType: "saas",
    badgeLabel: "CONCEPT",
    ctaText: "Explore Concept",
    ctaLink: "/contact",
    statusLabel: "Coming Soon",
    active: true,
    order: 4
  },
  {
    title: "Mobile App UI Concept",
    slug: "mobile-app-ui-concept",
    category: "MOBILE APP",
    description: "User-centric mobile interface for a finance management application.",
    technologies: ["React Native", "Figma"],
    gradientTheme: "pink",
    previewType: "mobile",
    badgeLabel: "DEMO",
    ctaText: "Explore Concept",
    ctaLink: "/contact",
    statusLabel: "Coming Soon",
    active: true,
    order: 5
  },
  {
    title: "Workflow Automation Panel",
    slug: "workflow-automation-panel",
    category: "AUTOMATION",
    description: "A drag-and-drop interface concept for building business automation flows.",
    technologies: ["Node.js", "Zustand"],
    gradientTheme: "purple",
    previewType: "automation",
    badgeLabel: "INTERNAL BUILD",
    ctaText: "Explore Concept",
    ctaLink: "/contact",
    statusLabel: "Coming Soon",
    active: true,
    order: 6
  }
];

const seedConceptProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await ConceptProject.deleteMany({});
    console.log('Cleared existing concept projects');

    await ConceptProject.insertMany(conceptProjects);
    console.log('Concept projects seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding concept projects:', error);
    process.exit(1);
  }
};

seedConceptProjects();
