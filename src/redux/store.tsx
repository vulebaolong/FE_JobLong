// store.ts

import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: { themeSlice, authSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
