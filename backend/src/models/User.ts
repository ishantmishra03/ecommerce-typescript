import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from '../types/User';

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema<IUserDocument> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
