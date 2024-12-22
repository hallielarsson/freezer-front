import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from "@/data/User"; // Assuming the User type is defined as in your example

// Define types
type UserState = {
  user: User | null;
  users: User[]; // List of users in households you share
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
};

const initialState: UserState = {
  user: null,
  users: [],
  status: 'idle',
  error: null,
};

type ErrorResponse = string | object;

const getErrorValue = (error: unknown): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || error.message || 'An error occurred with the request';
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'An unknown error occurred';
  }
};

// Fetch the current user from the server
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await axios.get<User>('/api/user');
  return response.data;
});

// Fetch users in households the current user shares
export const fetchUsersInHousehold = createAsyncThunk(
  'user/fetchUsersInHousehold',
  async () => {
    const response = await axios.get<User[]>('/api/users');
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching current user
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user';
      })

      // Handle fetching users in shared households
      .addCase(fetchUsersInHousehold.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsersInHousehold.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(fetchUsersInHousehold.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users in shared households';
      });
  },
});

export default userSlice.reducer;
