import mongoose from 'mongoose';
import 'dotenv/config';

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI);
}