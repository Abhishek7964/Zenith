import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import authReducer from "./slice/authSlice";
import persistReducer from "redux-persist/es/persistReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

//Create persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  version: 1,
};

//Combiner reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

//Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Create a store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//Create persistor
export const persistor = persistStore(store);
