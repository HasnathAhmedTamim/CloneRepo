import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null, // For storing error messages
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data); // Use rejectWithValue to pass error data
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data); // Use rejectWithValue to pass error data
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Register Fulfilled Payload:", action.payload);
        state.isLoading = false;
        state.user = null; // Assuming user data isn't returned on registration
        state.isAuthenticated = false; // Registration usually doesn't auto-authenticate
        state.error = null; // Clear any previous errors
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Register Rejected Payload:", action.payload);
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || action.error.message; // Handle error messages
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login Fulfilled Payload:", action.payload);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.error = null; // Clear any previous errors
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login Rejected Payload:", action.payload);
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || action.error.message; // Handle error messages
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
