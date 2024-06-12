import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../../reducers/reducer";
import authReducer from "../../reducers/authReducer";
import funeralExpenseReducer from "../../reducers/funeralExpenseReducer";

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  auth: authReducer,
  funeralExpense: funeralExpenseReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
