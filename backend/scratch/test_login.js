import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import env from '../src/config/env.js';
import User from '../src/models/User.model.js';

const testLogin = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    const email = 'alex@cognivexa.ai';
    const password = 'SystemPassword123!';
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      process.exit(1);
    }
    
    const isMatch = await user.isPasswordMatch(password);
    console.log(`Password match for ${email}: ${isMatch}`);
    
    // Check hash manually
    const isBcryptMatch = await bcrypt.compare(password, user.password);
    console.log(`Manual bcrypt compare: ${isBcryptMatch}`);
    console.log(`Stored Hash: ${user.password}`);
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

testLogin();
