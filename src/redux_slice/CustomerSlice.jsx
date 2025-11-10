import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerApiServices from '../service/customerservice'; // Adjust path as needed

// --- ASYNC THUNKS (The four C.R.U.D. actions) ---

export const fetchCustomersAsync = createAsyncThunk(
    'customer/fetchCustomers',
    async (_, { rejectWithValue }) => {
        try {
            // The service returns the customer array directly
            const response = await customerApiServices.fetchCustomers();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch customers');
        }
    }
);

export const addCustomerAsync = createAsyncThunk(
    'customer/addCustomer',
    async (newCustomerData, { rejectWithValue }) => {
        try {
            // The service returns the newly created customer object
            const response = await customerApiServices.addCustomer(newCustomerData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to add customer');
        }
    }
);

export const updateCustomerAsync = createAsyncThunk(
    'customer/updateCustomer',
    async ({ id, updatedCustomerData }, { rejectWithValue }) => {
        try {
            await customerApiServices.updateCustomer(id, updatedCustomerData);
            // Return the updated data so the fulfilled reducer can update the state
            return { id, ...updatedCustomerData };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update customer');
        }
    }
);

export const deleteCustomerAsync = createAsyncThunk(
    'customer/deleteCustomer',
    async (customerId, { rejectWithValue }) => {
        try {
            await customerApiServices.deleteCustomer(customerId);
            // Return the ID so the fulfilled reducer can remove it from state
            return customerId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete customer');
        }
    }
);


// --- INITIAL STATE ---

const initialState = {
    customers: [],
    loading: false,
    error: null,
};


// --- SLICE & EXTRA REDUCERS ---

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {}, // No regular reducers needed for this example
    extraReducers: (builder) => {
        builder
            // --- FETCH CUSTOMERS ---
            .addCase(fetchCustomersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload; // Payload is the array of customers
            })
            .addCase(fetchCustomersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- ADD CUSTOMER ---
            .addCase(addCustomerAsync.fulfilled, (state, action) => {
                // Add the new customer object returned by the server to the array
                state.customers.push(action.payload);
            })

            // --- UPDATE CUSTOMER ---
            .addCase(updateCustomerAsync.fulfilled, (state, action) => {
                const index = state.customers.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    // Update the customer in the array with the new data
                    state.customers[index] = action.payload;
                }
            })

            // --- DELETE CUSTOMER ---
            .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
                // Remove the customer with the matching ID from the array
                state.customers = state.customers.filter(c => c.id !== action.payload);
            });
    },
});

export default customerSlice.reducer;