import axios from '../config/axios';
import type { Product } from '../types/product';

const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get('/api/product');
    if (data.success && Array.isArray(data.products)) {
      return data.products;
    }
    return [];
  } catch (error: any) {
    console.error(error.response?.data?.message || error.message);
    return [];
  }
};

export default getProducts;
