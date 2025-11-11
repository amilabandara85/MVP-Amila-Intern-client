import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storeApiServices from '../service/storeservice';



export const fetchStoresAsync = createAsyncThunk(
    'store/fetchStores',
    async (_, { rejectWithValue }) => {
        try {
           
            const response = await storeApiServices.fetchStores();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch stores');
        }
    }
);

export const addStoreAsync = createAsyncThunk(
    'store/addStore',
    async (newStoreData, { rejectWithValue }) => {
        try {
           
            const response = await storeApiServices.addStore(newStoreData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to add store');
        }
    }
);

export const updateStoreAsync = createAsyncThunk(
    'store/updateStore',
    async ({ id, updatedStoreData }, { rejectWithValue }) => {
        try {
            await storeApiServices.updateStore(id, updatedStoreData);
           
            return { id, ...updatedStoreData };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update store');
        }
    }
);

export const deleteStoreAsync = createAsyncThunk(
    'store/deleteStore',
    async (storeId, { rejectWithValue }) => {
        try {
            await storeApiServices.deleteStore(storeId);
           
            return storeId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete store');
        }
    }
);


const initialState = {
    stores: [],
    loading: false,
    error: null,
};


// --- SLICE & EXTRA REDUCERS ---

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {}, // No regular reducers needed for this example
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchStoresAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStoresAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.stores = action.payload; 
            })
            .addCase(fetchStoresAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- ADD Store ---
            .addCase(addStoreAsync.fulfilled, (state, action) => {
   
                state.stores.push(action.payload);
            })

            // --- UPDATE Store ---
            .addCase(updateStoreAsync.fulfilled, (state, action) => {
                const index = state.stores.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                  
                    state.stores[index] = action.payload;
                }
            })

            // --- DELETE Store ---
            .addCase(deleteStoreAsync.fulfilled, (state, action) => {
         
                state.stores = state.stores.filter(c => c.id !== action.payload);
            });
    },
});

export default storeSlice.reducer;