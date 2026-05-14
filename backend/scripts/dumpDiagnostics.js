import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const dumpData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const bookings = await mongoose.connection.db.collection('bookings').find({ isDeleted: { $ne: true } }).toArray();
    const inquiries = await mongoose.connection.db.collection('inquiries').find({ isDeleted: { $ne: true } }).toArray();

    console.log('--- BOOKINGS ---');
    console.log(JSON.stringify(bookings, null, 2));
    console.log('Total Bookings:', bookings.length);

    console.log('\n--- INQUIRIES ---');
    console.log(JSON.stringify(inquiries, null, 2));
    console.log('Total Inquiries:', inquiries.length);

    process.exit(0);
  } catch (error) {
    console.error('Error dumping data:', error);
    process.exit(1);
  }
};

dumpData();
