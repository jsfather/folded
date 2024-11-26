import mongoose from 'mongoose';

const mongo_uri = process.env.MONGO_URI || '';

const dbConnect = () => {
  mongoose.connect(mongo_uri).then(() => {
    console.log('Connected to DB');
  });
};
export default dbConnect;
