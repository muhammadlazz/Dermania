import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    console.error('[REGISTER_ERROR]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
