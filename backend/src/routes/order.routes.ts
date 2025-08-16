import { Router } from "express";
import { authVerify } from "../middlewares/authVerify";
import { adminVerify } from "../middlewares/adminVerify";
import { createOrder, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post('/', authVerify, createOrder);
orderRouter.get('/order/:id', authVerify, getOrderById);
orderRouter.post('/pay/:id', authVerify, updateOrderToPaid);
orderRouter.get('/myOrders', authVerify, getMyOrders);

//Admin
orderRouter.get('/', adminVerify, getAllOrders);
orderRouter.post('/update/:id', adminVerify, updateOrderStatus);
orderRouter.delete('/:id', adminVerify, deleteOrder);


export default orderRouter;