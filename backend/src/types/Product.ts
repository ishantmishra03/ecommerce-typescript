export interface IProduct {
  name: string;
  description: string;
  price: number;
  images: string[]; 
  category: string;
  stock: number;
  ratings?: number; 
  createdAt?: Date;
  updatedAt?: Date;
}
