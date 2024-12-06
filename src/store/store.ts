// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../slices/inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
});

// Infer types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
