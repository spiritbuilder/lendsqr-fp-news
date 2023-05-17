import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Item} from '../../screens/types';

let initialState: number = 0;
export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    setSelected: (state, object) => {
      return object.payload;
    },
  },
});

export const {setSelected} = selectedSlice.actions;

export const selected = (state: RootState) => state.selected;
export default selectedSlice.reducer;
