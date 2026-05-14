import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../src/models/User.model.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Delete existing admin to reset password correctly (prevents double-hashing)
    await User.deleteOne({ email: 'admin@cognivexa.ai' });
    
    await User.create({
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@cognivexa.ai',
      password: 'Admin@123',
      role: 'super_admin',
      permissions: [
        'manage_bookings', 'manage_inquiries', 'manage_services', 
        'manage_portfolio', 'manage_team', 'manage_users', 'view_analytics'
      ]
    });

    console.log('✅ Super Admin created successfully!');
    console.log('Email: admin@cognivexa.ai');
    console.log('Password: Admin@123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
