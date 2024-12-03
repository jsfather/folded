import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
