import menuSlice  from "./reducer/menu/slice";
import salesSlice  from "./reducer/sales/slice";
import skillsSlice from "./reducer/skills/slice";
import schedulSlice from "./reducer/shedule/slice";
import addWorkSlice from "./reducer/addWorker/slice";
import updateSlice from "./reducer/update/slice";
import mangerUpdateSlice from "./reducer/mangerUpdate/slice";
import purchaseSlice from "../components/Purchases/store/reducer/purchase/slice";
import purchaseUpdateSlice from "../components/Purchases/store/reducer/purchaseUpdate/slice";
import updateParametrsSlice from "../components/Purchases/store/reducer/updateParametrs/slice";
import MyClientsSlice from "../components/MyClientsFRmanager/store/reducer/MyClients/slice";
import UpdaterSlice from "../components/MyClientsFRmanager/store/reducer/Updater/slice";
import ExpertsSlice from "../components/MyClientsFRmanager/store/reducer/Experts/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  menuSlice,
  salesSlice,
  skillsSlice, 
  schedulSlice,
  addWorkSlice,
  updateSlice,
  mangerUpdateSlice,
  purchaseSlice,
  purchaseUpdateSlice,
  updateParametrsSlice,
  MyClientsSlice,
  UpdaterSlice,
  ExpertsSlice
});

export const store = configureStore({
  reducer: rootReducer,
});
