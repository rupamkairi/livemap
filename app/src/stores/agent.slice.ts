import {createSlice} from '@reduxjs/toolkit';
import {agentId} from '../constants';

export const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agentId: agentId,
  },
  selectors: {
    selectAgentId: state => state.agentId,
  },
  reducers: {},
});

export const {} = agentSlice.actions;
