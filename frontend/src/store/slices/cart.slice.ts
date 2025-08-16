import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from '../../config/axios';
import type { Product } from '../../types/product';

interface CartItem {
  productId: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};


export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/api/cart');
    return res.data.cart as CartItem[];
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch cart');
  }
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, thunkAPI) => {
    try {
      await axios.post('/api/cart', { productId, quantity });
      thunkAPI.dispatch(fetchCart());
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }: { productId: string; quantity: number }, thunkAPI) => {
    try {
      await axios.put('/api/cart/update', { productId, quantity });
      thunkAPI.dispatch(fetchCart());
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update cart item');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, thunkAPI) => {
    try {
      await axios.post('/api/cart/remove', { productId });
      thunkAPI.dispatch(fetchCart());
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
