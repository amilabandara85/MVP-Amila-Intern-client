import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApiServices from '../service/productservice'; 



export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            
            const response = await productApiServices.fetchProducts();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch products');
        }
    }
);

export const addProductAsync = createAsyncThunk(
    'product/addProduct',
    async (newProductData, { rejectWithValue }) => {
        try {
            
            const response = await productApiServices.addProduct(newProductData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to add product');
        }
    }
);

export const updateProductAsync = createAsyncThunk(
    'product/updateProduct',
    async ({ id, updatedProductData }, { rejectWithValue }) => {
        try {
            await productApiServices.updateProduct(id, updatedProductData);
            
            return { id, ...updatedProductData };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update product');
        }
    }
);

export const deleteProductAsync = createAsyncThunk(
    'product/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            await productApiServices.deleteProduct(productId);
          
            return productId;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete product');
        }
    }
);




const initialState = {
    products: [],
    loading: false,
    error: null,
};


// --- SLICE & EXTRA REDUCERS ---

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
          
            .addCase(fetchProductsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- ADD Product ---
            .addCase(addProductAsync.fulfilled, (state, action) => {
                
                state.products.push(action.payload);
            })

            // --- UPDATE Product ---
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                const index = state.products.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    
                    state.products[index] = action.payload;
                }
            })

            // --- DELETE Product ---
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                
                state.products = state.products.filter(c => c.id !== action.payload);
            });
    },
});

export default productSlice.reducer;