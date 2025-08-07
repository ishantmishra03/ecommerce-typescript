import { Router } from 'express';
import { createProduct, getAllProducts, getProductById, deleteProduct, editProduct } from '../controllers/products.controller';
import { adminVerify } from '../middlewares/adminVerify';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/add', adminVerify, createProduct);
productRouter.delete('/:id', adminVerify, deleteProduct);
productRouter.post('/edit/:id', adminVerify, editProduct);

export default productRouter;