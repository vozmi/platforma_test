import { configureStore } from '@reduxjs/toolkit';
import reportView from './features/ReportView/reducer';

const store = configureStore({
  reducer: {
    reportView,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
