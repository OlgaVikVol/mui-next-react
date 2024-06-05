import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/tasksSlice';
import { getStateFromLocalStorage, saveStateToLocalStorage } from './localStorageService';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: getStateFromLocalStorage(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  const state = store.getState();
  saveStateToLocalStorage({ tasks: state.tasks })
});
