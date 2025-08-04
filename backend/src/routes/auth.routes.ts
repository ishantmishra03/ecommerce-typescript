import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { authVerify } from '../middlewares/authVerify';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authVerify, logout);

export default authRouter;
