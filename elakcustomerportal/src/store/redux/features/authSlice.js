import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authUrl = "https://sisos-eu.azurewebsites.net/api/pub/authenticate";
const credentials = {
  email: "equityuat\\MOGAKA.OWEN@ebsafrica.onmicrosoft.com",
  clave: "Equity2024!!!",
};

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async (thunkAPI) => {
    try {
      const response = await axios.post(authUrl, credentials);
      console.log("authSlice response: ", response);
      return response.data.outData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
