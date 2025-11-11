import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './CustomerSlice';
import productReducer from './ProductSlice';
import storeReducer from './StoreSlice';
import salesReducer from './SalesSlice';


export const store = configureStore({
    reducer: {
       
        customerDetails: customerReducer,
        productDetails: productReducer,
        storeDetails: storeReducer,
        salesDetails: salesReducer,
    },
});