import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import PricingCategory from './src/models/PricingCategory.model.js';
import PricingPlan from './src/models/PricingPlan.model.js';
import SmartPackage from './src/models/SmartPackage.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedPricing = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await PricingCategory.deleteMany({});
    await PricingPlan.deleteMany({});
    await SmartPackage.deleteMany({});

    // 1. Create Categories
    const categories = await PricingCategory.insertMany([
      { name: "Web & Apps", slug: "web-apps", tagline: "Launch fast. Scale later.", order: 1 },
      { name: "AI Solutions", slug: "ai-solutions", tagline: "Automate and grow with intelligence.", order: 2 },
      { name: "IoT Systems", slug: "iot-systems", tagline: "Connect real-world systems in real-time.", order: 3 }
    ]);

    const catMap = {};
    categories.forEach(c => catMap[c.slug] = c._id);

    // 2. Create Plans
    const plans = [
      // Web & Apps
      {
        categoryId: catMap['web-apps'],
        title: "Starter Website",
        subtitle: "Small businesses & personal brands",
        badge: "STARTER",
        priceText: "Starting from ₹10,000",
        timeline: "5–7 days",
        features: ["3–5 Pages", "Responsive Design", "Basic SEO Setup", "Contact Form", "1 Round of Revisions"],
        ctaText: "Get Started →",
        theme: "neutral",
        isPopular: false,
        order: 1
      },
      {
        categoryId: catMap['web-apps'],
        title: "Business Website",
        subtitle: "Growing businesses",
        badge: "POPULAR",
        priceText: "Starting from ₹25,000",
        timeline: "1–2 weeks",
        features: ["6–10 Pages", "Custom UI Design", "Performance Optimization", "CMS Integration (optional)", "SEO + Analytics Setup", "2 Rounds of Revisions"],
        ctaText: "Get Started →",
        theme: "purple",
        isPopular: true,
        order: 2
      },
      {
        categoryId: catMap['web-apps'],
        title: "Web App / SaaS",
        subtitle: "Startups & platforms",
        badge: "ADVANCED",
        priceText: "Starting from ₹60,000",
        timeline: "3–6 weeks",
        features: ["Full-Stack Application", "Authentication System", "Admin Dashboard", "API Integrations", "Scalable Architecture", "3 Rounds of Revisions"],
        ctaText: "Book Consultation →",
        theme: "neutral",
        isPopular: false,
        order: 3
      },
      // AI Solutions
      {
        categoryId: catMap['ai-solutions'],
        title: "AI Starter",
        subtitle: "Basic automation needs",
        badge: "AI-POWERED",
        priceText: "Starting from ₹30,000",
        timeline: "1–2 weeks",
        features: ["Chatbot (Website or WhatsApp)", "Basic Workflow Automation", "GPT Integration", "Admin Panel", "14-day Support"],
        ctaText: "Get Started →",
        theme: "purple",
        isPopular: false,
        order: 1
      },
      {
        categoryId: catMap['ai-solutions'],
        title: "AI Growth",
        subtitle: "Scaling businesses",
        badge: "MOST POPULAR",
        priceText: "Starting from ₹80,000",
        timeline: "3–5 weeks",
        features: ["Advanced Chatbot with Memory", "AI Dashboards & Analytics", "CRM / Workflow Automation", "API Integrations", "Custom AI Logic", "30-day Support"],
        ctaText: "Book Consultation →",
        theme: "purple",
        isPopular: true,
        order: 2
      },
      {
        categoryId: catMap['ai-solutions'],
        title: "AI Enterprise",
        subtitle: "Large-scale AI systems",
        badge: "ENTERPRISE",
        priceText: "₹2,50,000+",
        timeline: "6+ weeks",
        features: ["AI Agents / Autonomous Systems", "Custom LLM Workflows", "Predictive Analytics", "Full AI Architecture", "Custom Model Training", "Dedicated Support"],
        ctaText: "Contact Us →",
        theme: "purple",
        isPopular: false,
        order: 3
      },
      // IoT Systems
      {
        categoryId: catMap['iot-systems'],
        title: "IoT Starter",
        subtitle: "Prototypes & small systems",
        badge: "STARTER",
        priceText: "Starting from ₹40,000",
        timeline: "2–3 weeks",
        features: ["Sensor Integration (Temp, GPS, etc.)", "Basic Web Dashboard", "Real-time Data Display", "Cloud Connection (Firebase/AWS)", "Mobile Alerts"],
        ctaText: "Get Started →",
        theme: "teal",
        isPopular: false,
        order: 1
      },
      {
        categoryId: catMap['iot-systems'],
        title: "IoT Growth",
        subtitle: "Operational businesses",
        badge: "MOST POPULAR",
        priceText: "Starting from ₹1,00,000",
        timeline: "4–6 weeks",
        features: ["Multi-device Connectivity", "Live Tracking (Vehicle/Asset)", "Alerts & Notifications", "Dashboard + Analytics", "API Integrations", "+ AI Integration Available"],
        ctaText: "Book Consultation →",
        theme: "teal",
        isPopular: true,
        order: 2
      },
      {
        categoryId: catMap['iot-systems'],
        title: "IoT Advanced",
        subtitle: "Enterprise & infrastructure",
        badge: "INDUSTRIAL",
        priceText: "₹3,00,000+",
        timeline: "6+ weeks",
        features: ["Industrial IoT (IIoT)", "Edge Computing", "AI-based Predictions", "Remote Control Systems", "Custom Firmware + Backend", "+ Mobile App Included"],
        ctaText: "Contact Us →",
        theme: "teal",
        isPopular: false,
        order: 3
      }
    ];

    await PricingPlan.insertMany(plans);

    // 3. Create Smart Package
    await SmartPackage.create({
      title: "SMART SYSTEM PACKAGE",
      subtitle: "\"Our highest-value offering — a complete digital ecosystem built for you.\"",
      tags: ["IoT Systems", "AI Integration", "Mobile App", "Analytics Dashboard", "Custom Backend"],
      ctaText: "Book a Strategy Call",
      ctaLink: "/contact",
      pricingText: "CUSTOM PRICING",
      active: true
    });

    console.log('Pricing data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding pricing data:', error);
    process.exit(1);
  }
};

seedPricing();
