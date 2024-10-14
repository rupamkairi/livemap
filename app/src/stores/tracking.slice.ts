import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

export const trackingSlice = createSlice({
  name: 'tracking',
  initialState: {
    positions: [],
  },
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
  },
});

export const {setPositions} = trackingSlice.actions;
export const selectPositions = (state: RootState) => state.tracking.positions;
