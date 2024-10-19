import {configureStore} from '@reduxjs/toolkit';
import {agentSlice} from './agent.slice';
import {backgroundStates} from './background-states';
import {trackingSlice} from './tracking.slice';

export const store = configureStore({
  reducer: {
    agent: agentSlice.reducer,
    tracking: trackingSlice.reducer,
    backgroundStates: backgroundStates.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
