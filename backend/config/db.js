import mongoose from 'mongoose';
import 'dotenv/config';

export async function connectDB(uri = process.env.MONGODB_URI) {
  if(!uri){
    throw new Error("MONGODB_URI is not defined");
  }
  await mongoose.connect(uri);
}