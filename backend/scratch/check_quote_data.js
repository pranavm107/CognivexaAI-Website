import mongoose from 'mongoose';
import CMS from '../src/models/cms.model.js';
import env from '../src/config/env.js';

const checkData = async () => {
  await mongoose.connect(env.MONGO_URI);
  const content = await CMS.findOne({ slug: 'founder-quote' });
  console.log('FOUNDER QUOTE DATA:', JSON.stringify(content, null, 2));
  process.exit(0);
};

checkData();
