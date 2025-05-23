// src/pages/api/auth/login.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next'; // ✅ Import dari Next.js untuk tipe yang benar

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,  // Menggunakan tipe NextApiRequest
  res: NextApiResponse  // Menggunakan tipe NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // If credentials are valid, proceed with the login (you could issue a JWT or session here)
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
