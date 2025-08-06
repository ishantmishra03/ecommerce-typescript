import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, Order } from '../types';
import axios from '../config/axios'; 

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro 14"',
    description: 'Apple MacBook Pro 14-inch with M2 Pro chip',
    price: 1999,
    images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
    category: 'Electronics',
    stock: 15,
    ratings: 4.8,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones',
    price: 299,
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    category: 'Electronics',
    stock: 45,
    ratings: 4.5,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support',
    price: 399,
    images: ['https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg'],
    category: 'Furniture',
    stock: 8,
    ratings: 4.3,
    createdAt: new Date('2024-01-08')
  }
];

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    totalPrice: 2298,
    orderDate: new Date('2024-01-20'),
    status: 'delivered',
    items: [
      { productId: '1', productName: 'MacBook Pro 14"', quantity: 1, price: 1999 },
      { productId: '2', productName: 'Wireless Headphones', quantity: 1, price: 299 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    totalPrice: 399,
    orderDate: new Date('2024-01-19'),
    status: 'shipped',
    items: [
      { productId: '3', productName: 'Office Chair', quantity: 1, price: 399 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    totalPrice: 598,
    orderDate: new Date('2024-01-18'),
    status: 'processing',
    items: [
      { productId: '2', productName: 'Wireless Headphones', quantity: 2, price: 299 }
    ]
  }
];

interface Admin {
  id: string;
  email: string;
}

interface AppContextProps {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
   const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders] = useState<Order[]>(mockOrders);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const fetchAdmin = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin');
      setAdmin(res.data);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/login', { email, password });
      setAdmin(res.data.admin);
    } catch (error) {
      setAdmin(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    axios.post('/api/admin/logout').finally(() => {
      setAdmin(null);
    });
  };

  return (
    <AppContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        isAuthenticated: true,
        products, orders, setProducts, addProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
