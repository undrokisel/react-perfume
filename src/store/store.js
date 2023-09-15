import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice';
import favoritesReducer from './favoritesSlice';
import ordersReducer from './ordersSlice';

export const  store = configureStore({
    reducer: {
        products: productsReducer,
        favorites: favoritesReducer,
        orders: ordersReducer,
    }
})