import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import salesApiServices from '../service/salesService';


// populateCustomersData()
export const fetchCustomersDropdownAsync = createAsyncThunk(
    'sales/fetchCustomersDropdown',
    async (_, { rejectWithValue }) => {
        try {
            return await salesApiServices.fetchCustomersDropdown();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch customer dropdown data');
        }
    }
);

// populateProductsDropdownData()
export const fetchProductsDropdownAsync = createAsyncThunk(
    'sales/fetchProductsDropdown',
    async (_, { rejectWithValue }) => {
        try {
            return await salesApiServices.fetchProductsDropdown();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch product dropdown data');
        }
    }
);

// populateStoresData()
export const fetchStoresDropdownAsync = createAsyncThunk(
    'sales/fetchStoresDropdown',
    async (_, { rejectWithValue }) => {
        try {
            return await salesApiServices.fetchStoresDropdown();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch store dropdown data');
        }
    }
);


export const fetchSalessAsync = createAsyncThunk(
    'sales/fetchSaless',
    async (_, { rejectWithValue }) => {
        try {
           
            const response = await salesApiServices.fetchSaless();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch saless');
        }
    }
);

export const addSalesAsync = createAsyncThunk(
    'sales/addSales',
    async (newSaleData, { rejectWithValue }) => {
        try {
           
            const response = await salesApiServices.addSales(newSaleData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to add sale');
        }
    }
);

export const updateSalesAsync = createAsyncThunk(
    'sales/updateSales',
    async ({ id, updatedSalesData }, { rejectWithValue }) => {
        try {
            
            const response = await salesApiServices.updateSales(id, updatedSalesData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update sale');
        }
    }
);

export const deleteSalesAsync = createAsyncThunk( 
    'sales/deleteSales',
    async (id, { rejectWithValue }) => {
        try {
            
            const deletedId = await salesApiServices.deleteSales(id);
            return deletedId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete sale');
        }
    }
);


const initialState = {
    saless: [],
    customers: [],
    products: [],
    stores: [],
    loading: false,
    error: null,
};


// --- SLICE & EXTRA REDUCERS ---

export const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchSalessAsync.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSalessAsync.fulfilled, (state, action) => { state.loading = false; state.saless = action.payload; })
            .addCase(fetchSalessAsync.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(fetchCustomersDropdownAsync.fulfilled, (state, action) => { state.customers = action.payload; })
            .addCase(fetchProductsDropdownAsync.fulfilled, (state, action) => { state.products = action.payload; })
            .addCase(fetchStoresDropdownAsync.fulfilled, (state, action) => { state.stores = action.payload; })

            // --- ADD Sales ---
            .addCase(addSalesAsync.fulfilled, (state, action) => {
   
                state.saless.push(action.payload);
            })

            // --- UPDATE Sales ---
            .addCase(updateSalesAsync.fulfilled, (state, action) => {
                const { id, ...updatedData } = action.payload;
                const index = state.saless.findIndex(s => s.id === id);
                if (index !== -1) {
                    
                    state.saless[index] = { ...state.saless[index], ...updatedData };
                }
            })
            .addCase(updateSalesAsync.rejected, (state, action) => {
                state.error = action.payload;
            })

            // --- DELETE Sales ---
            .addCase(deleteSalesAsync.fulfilled, (state, action) => {
                const deletedId = action.payload;
               
                state.saless = state.saless.filter(s => s.id !== deletedId);
            })
            .addCase(deleteSalesAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default salesSlice.reducer;