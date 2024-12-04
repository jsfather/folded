import mongoose from 'mongoose';
import Debt from '@/models/Debt';

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    debts: [Debt],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
