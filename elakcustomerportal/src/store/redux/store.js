import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { groupCreditReducer } from "../../reducers/groupCreditReducers";
import { authReducer } from "./features/authSlice";
import { funeralExpenseReducer } from "./features/gleSlice";

const rootReducer = combineReducers({
  groupCredit: groupCreditReducer,
  auth: authReducer,
  funeralExpense: funeralExpenseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
