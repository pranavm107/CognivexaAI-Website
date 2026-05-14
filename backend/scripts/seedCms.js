import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Service, Portfolio, TeamMember, Notification, Settings } from '../src/models/cms.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedCms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🌱 Seeding CMS data...');

    // Clear existing
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    await TeamMember.deleteMany({});
    await Notification.deleteMany({});
    await Settings.deleteMany({});

    // Seed Services
    await Service.create([
      {
        title: 'Cognitive Automation Engine',
        slug: 'cognitive-automation',
        category: 'AI Core',
        shortDescription: 'Enterprise-grade neural networks for workflow optimization.',
        status: 'active',
        featured: true,
        pricing: '$4,999/mo',
        technologies: ['PyTorch', 'TensorFlow', 'CUDA']
      },
      {
        title: 'Predictive Analytics Suite',
        slug: 'predictive-analytics',
        category: 'Data Science',
        shortDescription: 'Real-time market velocity and churn prediction models.',
        status: 'active',
        featured: false,
        pricing: '$2,499/mo',
        technologies: ['Scikit-learn', 'BigQuery']
      }
    ]);

    // Seed Portfolio
    await Portfolio.create([
      {
        title: 'Neural SCM Optimization',
        slug: 'scm-optimization',
        clientName: 'Global Logistics Corp',
        industry: 'Logistics',
        description: 'Reducing supply chain latency by 42% using deep reinforcement learning.',
        status: 'published',
        featured: true,
        technologies: ['Python', 'AWS SageMaker', 'Redis']
      }
    ]);

    // Seed Team
    await TeamMember.create([
      {
        fullName: 'Dr. Sarah Chen',
        role: 'Chief AI Architect',
        department: 'Engineering',
        email: 'sarah@cognivexa.ai',
        activeStatus: 'online',
        skills: ['Deep Learning', 'System Architecture']
      },
      {
        fullName: 'Marcus Vane',
        role: 'Lead Product Designer',
        department: 'Design',
        email: 'marcus@cognivexa.ai',
        activeStatus: 'offline',
        skills: ['UI/UX', 'Framer Motion']
      }
    ]);

    // Seed Notifications
    await Notification.create([
      {
        type: 'system.alert',
        title: 'Cloud Cluster Scaling',
        message: 'Primary compute cluster successfully scaled to 12 nodes.',
        priority: 'low'
      },
      {
        type: 'lead.created',
        title: 'New High-Value Inquiry',
        message: 'Enterprise inquiry received from Fortune 500 company.',
        priority: 'high'
      }
    ]);

    // Seed Settings
    await Settings.create({
      general: {
        platformName: 'CognivexaAI Global',
        supportEmail: 'ops@cognivexa.ai'
      },
      branding: {
        accentColor: '#6366f1'
      }
    });

    console.log('✅ CMS Seeding Complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedCms();
