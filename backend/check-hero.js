import mongoose from 'mongoose';
import CMS from '../backend/src/models/cms.model.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), 'backend/.env') });

const checkHero = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const hero = await CMS.findOne({ slug: 'home-hero' });
        console.log('--- Home Hero Content ---');
        console.log(JSON.stringify(hero, null, 2));
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkHero();
