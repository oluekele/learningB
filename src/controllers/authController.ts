import { Request, Response } from 'express';
import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

//POST /auth/login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // refresh token can be generated here if needed
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
    });

    // Optionally, you can store the refresh token in the database for later use
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }, 
    });

    // send refresh token as http-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove password before sending user
    const { password: _, ...safeUser } = user;

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: safeUser,
    });
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};


// POST /auth/register
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, 
      },
    });
    // Optionally, you can return the created user without the password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// POST /auth/logout
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
    });
    
    return res.json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to logout' });
  }
}

// Forget password functionality can be added here
export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Generate random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Store hashed token + expiry in DB
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });
    // Send the reset link via email 
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    console.log(`Reset link for ${email}: ${resetLink}`);
    // Logic to handle password reset (e.g., sending an email with a reset link)
    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process password reset' });
  }
};
