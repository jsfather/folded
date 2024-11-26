import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || '';

const dbConnect = async () => {
  await mongoose.connect(mongoURI).then(() => {
    console.log('Connected to mongodb!');
  });
};

export default dbConnect;