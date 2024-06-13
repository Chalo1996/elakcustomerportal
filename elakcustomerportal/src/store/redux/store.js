import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../../reducers/reducer";
import { authReducer } from "./features/authSlice";
import { funeralExpenseReducer } from "./features/gleSlice";

import { groupLifeAssuranceReducer } from "./features/glaSlice";


const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  auth: authReducer,
  funeralExpense: funeralExpenseReducer,
  groupLifeAssurance: groupLifeAssuranceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
