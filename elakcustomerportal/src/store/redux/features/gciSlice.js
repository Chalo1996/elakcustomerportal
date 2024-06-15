import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sisos-eu.azurewebsites.net/api/cmd";

const initialState = {
  gciData: [],
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "groupCriticalIllness/fetchData",
  async (data, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { token } = getState().auth;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const dataToPost = {
        cmd: "ExeChain",
        data: {
          chain: "M3TrainingGCICalculator2",
          context: JSON.stringify(data),
        },
      };
      const response = await axios.post(url, dataToPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("groupCriticalIllness response: ", response.data);
      return response.data.outData;
    } catch (error) {
      console.error("fetchData error:", error);
      return rejectWithValue(error.message || error.response.data);
    }
  }
);

const groupCriticalIllnessSlice = createSlice({
  name: "groupCriticalIllness",
  initialState: initialState,
  reducers: {
    resetData: (state) => {
      state.isLoading = false;
      state.error = null;
      state.gciData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gciData = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error occurred";
      });
  },
});

export const { resetData } = groupCriticalIllnessSlice.actions;
export const groupCriticalIllnessReducer = groupCriticalIllnessSlice.reducer;
