import { configureStore } from '@reduxjs/toolkit';
import healthRecordsReducer from './healthRecordsSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    healthRecords: healthRecordsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
