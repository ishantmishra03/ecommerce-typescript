import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, Order } from '../types';
import axios from '../config/axios';
import toast from 'react-hot-toast';

interface DataContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  fetchProducts: () => Promise<void>;
  fetchOrders: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};


export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  //Fetch products
  const fetchProducts = async () => {
    try {
      const {data} = await axios.get('/api/product');
      if(data.success){
        setProducts(data.products);
      }
    } catch (error: unknown) {
      console.log(error.messgae);
    }
  }

  //Fetch all orders
  const fetchOrders = async () => {
    try {
      const {data} = await axios.get('/api/order');
      if(data.success){
        setOrders(data.orders);
        console.log(data.orders);
      }
    } catch (error : unknown) {
      console.log(error.message);
    }
  }


const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
  try {
    const {data} = await axios.post('/api/product/add', productData);
    if(data.success){
      toast.success(data.message);
      fetchProducts();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error; 
  }
};


  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [])

  return (
    <DataContext.Provider value={{ products, orders, addProduct, fetchProducts, fetchOrders }}>
      {children}
    </DataContext.Provider>
  );
};