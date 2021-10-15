import modalInfoReducer from '../features/modalInfo';
import { configureStore } from '@reduxjs/toolkit';

//source for redux implementation: https://www.youtube.com/watch?v=k68j9xlbHHk
export const store = configureStore({
  reducer: {
    modalInfo: modalInfoReducer,
  }
});

//used in hooks.tsx to create a standard typescript way of using state and dispatch without declearing type every time
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch