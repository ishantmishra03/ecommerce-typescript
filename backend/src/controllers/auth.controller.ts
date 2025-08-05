import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserDocument } from '../models/User';

const JWT_EXPIRE = 60 * 60 * 1000;
const isProd = process.env.NODE_ENV === 'production';

// Sets cookie
const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: JWT_EXPIRE,
  });
};

// Register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser: IUserDocument | null = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: IUserDocument = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    setAuthCookie(res, token);

    res.status(201).json({ message: 'User registered successfully' });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUserDocument | null = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    setAuthCookie(res, token);

    res.json({ message: 'Login successful' });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout
export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
  });

  res.json({ message: 'Logged out successfully' });
};
