import {createSlice} from '@reduxjs/toolkit';

export const trackingSlice = createSlice({
  name: 'tracking',
  initialState: {
    positions: [],
  },
  selectors: {
    selectPositions: state => state.positions,
  },
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    appendPositions: (state, action) => {
      const {position} = action.payload;
      if (position) {
        state.positions = [...state.positions, position];
      }
    },
  },
});

export const {setPositions} = trackingSlice.actions;
