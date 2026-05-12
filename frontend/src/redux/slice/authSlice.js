import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Check for an existing guest ID in localStorage or generate a new one
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

// initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async thunk for user login

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL.trim()}/api/users/login`,
        userData,
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
      // returning user object from the storage so we can use it anytime we want to
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Unable to login. Please try again." },
      );
    }
  },
);
// Async thunk for user register

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL.trim()}/api/users/register`,
        userData,
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
      // returning user object from the storage so we can use it anytime we want to
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Unable to register. Please try again." },
      );
    }
  },
);

//Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`; // Reset guest ID on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestID: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Invalid email or password";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Unable to register";
      })
  },
});
export const {logout,generateNewGuestID}= authSlice.actions
export default authSlice.reducer
