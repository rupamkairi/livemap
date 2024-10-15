import {createSlice} from '@reduxjs/toolkit';
import {agentId} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agentId: agentId,
    trackAgentId: agentId,
    watchId: null,
  },
  selectors: {
    selectAgentId: state => state.agentId,
    selectTrackAgentId: state => state.trackAgentId,
    selectWatchId: state => state.watchId,
  },
  reducers: {
    setAgentId: (state, action) => {
      state.agentId = action.payload;
      AsyncStorage.setItem('agentId', action.payload);
    },
    setTrackAgentId: (state, action) => {
      state.trackAgentId = action.payload;
      AsyncStorage.setItem('trackAgentId', action.payload);
    },
    setWatchId: (state, action) => {
      state.watchId = action.payload;
    },
  },
});

export const {setWatchId} = agentSlice.actions;
