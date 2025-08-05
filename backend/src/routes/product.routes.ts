import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, deleteProduct } from '../controllers/products.controller';
import { adminVerify } from '../middlewares/adminVerify';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/add', adminVerify, createProduct);
productRouter.delete('/:id', adminVerify, deleteProduct);

export default productRouter;