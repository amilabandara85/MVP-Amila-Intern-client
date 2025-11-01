import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../pages/Customer/customerSlice';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    // Add other slices here (e.g., product: productReducer)
  },
});