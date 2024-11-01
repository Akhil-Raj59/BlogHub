import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        // TODO: add more slices here for posts
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

export default store;
