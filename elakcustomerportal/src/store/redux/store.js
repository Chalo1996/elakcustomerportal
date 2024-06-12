import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../../reducers/reducer";

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
});

export const store = configureStore({
  reducer: rootReducer: {
    auth: authReducer,
    funeralExpense: funeralExpenseReducer,
  },
});
