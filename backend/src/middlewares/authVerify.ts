import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export const authVerify = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set');
    return res.status(500).json({ success: false, message: 'Server configuration error' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.userId = verified.id;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ success: false, message: 'Invalid Token' });
  }
};
