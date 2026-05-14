import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkFields = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;

    console.log('--- BOOKING FIELD CHECK ---');
    const bookings = await db.collection('bookings').find({}).toArray();
    bookings.forEach(b => {
      console.log(`ID: ${b._id}, isDeleted: ${b.isDeleted}, clientName: ${b.clientName}, name: ${b.name}, startTime: ${b.startTime}`);
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkFields();
