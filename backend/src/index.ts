import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import authRouter from './routes/auth.routes';
import adminAuthRouter from './routes/adminAuth.routes';
import productRouter from './routes/product.routes';
import cartRouter from './routes/cart.routes';
import orderRouter from './routes/order.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

//Admin Auth
app.use('/api/admin', adminAuthRouter)

app.get('/', (_req: Request, res : Response) => {
    res.send("Typescript Backend");
})

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
