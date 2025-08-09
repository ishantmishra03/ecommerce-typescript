export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; 
  category: string;
  stock: number;
  ratings: number; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}