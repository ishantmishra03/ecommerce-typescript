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

// Admin Login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUserDocument | null = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    setAuthCookie(res, token);

    res.json({ success: true, message: 'Admin login successful' });
  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Admin Logout
export const adminLogout = (_req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
  });

  res.json({ success: true, message: 'Logged out successfully' });
};
