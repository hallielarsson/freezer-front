import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { InventoryItem } from "@/data/InventoryItem";


type InventoryState = {
  items: InventoryItem[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  status: 'idle',
  error: null,
};

// Fetch inventory from server
export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
  const response = await axios.get<InventoryItem[]>('/api/inventory');
  return await response.data;
});

// Add a new inventory item to the server
export const addInventoryItem = createAsyncThunk('inventory/addInventoryItem', async (item: Partial<InventoryItem>) => {
  const response = await axios.post('/api/inventory', item);
  return await response.data;
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch inventory';
      })
      .addCase(addInventoryItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.status = 'idle';
        // Add the new item to the inventory list
        state.items.push(action.payload);
      })
      .addCase(addInventoryItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add inventory item';
      });
  },
});

export default inventorySlice.reducer;
