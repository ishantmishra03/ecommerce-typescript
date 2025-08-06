export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  ratings: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  customerName: string;
  totalPrice: number;
  orderDate: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  stock: string;
}

export interface ProductFormErrors {
  name?: string;
  description?: string;
  price?: string;
  images?: string;
  category?: string;
  stock?: string;
}