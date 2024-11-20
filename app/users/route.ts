import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { firstName, lastName, mobileNumber, email } = req.body;

    if (!firstName || !lastName || !mobileNumber || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const newUser: IUser = await User.create({ firstName, lastName, mobileNumber, email });
      return res.status(201).json(newUser);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).json({ message: `Method ${req.method} not allowed` });
}
