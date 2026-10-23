import { configureStore } from '@reduxjs/toolkit';
import { leadsApi } from '../api/leadsApi';

export const store = configureStore({
  reducer: {
    [leadsApi.reducerPath]: leadsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(leadsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
