// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './CustomerSlice';
//import customerReducer from './slices/customerSlice';

export const store = configureStore({
    reducer: {
        // We name the state slice 'customerDetails' based on the name used in your original Redux documentation
        customerDetails: customerReducer,
    },
});