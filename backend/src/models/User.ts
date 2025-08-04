import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from '../types/User';

export interface IUserDocument extends IUser, Document {}

const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const UserSchema: Schema<IUserDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    cart: {
      type: [CartItemSchema],
      default: [],
    },

    address: { type: String },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
