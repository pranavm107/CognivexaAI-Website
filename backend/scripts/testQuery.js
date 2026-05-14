import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const testQuery = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    
    const countAll = await db.collection('bookings').countDocuments({});
    const countFiltered = await db.collection('bookings').countDocuments({ isDeleted: false });
    const countNeTrue = await db.collection('bookings').countDocuments({ isDeleted: { $ne: true } });

    console.log('Total in collection:', countAll);
    console.log('Count { isDeleted: false }:', countFiltered);
    console.log('Count { isDeleted: { $ne: true } }:', countNeTrue);

    const first = await db.collection('bookings').findOne({});
    console.log('First Doc:', JSON.stringify(first, null, 2));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

testQuery();
