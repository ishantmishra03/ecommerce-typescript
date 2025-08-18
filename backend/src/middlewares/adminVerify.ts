import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export interface AdminRequest extends Request {
  userId?: string;
}

export const adminVerify = async (req: AdminRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not set');
    return res.status(500).json({ success: false, message: 'Server configuration error' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.userId = verified.id;

    const user = await User.findById(verified.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.role !== 'admin')
      return res.status(403).json({ success: false, message: 'Access forbidden: Admins only' });

    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};
