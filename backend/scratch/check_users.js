import mongoose from 'mongoose';
import env from '../src/config/env.js';
import User from '../src/models/User.model.js';

const checkUsers = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    const users = await User.find({ isDeleted: false }).select('email role password');
    console.log('Current Users in DB:');
    users.forEach(u => console.log(`- ${u.email} (${u.role})`));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkUsers();
