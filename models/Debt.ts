import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema(
  {
    name: String,
    amount: Number,
    description: String,
  },
  { timestamps: true }
);

const Debt = mongoose.model('Debt', debtSchema);

export default Debt;
