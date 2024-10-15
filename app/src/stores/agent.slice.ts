import {createSlice} from '@reduxjs/toolkit';
import {agentId} from '../constants';

export const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agentId: agentId,
    watchId: null,
  },
  selectors: {
    selectAgentId: state => state.agentId,
    selectWatchId: state => state.watchId,
  },
  reducers: {
    setWatchId: (state, action) => {
      state.watchId = action.payload;
    },
  },
});

export const {setWatchId} = agentSlice.actions;
