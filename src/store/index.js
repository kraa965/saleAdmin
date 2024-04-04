import menuSlice  from "./reducer/menu/slice";
import salesSlice  from "./reducer/sales/slice";
import skillsSlice from "./reducer/skills/slice";
import schedulSlice from "./reducer/shedule/slice";
import addWorkSlice from "./reducer/addWorker/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  menuSlice,
  salesSlice,
  skillsSlice, 
  schedulSlice,
  addWorkSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
