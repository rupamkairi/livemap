import {configureStore} from '@reduxjs/toolkit';
import {trackingSlice} from './tracking.slice';
import {agentSlice} from './agent.slice';

export const store = configureStore({
  reducer: {
    agent: agentSlice.reducer,
    tracking: trackingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
