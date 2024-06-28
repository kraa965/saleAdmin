import menuSlice  from "./reducer/menu/slice";
import salesSlice  from "./reducer/sales/slice";
import skillsSlice from "./reducer/skills/slice";
import schedulSlice from "./reducer/shedule/slice";
import addWorkSlice from "./reducer/addWorker/slice";
import updateSlice from '../components/Stock/store/reducer/update/slice'
import mangerUpdateSlice from "./reducer/mangerUpdate/slice";
import purchaseSlice from "../components/Purchases/store/reducer/purchase/slice";
import purchaseUpdateSlice from "../components/Purchases/store/reducer/purchaseUpdate/slice";
import updateParametrsSlice from "../components/Purchases/store/reducer/updateParametrs/slice";
//мои клиенты fr
import MyClientsSlice from "../components/MyClientsFRmanager/store/reducer/MyClients/slice";
import MyClientsFrSlice from "../components/MyClientsFRmanager/store/reducer/MyClientsFr/slice";
import UpdaterSlice from "../components/MyClientsFRmanager/store/reducer/Updater/slice";
import ExpertsSlice from "../components/MyClientsFRmanager/store/reducer/Experts/slice";
//работа с клиентам fr
import AppSlice from '../components/FrClientWork/store/reducer/App/slice';
import ClientSlice from '../components/FrClientWork/store/reducer/Client/slice';
import WidgetSlice from '../components/FrClientWork/store/reducer/Widget/slice';
import WorkSlice from '../components/FrClientWork/store/reducer/Work/slice'; 
import PartnersSlice from '../components/FrClientWork/store/reducer/Partners/slice';
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
  MyClientsFrSlice,
  UpdaterSlice,
  ExpertsSlice,

  //работа с клиентом FR
  AppSlice,
  ClientSlice,
  WidgetSlice,
  WorkSlice,
  PartnersSlice
});

export const store = configureStore({
  reducer: rootReducer,
 /*  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }) */
});
