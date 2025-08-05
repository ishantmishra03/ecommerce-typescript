import { Router } from 'express';
import { register ,login, logout } from '../controllers/auth.controller';
import { adminVerify } from '../middlewares/adminVerify';

const adminAuthRouter = Router();

adminAuthRouter.post('/register', register);
adminAuthRouter.post('/login', login);
adminAuthRouter.post('/logout', adminVerify, logout);

export default adminAuthRouter;
