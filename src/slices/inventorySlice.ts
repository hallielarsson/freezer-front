import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { InventoryItem } from "@/data/InventoryItem";

// Define types
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
type ErrorResponse = string | object;

const getErrorValue = (error: unknown): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors: Check for response or message
    return error.response?.data || error.message || 'An error occurred with the request';
  } else if (error instanceof Error) {
    // Handle JavaScript errors: Return the error message
    return error.message;
  } else {
    // Handle unknown errors (like unexpected non-error objects)
    return 'An unknown error occurred';
  }
};

// Fetch inventory from server
export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
  const response = await axios.get<InventoryItem[]>('/api/inventory');
  return response.data;
});

// Add a new inventory item to the server
export const addInventoryItem = createAsyncThunk(
  'inventory/addInventoryItem', 
  async (item: Partial<InventoryItem>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/inventory', item);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorValue(error))
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching inventory
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

      // Handle adding inventory item
      .addCase(addInventoryItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.status = 'idle';
        // Optimistic update: Add the new item right away
        state.items.push(action.payload);
      })
      .addCase(addInventoryItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add inventory item';
      });
  },
});

export default inventorySlice.reducer;
