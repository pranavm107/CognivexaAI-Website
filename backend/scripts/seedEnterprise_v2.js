import mongoose from 'mongoose';
import dayjs from 'dayjs';
import env from '../src/config/env.js';
import logger from '../src/config/logger.js';
import User from '../src/models/User.model.js';
import Client from '../src/models/Client.model.js';
import Project from '../src/models/Project.model.js';
import Task from '../src/models/Task.model.js';
import Deliverable from '../src/models/Deliverable.model.js';
import Meeting from '../src/models/Meeting.model.js';
import ActivityLog from '../src/models/ActivityLog.model.js';
import Invoice from '../src/models/Invoice.model.js';
import Session from '../src/models/Session.model.js';
import ProjectRequest from '../src/models/ProjectRequest.model.js';
import Ticket from '../src/models/Ticket.model.js';
import Opportunity from '../src/models/Opportunity.model.js';
import Contract from '../src/models/Contract.model.js';
import SLA from '../src/models/SLA.model.js';

/**
 * PRODUCTION-GRADE ENTERPRISE SEEDING
 * Generates a deeply connected operational ecosystem.
 */
const seedEnterprise = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('--- GLOBAL ENTERPRISE SEEDING STARTED ---');

    // 0. Clear Existing Data (Idempotency)
    await Promise.all([
      Client.deleteMany({}),
      Project.deleteMany({}),
      Task.deleteMany({}),
      ActivityLog.deleteMany({}),
      Deliverable.deleteMany({}),
      Meeting.deleteMany({}),
      Invoice.deleteMany({}),
      Session.deleteMany({}),
      User.deleteMany({}),
      ProjectRequest.deleteMany({}),
      Ticket.deleteMany({}),
      Opportunity.deleteMany({}),
      Contract.deleteMany({}),
      SLA.deleteMany({})
    ]);
    logger.info('Cleared existing enterprise data');

    // 1. Workforce (Admin/Team)
    const teamMembers = [
      { firstName: 'Super', lastName: 'Admin', email: 'admin@cognivexa.ai', role: 'super_admin', department: 'Admin', utilization: 0, skills: [{name: 'Management', level: 10}] },
      { firstName: 'Alex', lastName: 'Rivera', email: 'alex@cognivexa.ai', role: 'admin', permissions: ['manage_inquiries', 'manage_bookings', 'view_analytics'], department: 'Engineering', utilization: 85, skills: [{name: 'Node.js', level: 9}, {name: 'React', level: 8}] },
      { firstName: 'Sarah', lastName: 'Chen', email: 'sarah@cognivexa.ai', role: 'admin', permissions: ['manage_inquiries', 'manage_services', 'view_analytics'], department: 'AI/Data', utilization: 40, skills: [{name: 'PyTorch', level: 10}, {name: 'LLM', level: 9}] },
      { firstName: 'Marcus', lastName: 'Vance', email: 'marcus@cognivexa.ai', role: 'admin', permissions: ['manage_portfolio', 'manage_team', 'view_analytics'], department: 'Design', utilization: 95, skills: [{name: 'Figma', level: 9}, {name: 'UX', level: 10}] }
    ];
    
    const createdTeam = [];
    for (const member of teamMembers) {
      const user = await User.create({ ...member, password: 'SystemPassword123!', isEmailVerified: true });
      createdTeam.push(user);
    }
    logger.info(`Seeded ${createdTeam.length} Workforce Members`);

    // 1.5 Client User
    const demoClientUser = await User.create({
      firstName: 'Jane',
      lastName: 'Client',
      email: 'jane@enterprise.com',
      password: 'SystemPassword123!',
      role: 'client',
      isEmailVerified: true
    });

    // 2. Organizations
    const organizations = [
      { companyName: 'Aetheris Global', industry: 'FinTech', email: 'ops@aetheris.global', companySize: '500+', subscriptionPlan: 'enterprise' },
    ];
    
    const createdClients = await Client.insertMany(organizations);
    
    // Link client user to organization
    demoClientUser.clientId = createdClients[0]._id;
    await demoClientUser.save();
    
    logger.info('Seeded Client Organization & User');

    // 0.5 Project Requests (Move here after creating user/org)
    const requests = [
      { title: 'AI Chatbot Integration', type: 'AI Automation', category: 'Customer Support', estimatedBudget: 25000, client: createdClients[0]._id, requestedBy: demoClientUser._id, status: 'submitted' },
      { title: 'Enterprise Data Warehouse', type: 'Data Engineering', category: 'Analytics', estimatedBudget: 150000, client: createdClients[0]._id, requestedBy: demoClientUser._id, status: 'under_review' },
      { title: 'IoT Edge Monitoring', type: 'IoT', category: 'Industrial', estimatedBudget: 85000, client: createdClients[0]._id, requestedBy: demoClientUser._id, status: 'qualified' }
    ];
    await ProjectRequest.insertMany(requests);
    logger.info('Seeded Project Requests');

    // 2. High-Value Projects
    const projectTemplates = [
      { title: 'Project Horizon: Autonomous Ledger', category: 'AI/Finance', budget: 750000 },
      { title: 'Neural Mesh: Smart Factory OS', category: 'Robotics', budget: 1200000 },
      { title: 'Genomic Insight: Predictive Lab', category: 'BioTech', budget: 450000 }
    ];

    const projects = [];
    for (const client of createdClients) {
      for (const template of projectTemplates) {
        projects.push({
          ...template,
          client: client._id,
          status: 'development',
          progress: Math.floor(Math.random() * 80) + 10,
          healthScore: Math.floor(Math.random() * 20) + 80,
          currentPhase: 'Active Development',
          riskLevel: 'low',
          startDate: dayjs().subtract(2, 'months').toDate(),
          dueDate: dayjs().add(4, 'months').toDate(),
          milestones: [
            { 
              title: 'Phase 1: Architecture', 
              amount: template.budget * 0.2, 
              status: 'paid', 
              invoiceGenerated: true,
              billingType: 'fixed'
            },
            { 
              title: 'Phase 2: Implementation', 
              amount: template.budget * 0.4, 
              status: 'approved', 
              invoiceGenerated: false,
              billingType: 'fixed'
            },
            { 
              title: 'Phase 3: Deployment', 
              amount: template.budget * 0.4, 
              status: 'planned', 
              invoiceGenerated: false,
              billingType: 'fixed'
            }
          ]
        });
      }
    }

    const createdProjects = await Project.insertMany(projects);
    logger.info(`Seeded ${createdProjects.length} Enterprise Projects`);

    // 3. Operational Tasks
    const tasks = [];
    const taskTitles = ['Infrastructure Audit', 'API Security Layer', 'Model Training v1', 'Client Feedback Sync', 'Final Deliverable Review'];
    
    for (const project of createdProjects) {
      for (const title of taskTitles) {
        tasks.push({
          title,
          project: project._id,
          status: Math.random() > 0.5 ? 'in_progress' : 'completed',
          priority: Math.random() > 0.8 ? 'high' : 'medium',
          estimatedHours: 40,
          actualHours: 25
        });
      }
    }

    await Task.insertMany(tasks);
    logger.info(`Seeded ${tasks.length} Operational Tasks`);

    const systemActor = await User.findOne() || await User.create({
      firstName: 'System',
      lastName: 'Intelligence',
      email: 'system@cognivexa.ai',
      password: 'SystemPassword123!',
      role: 'admin'
    });

    // 4. Activity Logs (Real-time events)
    const logs = createdProjects.map(p => ({
      actorId: systemActor._id,
      action: 'PROJECT_MILESTONE_REACHED',
      entityType: 'Project',
      entityId: p._id,
      clientId: p.client,
      details: { milestone: 'Alpha Integration' }
    }));

    await ActivityLog.insertMany(logs);
    logger.info('Audit Logs Seeded');

    // 5. Invoices
    const invoices = [];
    for (const project of createdProjects) {
      const paidMilestone = project.milestones.find(m => m.status === 'paid');
      if (paidMilestone) {
        invoices.push({
          invoiceNumber: 'INV-SEED-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
          project: project._id,
          client: project.client,
          milestoneId: paidMilestone._id,
          subtotal: paidMilestone.amount,
          gst: paidMilestone.amount * 0.18,
          totalAmount: paidMilestone.amount * 1.18,
          status: 'paid',
          paidAt: dayjs().subtract(10, 'days').toDate(),
          paymentHistory: [{
            amount: paidMilestone.amount * 1.18,
            method: 'stripe',
            transactionId: 'tr_test_' + Math.random().toString(36).substring(7)
          }]
        });
      }
    }

    await Invoice.insertMany(invoices);
    logger.info(`Seeded ${invoices.length} Invoices`);

    // 6. Overdue & Risk Seeding
    const overdueInvoices = [];
    for (const project of createdProjects.slice(0, 3)) {
      overdueInvoices.push({
        invoiceNumber: 'INV-OVERDUE-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        project: project._id,
        client: project.client,
        subtotal: project.budget * 0.1,
        gst: project.budget * 0.1 * 0.18,
        totalAmount: project.budget * 0.1 * 1.18,
        status: 'overdue',
        dueDate: dayjs().subtract(15, 'days').toDate(),
      });
    }
    await Invoice.insertMany(overdueInvoices);
    logger.info(`Seeded ${overdueInvoices.length} Overdue Invoices`);

    // 7. Security Sessions
    const sessions = createdTeam.map(u => ({
      userId: u._id,
      refreshToken: 'seed_refresh_' + Math.random().toString(36).substring(7),
      expiresAt: dayjs().add(30, 'days').toDate(),
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0',
      isRevoked: false
    }));
    await Session.insertMany(sessions);
    logger.info(`Seeded ${sessions.length} Security Sessions`);

    // 8. CRM & Sales
    const opportunities = [
      { title: 'Global AI Expansion', stage: 'negotiation', value: 250000, expectedCloseDate: dayjs().add(45, 'days').toDate(), client: createdClients[0]._id, owner: createdTeam[0]._id },
      { title: 'Fintech Automation Suite', stage: 'proposal_sent', value: 120000, expectedCloseDate: dayjs().add(20, 'days').toDate(), client: createdClients[0]._id, owner: createdTeam[1]._id },
      { title: 'Cybersecurity Audit', stage: 'qualified', value: 45000, expectedCloseDate: dayjs().add(10, 'days').toDate(), client: createdClients[0]._id, owner: createdTeam[2]._id }
    ];
    await Opportunity.insertMany(opportunities);
    logger.info(`Seeded ${opportunities.length} CRM Opportunities`);

    // 9. Support Desk
    const tickets = [
      { ticketId: 'TKT-9921', title: 'Invoice Discrepancy', type: 'billing', priority: 'high', status: 'open', client: createdClients[0]._id, requestedBy: demoClientUser._id, slaDeadline: dayjs().add(12, 'hours').toDate() },
      { ticketId: 'TKT-1102', title: 'SSO Integration Failing', type: 'security', priority: 'critical', status: 'escalated', isEscalated: true, escalationReason: 'SLA Breach', client: createdClients[0]._id, requestedBy: demoClientUser._id, slaDeadline: dayjs().subtract(2, 'hours').toDate() },
      { ticketId: 'TKT-4452', title: 'Feature Request: Dark Mode', type: 'technical', priority: 'low', status: 'resolved', client: createdClients[0]._id, requestedBy: demoClientUser._id, slaDeadline: dayjs().add(72, 'hours').toDate() }
    ];
    await Ticket.insertMany(tickets);
    logger.info(`Seeded ${tickets.length} Support Tickets`);

    // 10. Contracts & SLA
    const contracts = [
      { contractNumber: 'MSA-2026-001', title: 'Master Service Agreement', client: createdClients[0]._id, type: 'MSA', status: 'active', value: 500000, startDate: dayjs().subtract(1, 'year').toDate(), endDate: dayjs().add(1, 'year').toDate() },
      { contractNumber: 'SOW-2026-AI-01', title: 'Enterprise AI Implementation', client: createdClients[0]._id, type: 'SOW', status: 'active', value: 150000, startDate: dayjs().subtract(3, 'months').toDate(), endDate: dayjs().add(6, 'months').toDate() }
    ];
    const createdContracts = await Contract.insertMany(contracts);
    
    const slas = [
      { name: 'Enterprise Premium SLA', client: createdClients[0]._id, contract: createdContracts[0]._id, tier: 'enterprise', guarantees: { uptime: 99.99, responseTime: 2, resolutionTime: 8 } }
    ];
    await SLA.insertMany(slas);
    logger.info(`Seeded ${contracts.length} Contracts & ${slas.length} SLAs`);

    logger.info('--- ENTERPRISE ECOSYSTEM READY ---');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding Failed', error);
    process.exit(1);
  }
};

seedEnterprise();
