import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  gleData: [],
  isLoading: true,
};

export const fetchData = createAsyncThunk(
  "funeral-expense/fetchData",
  async (name, thunkAPI) => {
    try {
      console.log(name);
      console.log("thunkAPI: ", thunkAPI);
      console.log("thunkAPI.getState(): ", thunkAPI.getState());
      const response = await axios(url);
      console.log("response: ", response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const gleSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    // Lifecycle actions for createAsyncThunk
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default gleSlice.reducer;
