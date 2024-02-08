import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import notificationReducer from "./modules/common/redux/notificationSlice";
import projectMetaReducer from "./modules/workSpace/redux/projectMetaSlice";
import authStateReducer from "./modules/auth/redux/authSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  projectMeta: projectMetaReducer,
  notification: notificationReducer,
  auth: authStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
