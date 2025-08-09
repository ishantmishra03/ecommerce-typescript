import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '../../types/product';

interface ProductsState {
  filters: FilterState;
}

const initialState: ProductsState = {
  filters: {
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    searchQuery: '',
    sortBy: 'rating', 
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { updateFilters, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
