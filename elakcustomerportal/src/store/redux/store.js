import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/authSlice";
import { funeralExpenseReducer } from "./features/gleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    funeralExpense: funeralExpenseReducer,
  },
});
