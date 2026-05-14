import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const bookings = await db.collection('bookings').find({}).toArray();

    console.log(`Migrating ${bookings.length} bookings...`);

    for (const b of bookings) {
      const update = {
        $set: {
          isDeleted: b.isDeleted === true ? true : false,
          clientName: b.clientName || b.name || 'Unknown Client',
          clientEmail: b.clientEmail || b.email || 'unknown@example.com',
          clientPhone: b.clientPhone || b.phone || '',
          serviceType: b.serviceType || b.service || 'General Consultation',
          status: b.status || 'confirmed',
        }
      };

      // Map date/time to startTime if missing
      if (!b.startTime && b.date && b.time) {
        const start = new Date(`${b.date}T${b.time}:00`);
        if (!isNaN(start.getTime())) {
          update.$set.startTime = start;
          update.$set.endTime = new Date(start.getTime() + 30 * 60000);
        }
      }

      // Default startTime if still missing
      if (!update.$set.startTime && !b.startTime) {
        update.$set.startTime = new Date();
        update.$set.endTime = new Date(Date.now() + 30 * 60000);
      }

      await db.collection('bookings').updateOne({ _id: b._id }, update);
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

migrate();
