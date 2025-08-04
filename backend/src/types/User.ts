export interface CartItem {
  productId: string;
  quantity: number;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  cart: CartItem[];
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
