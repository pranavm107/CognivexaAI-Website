import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const migrateInquiries = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const inquiries = await db.collection('inquiries').find({}).toArray();

    console.log(`Migrating ${inquiries.length} inquiries...`);

    for (const i of inquiries) {
      const update = {
        $set: {
          isDeleted: i.isDeleted === true ? true : false,
          fullName: i.fullName || i.name || 'Unknown Lead',
          email: i.email || 'unknown@example.com',
          status: i.status || 'new',
          priority: i.priority || 'medium',
          subject: i.subject || 'Legacy Inquiry',
          message: i.message || 'Legacy message content',
        }
      };

      await db.collection('inquiries').updateOne({ _id: i._id }, update);
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

migrateInquiries();
