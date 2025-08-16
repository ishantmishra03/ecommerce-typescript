import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import themeReducer from './slices/theme.slice';
import productReducer from './slices/product.slice';
import cartReducer from './slices/cart.slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme : themeReducer,
        products: productReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;