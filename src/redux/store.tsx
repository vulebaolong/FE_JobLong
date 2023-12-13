// store.ts

import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import authSlice from './slices/authSlice';
import sidebarSlice from './slices/sidebarSlice';
import roleSlice from './slices/roleSlice';

const store = configureStore({
    reducer: { themeSlice, authSlice, sidebarSlice, roleSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
