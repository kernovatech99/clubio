import mongoose from 'mongoose';
import {env} from './env.ts';

export async function connectDb() {
    await mongoose.connect(env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
}
