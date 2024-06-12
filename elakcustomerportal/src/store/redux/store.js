import { configureStore } from "@reduxjs/toolkit";
import gleSliceReducer from "./features/gleSlice";

export const store = configureStore({
  reducer: {
    funeralExpense: gleSliceReducer,
  },
});
