import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import PortfolioProject from './src/models/PortfolioProject.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const portfolioProjects = [
  {
    title: "AI Customer Support Chatbot",
    slug: "ai-customer-support-chatbot",
    shortDescription: "Automate customer queries using AI-powered conversational systems with human-like intelligence.",
    category: "AI & Automation",
    technologies: ["OpenAI", "Node.js", "React"],
    timeline: "3–5 weeks",
    icon: "MessageSquare",
    accentColor: "purple",
    gradientStyle: "from-[#7c3aed] to-[#a855f7]",
    featured: true,
    active: true,
    order: 1
  },
  {
    title: "Sales Automation Dashboard",
    slug: "sales-automation-dashboard",
    shortDescription: "Track leads, automate follow-ups, and increase conversion rates with intelligent CRM integrations.",
    category: "Analytics",
    technologies: ["Next.js", "Python", "PostgreSQL"],
    timeline: "4–6 weeks",
    icon: "BarChart3",
    accentColor: "pink",
    gradientStyle: "from-[#ec4899] to-[#f43f5e]",
    featured: false,
    active: true,
    order: 2
  },
  {
    title: "AI Resume Screening Tool",
    slug: "ai-resume-screening-tool",
    shortDescription: "Automatically filter and rank candidates using machine learning to speed up hiring processes.",
    category: "AI & Automation",
    technologies: ["TensorFlow", "FastAPI", "AWS"],
    timeline: "4–5 weeks",
    icon: "Search",
    accentColor: "purple",
    gradientStyle: "from-[#7c3aed] to-[#a855f7]",
    featured: false,
    active: true,
    order: 3
  },
  {
    title: "Business Analytics Dashboard",
    slug: "business-analytics-dashboard",
    shortDescription: "Visualize key metrics and gain actionable insights in real-time for data-driven decisions.",
    category: "Analytics",
    technologies: ["React", "D3.js", "Supabase"],
    timeline: "3–4 weeks",
    icon: "Globe",
    accentColor: "pink",
    gradientStyle: "from-[#ec4899] to-[#f43f5e]",
    featured: false,
    active: true,
    order: 4
  },
  {
    title: "SaaS Web Application",
    slug: "saas-web-application",
    shortDescription: "Scalable web platforms with modern UI and backend architecture built for performance.",
    category: "Web Apps",
    technologies: ["TypeScript", "NestJS", "Tailwind"],
    timeline: "6–8 weeks",
    icon: "Cpu",
    accentColor: "blue",
    gradientStyle: "from-[#3b82f6] to-[#06b6d4]",
    featured: false,
    active: true,
    order: 5
  },
  {
    title: "Mobile App Startup MVP",
    slug: "mobile-app-startup-mvp",
    shortDescription: "Cross-platform mobile applications for rapid product launches and high-performance user experience.",
    category: "Mobile",
    technologies: ["React Native", "Firebase", "Redux"],
    timeline: "5–7 weeks",
    icon: "Smartphone",
    accentColor: "emerald",
    gradientStyle: "from-[#10b981] to-[#34d399]",
    featured: false,
    active: true,
    order: 6
  }
];

const seedPortfolioProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await PortfolioProject.deleteMany({});
    console.log('Cleared existing portfolio projects');

    await PortfolioProject.insertMany(portfolioProjects);
    console.log('Portfolio projects seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding portfolio projects:', error);
    process.exit(1);
  }
};

seedPortfolioProjects();
