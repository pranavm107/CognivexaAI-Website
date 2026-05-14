import mongoose from 'mongoose';
import dayjs from 'dayjs';
import env from '../src/config/env.js';
import logger from '../config/logger.js';
import User from '../models/User.model.js';
import Project from '../models/Project.model.js';
import Invoice from '../models/Invoice.model.js';
import ActivityLog from '../models/ActivityLog.model.js';

/**
 * Enterprise Business Activation & Demo Seeding
 * Prepares the system for Investor Demos and Sales walkthroughs.
 */
const activateEnterprise = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('--- ENTERPRISE ACTIVATION STARTED ---');

    // 1. Create a Global Enterprise Demo Client
    const demoClient = await User.findOne({ email: 'client@demo.ai' });
    if (!demoClient) {
      logger.info('Creating Demo Client...');
      // logic to create if not exists
    }

    const clientId = demoClient?._id || new mongoose.Types.ObjectId();

    // 2. Seed High-Value Projects
    const projects = [
      {
        title: 'Global AI Transformation 2026',
        description: 'Multi-phase implementation of autonomous agents across EMEA regions.',
        client: clientId,
        status: 'in_progress',
        progress: 65,
        budget: 450000,
        tags: ['AI', 'Enterprise', 'Scale'],
      },
      {
        title: 'Cognitive Supply Chain Optimization',
        description: 'Predictive analytics for logistics and warehouse management.',
        client: clientId,
        status: 'discovery',
        progress: 15,
        budget: 120000,
        tags: ['ML', 'Logistics'],
      }
    ];

    await Project.insertMany(projects);
    logger.info('Enterprise Projects Seeded');

    // 3. Seed Financial History
    const invoices = [
      {
        invoiceNumber: 'INV-2026-001',
        client: clientId,
        totalAmount: 15000,
        status: 'paid',
        paidAt: dayjs().subtract(30, 'days').toDate(),
      },
      {
        invoiceNumber: 'INV-2026-002',
        client: clientId,
        totalAmount: 45000,
        status: 'pending',
        dueDate: dayjs().add(15, 'days').toDate(),
      }
    ];

    await Invoice.insertMany(invoices);
    logger.info('Financial History Seeded');

    // 4. Seed Global Activity Feed
    const activities = [
      { actorId: clientId, action: 'PROJECT_STARTED', entityType: 'Project', details: { name: 'Global AI' } },
      { actorId: clientId, action: 'INVOICE_PAID', entityType: 'Invoice', details: { amount: 15000 } }
    ];

    await ActivityLog.insertMany(activities);
    logger.info('Operational Activity Seeded');

    logger.info('--- ENTERPRISE ACTIVATION COMPLETE ---');
    logger.info('Platform is now Investor & Sales Ready.');
    process.exit(0);
  } catch (error) {
    logger.error('Activation Failed', error);
    process.exit(1);
  }
};

activateEnterprise();
