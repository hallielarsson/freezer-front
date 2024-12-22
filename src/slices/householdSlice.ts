import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Household } from "@/data/Household";

// Define types
type HouseholdState = {
  households: Household[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
};

const initialState: HouseholdState = {
  households: [],
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

// Fetch households from server
export const fetchHouseholds = createAsyncThunk('household/fetchHouseholds', async () => {
  const response = await axios.get<Household[]>('/api/households');
  return response.data;
});

// Add a new household to the server (example, if needed)
export const addHousehold = createAsyncThunk(
  'household/addHousehold',
  async (household: Partial<Household>, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/households', household);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorValue(error));
    }
  }
);

const householdSlice = createSlice({
  name: 'household',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching households
      .addCase(fetchHouseholds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHouseholds.fulfilled, (state, action) => {
        state.status = 'idle';
        state.households = action.payload;
      })
      .addCase(fetchHouseholds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch households';
      })

      // Handle adding household
      .addCase(addHousehold.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHousehold.fulfilled, (state, action) => {
        state.status = 'idle';
        // Optimistic update: Add the new household right away
        state.households.push(action.payload);
      })
      .addCase(addHousehold.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add household';
      });
  },
});

export default householdSlice.reducer;
