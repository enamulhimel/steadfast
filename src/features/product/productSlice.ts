import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchProductBySlug, fetchProducts } from '../../../api';
import { Product, Category } from './types';

interface ProductState {
  product: Product | null;
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  categories: [],
  status: 'idle',
  error: null,
};

export const getProductBySlug = createAsyncThunk(
  'product/getProductBySlug',
  async (slug: string) => {
    const response = await fetchProductBySlug(slug);
    return response;
  }
);

export const getCategories = createAsyncThunk(
  'product/getCategories',
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductBySlug.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductBySlug.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(getProductBySlug.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      })
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default productSlice.reducer;