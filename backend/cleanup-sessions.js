import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

import env from './src/config/env.js';

const clearSessions = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: 'sessions' }).toArray();
    
    if (collections.length > 0) {
      console.log('Clearing sessions collection...');
      await db.collection('sessions').deleteMany({});
      
      console.log('Dropping indices on sessions...');
      try {
        await db.collection('sessions').dropIndexes();
      } catch (e) {
        console.log('No indexes to drop or collection empty');
      }
    }
    
    console.log('Cleanup complete');
    process.exit(0);
  } catch (error) {
    console.error('Cleanup failed:', error);
    process.exit(1);
  }
};

clearSessions();
