export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  ratings: number;
  createdAt: Date;
}

export interface OrderItem {
  _id?: string;
  product: Product;    // product object nested here
  quantity: number;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

export interface Order {
  _id: string;
  user: UserInfo;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  createdAt: Date;
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
