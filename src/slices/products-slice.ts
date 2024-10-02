import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TCreateProductResponse, createProductApi, deleteProductApi, getProductById, getProductsApi, likeProductApi, unLikeProductApi } from "../utils/products-api";

export const getProducts = createAsyncThunk(
  'products/getAll',
  getProductsApi
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  createProductApi
);

export const likeProduct = createAsyncThunk(
  'product/likeById',
  likeProductApi
);

export const unLikeProduct = createAsyncThunk(
  'product/unLikeById',
  unLikeProductApi
);

export const deleteProductById = createAsyncThunk(
  'product/deleteById',
  deleteProductApi
);

export const getProduct = createAsyncThunk(
  'product/getProductById',
  getProductById
);

export type TProduct = {
  id: string,
  name: string,
  description: string,
  category: string,
  image: string,
  isLiked: boolean
}

type TState = {
  data: TProduct[],
  isLoading: boolean
}

export const initialState: TState = {
  data: [],
  isLoading: false
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // deleteProduct: (state, action: PayloadAction<TProduct>) => {
    //   state.data = state.data.filter((item) => item.id !== action.payload.id);
    // }
  },
  selectors: {
    selectProducts: (state) => state.data,
    selectOnlyLikedProducts: (state) => state.data.filter((product) => product.isLiked === true),
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(likeProduct.fulfilled, (state, action) => {
        const productToLike = state.data.find((product) => {
          return product.id === action.payload.id
        });
        if (productToLike) {
          productToLike.isLiked = true;
        }
      })
      .addCase(unLikeProduct.fulfilled, (state, action) => {
        const productToUnLike = state.data.find((product) => {
          return product.id === action.payload.id
        });
        if (productToUnLike) {
          productToUnLike.isLiked = false;
        }
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.data = state.data.filter((product) => product.id !== action.payload.id);
      });
  }
})

export const { selectProducts, selectIsLoading, selectOnlyLikedProducts } = productsSlice.selectors;
export const productsReducer = productsSlice.reducer;