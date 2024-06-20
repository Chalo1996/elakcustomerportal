import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sisos-eu.azurewebsites.net/api/cmd";

// Initial state with added error field and isLoading set to false initially
const initialState = {
  goalbasedData: [],
  isLoading: false,
  error: null,
};

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  "goalBased/fetchData",
  async (data, thunkAPI) => {
    console.log("Fetching data...");
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const dataToPost = {
        cmd: "ExeChain",
        data: {
          chain: "M3TrainingGOALBASED",
          context: JSON.stringify(data),
        },
      };
      const response = await axios.post(url, dataToPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("goalbased response: ", response);
      return response.data.outData;
    } catch (error) {
      // Handling error response
      return thunkAPI.rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Slice definition
const goalbasedSlice = createSlice({
  name: "goalBased",
  initialState: initialState,
  reducers: {
    resetData: (state) => {
      // Reset state values
      state.isLoading = false;
      state.goalbasedData = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error state when starting a new fetch
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log("Data fetched successfully:", action.payload);
        state.isLoading = false;
        state.goalbasedData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log("Failed to fetch data:", action.payload);
        state.isLoading = false;
        state.error = action.payload; // Set error state
      });
  },
});

export const { resetGoalbasedData } = goalbasedSlice.actions;

export const { reducer: goalbasedReducer } = goalbasedSlice;
