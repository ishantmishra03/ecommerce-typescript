import express,{ Router } from 'express';
import { authVerify } from '../middlewares/authVerify';
import {  createCheckoutSession, handleStripeWebhook } from '../controllers/payment.controller';

const paymentRouter = Router();

paymentRouter.post("/create-checkout-session", createCheckoutSession);

paymentRouter.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default paymentRouter;