import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./rootSlice";
import { adminReducer } from "./adminSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAdminReducer = persistReducer(persistConfig, adminReducer);

export const store = configureStore({
  reducer: {
    user: reducer,
    admin: persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serializability check
    }),
});

export const persistor = persistStore(store);
