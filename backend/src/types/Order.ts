import mongoose from "mongoose";

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder{
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  isPaid : boolean;
}