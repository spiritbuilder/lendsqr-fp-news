import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Item} from '../../screens/types';
import {news} from '../../screens/constants';
let initialState: any = {};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, object) => {
      return object.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const user = (state: RootState) => state.user;
export default userSlice.reducer;
