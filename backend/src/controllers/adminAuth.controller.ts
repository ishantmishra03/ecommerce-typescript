import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserDocument } from '../models/User';
import { AdminRequest } from '../middlewares/adminVerify';

const JWT_EXPIRE = 60 * 60 * 1000; 
const isProd = process.env.NODE_ENV === 'production';


const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: JWT_EXPIRE,
  });
};


export const isAuth = async (req: AdminRequest, res: Response) => {
  try {
    const userId = req.userId;
    const user: IUserDocument | null = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found' });
    }

    return res.status(200).json({
      success: true,
      admin: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: IUserDocument | null = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    setAuthCookie(res, token);

    return res.json({
      success: true,
      message: 'Admin login successful',
      admin: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const adminLogout = (_req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
  });

  return res.json({ success: true, message: 'Logged out successfully' });
};
