import mongoose from 'mongoose';
import env from '../src/config/env.js';
import logger from '../src/config/logger.js';
import Project from '../src/models/Project.model.js';
import User from '../src/models/User.model.js';
import Invoice from '../src/models/Invoice.model.js';
import ActivityLog from '../src/models/ActivityLog.model.js';
import Message from '../src/models/Message.model.js';

const hardenDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('Connected to MongoDB for Hardening');

    // Ensure models are initialized
    await Promise.all([
      User.init(),
      Project.init(),
      Invoice.init(),
      ActivityLog.init(),
      Message.init()
    ]);

    // Apply Indexes
    await User.collection.createIndex({ email: 1 });
    await Project.collection.createIndex({ client: 1, status: 1 });
    await Invoice.collection.createIndex({ client: 1, status: 1 });
    await ActivityLog.collection.createIndex({ createdAt: -1 });
    await Message.collection.createIndex({ projectId: 1, createdAt: 1 });

    logger.info('MongoDB Index Optimization Complete');
    process.exit(0);
  } catch (error) {
    logger.error('Database Hardening Failed', error);
    process.exit(1);
  }
};

hardenDatabase();
