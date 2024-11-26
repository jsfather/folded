import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose
    .connect(
      'mongodb+srv://keyvanmatinrad:vioDUQXde8XI4KQ3@cluster0.znm85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => {
      console.log('Connected to DB');
    });
};
export default dbConnect;
