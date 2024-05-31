import { combineReducers, configureStore } from "@reduxjs/toolkit";
import MyClientsSlice from './reducer/MyClients/slice';
import UpdaterSlice from './reducer/Updater/slice';

export const rootReducer = combineReducers({
  MyClientsSlice,
  UpdaterSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
