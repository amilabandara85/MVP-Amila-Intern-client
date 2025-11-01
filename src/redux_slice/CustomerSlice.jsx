import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

// Create a slice for customer
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // Action to start loading customers
    fetchCustomersStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Action when customers are successfully loaded
    fetchCustomersSuccess(state, action) {
      state.loading = false;
      state.customers = action.payload; // action.payload will be the array of customers
    },
    // Action for any fetch/API error
    fetchCustomersFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // action.payload will be the error message
    },
    // Action to add a new customer
    addCustomer(state, action) {
      state.customers.push(action.payload); // action.payload is the new customer object
    },
    // Action to update an existing customer
    updateCustomer(state, action) {
      const { id, name, address } = action.payload;
      const existingCustomer = state.customers.find(customer => customer.id === id);
      if (existingCustomer) {
        existingCustomer.name = name;
        existingCustomer.address = address;
      }
    },
    // Action to delete a customer
    deleteCustomer(state, action) {
      // action.payload is the customer ID
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
    },
  },
});

export const {
  fetchCustomersStart,
  fetchCustomersSuccess,
  fetchCustomersFailure,
  addCustomer,
  updateCustomer,
  deleteCustomer
} = customerSlice.actions;

export default customerSlice.reducer;