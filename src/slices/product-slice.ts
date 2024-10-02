import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProductApi, getProductById, likeProductApi, unLikeProductApi } from "../utils/products-api";
import { TProduct } from "./products-slice";

// export const likeProduct = createAsyncThunk(
//   'product/likeById',
//   likeProductApi
// );

// export const unLikeProduct = createAsyncThunk(
//   'product/unLikeById',
//   unLikeProductApi
// );

export const getProduct = createAsyncThunk(
  'product/getById',
  getProductById
);

// export const deleteProductById = createAsyncThunk(
//   'product/deleteById',
//   deleteProductApi
// )

const initialState: TProduct = {
  id: '',
  name: '',
  description: '',
  category: '',
  image: '',
  isLiked: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  selectors: {
    selectIsLiked: (state) => state.isLiked
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getProduct.fulfilled, (state, action) => {
  //       state.category = action.payload.products[];
  //     })
  // }
});

export const { selectIsLiked } = productSlice.selectors;
export const productReducer = productSlice.reducer;