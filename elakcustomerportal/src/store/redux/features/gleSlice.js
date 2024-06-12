import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sisos-eu.azurewebsites.net/api/cmd";

const initialState = {
  gleData: [],
  isLoading: false,
};
const data = {
  inputData: {
    persons: [
      {
        name: "Principal Member",
        lives: 1,
        sumAssuredPercentage: 100,
      },
      {
        name: "Spouse",
        lives: 1,
        sumAssuredPercentage: 100,
      },
      {
        name: "Children",
        lives: 2,
        sumAssuredPercentage: 50,
      },
      {
        name: "Parents",
        lives: 2,
        sumAssuredPercentage: 75,
      },
      {
        name: "Parents In Law",
        lives: 2,
        sumAssuredPercentage: 75,
      },
    ],
    parameters: {
      benefitAmount: 50000,
      mortalityRiskLoading: 0.05,
      marketingExpenseLoading: 0.08,
      businessExpenseLoading: 0.2,
      profitLoading: 0.05,
      groupCoverAverageAge: 40,
      childAge: 18,
      parentAge: 60,
      mortalityTable: "CI - IndividualMortalityRateTable",
      currencySymbol: "KSh",
    },
    dates: {
      commencementDate: "2022-12-01",
      expiryDate: "2023-11-30",
    },
    applicant: {
      title: "Mr",
      applicantName: "George Odera",
      gender: "Male",
      dob: "1989-02-01",
      email: "lg.odera@gmail.com",
      phone: "0712345678",
    },
  },
};

const dataToPost = {
  cmd: "ExeChain",
  data: {
    chain: "M3TrainingGLECalculator",
    context: JSON.stringify(data),
  },
};

export const fetchData = createAsyncThunk(
  "funeralExpense/fetchData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(url, dataToPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("funeralExpense response: ", response);
      return response.data.outData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const funeralExpenseSlice = createSlice({
  name: "funeralExpense",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {
  actions: funeralExpenseActions,
  reducer: funeralExpenseReducer,
} = funeralExpenseSlice;
