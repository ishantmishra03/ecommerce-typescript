import { Router } from 'express';
import { adminLogin, adminLogout } from '../controllers/adminAuth.controller';
import { adminVerify } from '../middlewares/adminVerify';
import { isAuth } from '../controllers/adminAuth.controller';

const adminAuthRouter = Router();

adminAuthRouter.get('/', adminVerify, isAuth)
adminAuthRouter.post('/login', adminLogin);
adminAuthRouter.post('/logout', adminVerify, adminLogout);

export default adminAuthRouter;
