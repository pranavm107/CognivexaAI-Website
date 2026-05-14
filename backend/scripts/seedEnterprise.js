import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../src/models/User.model.js';
import Client from '../src/models/Client.model.js';
import Project from '../src/models/Project.model.js';
import Task from '../src/models/Task.model.js';
import Invoice from '../src/models/Invoice.model.js';
import ActivityLog from '../src/models/ActivityLog.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedEnterprise = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // Clear existing data
    await Promise.all([
      User.deleteMany({ role: { $in: ['client', 'client_admin'] } }),
      Client.deleteMany({}),
      Project.deleteMany({}),
      Task.deleteMany({}),
      Invoice.deleteMany({}),
      ActivityLog.deleteMany({})
    ]);

    console.log('Seeding Organizations (Clients)...');
    const org1 = await Client.create({
      companyName: 'Global Corp Industries',
      industry: 'Manufacturing',
      email: 'ops@globalcorp.com',
      contactPerson: 'Alex Rivers'
    });

    const org2 = await Client.create({
      companyName: 'InnovateTech Solutions',
      industry: 'Software',
      email: 'sarah@innovate.tech',
      contactPerson: 'Sarah Chen'
    });

    console.log('Seeding Client Users...');
    const user1 = await User.create({
      firstName: 'Alex',
      lastName: 'Rivers',
      email: 'alex@globalcorp.com',
      password: 'Client@123',
      role: 'client_admin',
      clientId: org1._id
    });

    const user2 = await User.create({
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah@innovate.tech',
      password: 'Client@123',
      role: 'client_admin',
      clientId: org2._id
    });

    console.log('Seeding Projects...');
    const project1 = await Project.create({
      title: 'Enterprise AI Automation',
      description: 'Implementing LLM-based customer service automation.',
      client: org1._id,
      status: 'development',
      progress: 65,
      healthScore: 92,
      riskLevel: 'low',
      budget: '150,000',
      dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    });

    const project2 = await Project.create({
      title: 'Legacy System Migration',
      description: 'Migrating monolithic architecture to cloud-native microservices.',
      client: org2._id,
      status: 'discovery',
      progress: 15,
      healthScore: 45,
      riskLevel: 'high',
      budget: '250,000',
      dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)
    });

    console.log('Seeding Tasks...');
    await Task.create([
      { title: 'Define AI Schema', status: 'completed', priority: 'high', project: project1._id },
      { title: 'Vector DB Setup', status: 'in_progress', priority: 'medium', project: project1._id },
      { title: 'Frontend Integration', status: 'todo', priority: 'low', project: project1._id },
      { title: 'Infrastructure Audit', status: 'completed', priority: 'high', project: project2._id },
      { title: 'Security Hardening', status: 'todo', priority: 'urgent', project: project2._id }
    ]);

    console.log('Seeding Invoices...');
    const inv1 = await Invoice.create({ 
      client: org1._id, 
      project: project1._id, 
      totalAmount: 45000, 
      status: 'paid', 
      isRecurring: true,
      items: [{ description: 'Implementation Phase 1', amount: 45000, quantity: 1, unitPrice: 45000 }],
      invoiceNumber: 'INV-2026-001',
      dueDate: new Date()
    });

    const inv2 = await Invoice.create({ 
      client: org2._id, 
      project: project2._id, 
      totalAmount: 25000, 
      status: 'pending',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      items: [{ description: 'Strategy Consulting', amount: 25000, quantity: 1, unitPrice: 25000 }],
      invoiceNumber: 'INV-2026-002'
    });

    console.log('Seeding Activity Logs...');
    await ActivityLog.create([
      { actorId: user1._id, action: 'PROJECT_UPDATE', entityType: 'Project', entityId: project1._id },
      { actorId: user2._id, action: 'INVOICE_GENERATED', entityType: 'Invoice', entityId: inv2._id },
      { actorId: user1._id, action: 'FILE_UPLOADED', entityType: 'Project', entityId: project1._id }
    ]);

    console.log('✅ Enterprise Ecosystem Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding enterprise data:', error);
    process.exit(1);
  }
};

seedEnterprise();
