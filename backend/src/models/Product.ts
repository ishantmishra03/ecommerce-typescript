import mongoose, { Document, Schema, Model } from 'mongoose';
import { IProduct } from '../types/Product';

export interface IProductDocument extends IProduct, Document {}

const ProductSchema: Schema<IProductDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    ratings: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProductDocument> = mongoose.model<IProductDocument>('Product', ProductSchema);

export default Product;
