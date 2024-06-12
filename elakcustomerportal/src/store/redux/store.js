import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../../reducers/reducer";
import { authReducer } from "./features/authSlice";
import { funeralExpenseReducer } from "./features/gleSlice";

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  auth: authReducer,
  funeralExpense: funeralExpenseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
