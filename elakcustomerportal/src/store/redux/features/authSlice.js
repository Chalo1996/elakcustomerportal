import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authUrl = "https://sisos-eu.azurewebsites.net/api/pub/authenticate";
const credentials = {
  email: "equityuat\\MOGAKA.OWEN@ebsafrica.onmicrosoft.com",
  clave: "Equity2024!!!",
};

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(authUrl, credentials);
      return response.data.outData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("authToken") || null,
    status: localStorage.getItem("authStatus") || "idle",
    error: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
        localStorage.setItem("authStatus", "loading");
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("authStatus", "succeeded");
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        localStorage.setItem("authStatus", "failed");
      });
  },
});

export const { setToken, setStatus } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
