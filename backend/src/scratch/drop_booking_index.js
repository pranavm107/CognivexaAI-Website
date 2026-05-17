import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const dropIndex = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cognivexaai';
    console.log('Connecting to:', mongoUrl);
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    const Booking = mongoose.connection.collection('bookings');
    
    console.log('Fetching indexes for bookings...');
    const indexes = await Booking.indexes();
    console.log('Current indexes:', indexes);

    if (indexes.find(idx => idx.name === 'date_1_time_1')) {
      console.log('Dropping index date_1_time_1...');
      await Booking.dropIndex('date_1_time_1');
      console.log('Index dropped successfully');
    } else {
      console.log('Index date_1_time_1 not found');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

dropIndex();
