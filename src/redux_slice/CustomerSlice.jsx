import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerApiServices from '../service/customerservice';


export const fetchCustomersAsync = createAsyncThunk(
    'customer/fetchCustomers',
    async (_, { rejectWithValue }) => {
        try {
       
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
           
            return customerId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete customer');
        }
    }
);




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
           
                state.customers.push(action.payload);
            })

            // --- UPDATE CUSTOMER ---
            .addCase(updateCustomerAsync.fulfilled, (state, action) => {
                const index = state.customers.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    
                    state.customers[index] = action.payload;
                }
            })

            // --- DELETE CUSTOMER ---
            .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
               
                state.customers = state.customers.filter(c => c.id !== action.payload);
            });
    },
});

export default customerSlice.reducer;