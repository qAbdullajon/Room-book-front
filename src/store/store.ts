import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import roomReducer from "./roomSlice";
import bookReducer from "./bookSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    books: bookReducer,
  },
});

// RootState va AppDispatch turini chiqarish
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
