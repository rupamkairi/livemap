import {createSlice} from '@reduxjs/toolkit';

const BASIC_DEFAULT_OPTIONS = {
  taskName: 'Background Action',
  taskTitle: 'Background Action Title',
  taskDesc: 'Background Action Description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ffffff',
  linkingURI: 'scheme://host/path',
  parameters: {
    delay: 1000 * 60,
  },
};

export const backgroundStates = createSlice({
  name: 'backgroundStates',
  initialState: {
    LOGIN: true,
    LOGOUT: true,
    OVERTIME: false,
    CLOCKRUNNING: true,

    last: {
      name: 'TIMER_LOG',
    },

    next: {
      name: 'TIMER_LOG',
    },

    backgroundActionOptions: BASIC_DEFAULT_OPTIONS,
  },
  selectors: {
    selectBackgroundActionOptions: state => state.backgroundActionOptions,
    selectLast: state => state.last,
    selectNext: state => state.next,
  },
  reducers: {
    setBackgroundActionOptions: (state, action) => {
      state.backgroundActionOptions = action.payload;
    },
    setLast: (state, action) => {
      state.last = action.payload;
    },
    setNext: (state, action) => {
      state.next = action.payload;
    },
  },
});
