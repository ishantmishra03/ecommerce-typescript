import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import themeReducer from './slices/theme.slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme : themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;