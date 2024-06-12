import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../../reducers/reducer";

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
