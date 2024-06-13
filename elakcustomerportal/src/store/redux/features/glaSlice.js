import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sisos-eu.azurewebsites.net/api/cmd";

const initialState = {
  glaData: [],
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "groupLifeAssurance/fetchData",
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
          chain: "M3TrainingCostingScheduleGLA",
          context: JSON.stringify(data),
        },
      };
      const response = await axios.post(url, dataToPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("groupLifeAssurance response: ", response.data);
      return response.data.outData;
    } catch (error) {
      console.error("fetchData error:", error);
      return rejectWithValue(error.message || error.response.data);
    }
  }
);

const groupLifeAssuranceSlice = createSlice({
  name: "groupLifeAssurance",
  initialState: initialState,
  reducers: {
    resetData: (state) => {
      state.isLoading = false;
      state.error = null;
      state.glaData = [];
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
        state.glaData = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error occurred";
      });
  },
});

export const { resetData } = groupLifeAssuranceSlice.actions;
export const groupLifeAssuranceReducer = groupLifeAssuranceSlice.reducer;
