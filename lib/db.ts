import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

let isConnected = false;

export async function connectDb() {
  if (isConnected) {
    console.log('Database is already connected');
    return;
  }

  if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
  }

  try {
    const db = await mongoose.connect(MONGO_URI);
    isConnected = db.connection.readyState === 1;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed', error);
    throw error;
  }
}
