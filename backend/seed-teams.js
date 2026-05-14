import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import SpecializedTeam from './src/models/SpecializedTeam.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const teams = [
  {
    name: "AI & Automation",
    slug: "ai-automation",
    shortTitle: "AI & Automation",
    tagline: "Intelligent systems that think, act, and scale.",
    description: "Our AI team specializes in building production-ready intelligent systems — from LLM-powered chatbots to fully autonomous AI agents that integrate into your existing workflows.",
    icon: "Brain",
    theme: "purple",
    expertiseAreas: ["LLM Workflows", "AI Integrations", "Prompt Engineering", "Conversational Systems", "AI Agents"],
    workflowTags: ["RAG Pipelines", "Vector Databases", "Agentic Workflows", "API Integration"],
    teamRoles: [
      { title: "LLM Engineers", description: "Custom language model development & fine-tuning", order: 1 },
      { title: "Prompt Engineers", description: "Precision prompting for reliable AI outputs", order: 2 },
      { title: "Automation Specialists", description: "Workflow automation using AI + APIs", order: 3 },
      { title: "AI Integration Devs", description: "Connecting AI to existing products & systems", order: 4 }
    ],
    optionalHighlights: [
      { label: "Deployment Ready", value: "Production" },
      { label: "Model Agnostic", value: "Multi-LLM" }
    ],
    order: 1,
    active: true
  },
  {
    name: "Web & SaaS Engineering",
    slug: "web-saas-engineering",
    shortTitle: "Web & SaaS",
    tagline: "Scalable platforms built for real-world performance.",
    description: "Our engineering team builds clean, production-ready web applications and SaaS platforms using modern full-stack architecture designed to scale from day one.",
    icon: "Monitor",
    theme: "blue",
    expertiseAreas: ["Full-Stack Development", "API Architecture", "Frontend Systems", "Admin Dashboards", "Cloud Deployment"],
    workflowTags: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    teamRoles: [
      { title: "Full-Stack Developers", description: "React, Next.js, Node.js end-to-end", order: 1 },
      { title: "Backend Architects", description: "Scalable APIs, databases & infrastructure", order: 2 },
      { title: "Frontend Engineers", description: "Pixel-perfect, performant UI development", order: 3 },
      { title: "DevOps Engineers", description: "Cloud deployment, CI/CD & monitoring", order: 4 }
    ],
    optionalHighlights: [
      { label: "High Performance", value: "Vite/Next.js" },
      { label: "Modern Stack", value: "TypeScript" }
    ],
    order: 2,
    active: true
  },
  {
    name: "IoT & Systems",
    slug: "iot-systems",
    shortTitle: "IoT & Systems",
    tagline: "Connecting the physical world with intelligent software.",
    description: "Our IoT team bridges hardware and software — building real-time sensor systems, smart device networks, and industrial automation solutions that operate at scale.",
    icon: "Wifi",
    theme: "teal",
    expertiseAreas: ["Sensor Integration", "Real-Time Monitoring", "Device Connectivity", "Embedded Systems", "Edge Processing"],
    workflowTags: ["MQTT", "WebSockets", "ESP32/Arduino", "Real-time Dashboarding"],
    teamRoles: [
      { title: "Embedded Engineers", description: "Firmware, microcontrollers & hardware logic", order: 1 },
      { title: "Hardware Specialists", description: "Sensor integration & device architecture", order: 2 },
      { title: "Data Pipeline Engineers", description: "Real-time data ingestion & processing", order: 3 },
      { title: "IoT Backend Devs", description: "Cloud connectivity & remote management", order: 4 }
    ],
    optionalHighlights: [
      { label: "Connectivity", value: "Real-time" },
      { label: "Processing", value: "Edge Ready" }
    ],
    order: 3,
    active: true
  },
  {
    name: "Product & UX Design",
    slug: "product-ux-design",
    shortTitle: "Product & UX",
    tagline: "Where strategy meets beautiful, functional design.",
    description: "Our product team ensures every solution we build is not just functional — but intuitive, conversion-optimized, and aligned with your business goals from the first wireframe to final launch.",
    icon: "Palette",
    theme: "pink",
    expertiseAreas: ["Wireframing", "Design Systems", "UX Research", "User Flows", "Product Strategy"],
    workflowTags: ["Figma", "Prototypes", "User Journeys", "Brand Identity"],
    teamRoles: [
      { title: "UI/UX Designers", description: "Figma-based design systems & prototypes", order: 1 },
      { title: "Product Strategists", description: "Roadmaps, user flows & feature planning", order: 2 },
      { title: "UX Researchers", description: "User testing & conversion optimization", order: 3 },
      { title: "Brand Designers", description: "Visual identity & design language", order: 4 }
    ],
    optionalHighlights: [
      { label: "Design Tools", value: "Figma" },
      { label: "Approach", value: "User-First" }
    ],
    order: 4,
    active: true
  }
];

const seedTeams = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await SpecializedTeam.deleteMany({});
    await SpecializedTeam.insertMany(teams);

    console.log('Specialized teams seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding teams:', error);
    process.exit(1);
  }
};

seedTeams();
