import { Request, Response } from 'express';
import prisma from '../config/db.js';

//POST /auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};


// POST /auth/register
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};




// Forget password functionality can be added here
export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Logic to handle password reset (e.g., sending an email with a reset link)
    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process password reset' });
  }
};
