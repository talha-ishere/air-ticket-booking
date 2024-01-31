import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    auth: authReducer,
  },
});
