import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
} from 'react-redux';

import { productsSlice } from '../slices/products-slice';

export const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
