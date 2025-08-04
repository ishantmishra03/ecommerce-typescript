import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

interface AuthRequest extends Request {
  userId?: string;
}

export const authVerify = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = verified.id;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
