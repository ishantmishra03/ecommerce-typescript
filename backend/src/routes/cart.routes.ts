import { Router } from "express";
import { addToCart, removeFromCart, updateCartItem, getCart, clearUserCart } from '../controllers/cart.controller';
import { authVerify } from "../middlewares/authVerify";

const cartRouter = Router();
cartRouter.get('/', authVerify, getCart);
cartRouter.post('/', authVerify, addToCart);
cartRouter.put('/update', authVerify, updateCartItem);
cartRouter.post('/remove', authVerify, removeFromCart);
cartRouter.delete('/delete', authVerify, clearUserCart);

export default cartRouter;