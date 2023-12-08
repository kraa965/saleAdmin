import menuSlice  from "./reducer/menu/slice";
import salesSlice  from "./reducer/sales/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  menuSlice,
  salesSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
