import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {Item} from '../../screens/types';
import {news} from '../../screens/constants';
let initialState: Item[] = news;
export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, object) => {
      return object.payload;
    },
  }
});

export const {setNews} = newsSlice.actions;

export const selectNews = (state: RootState) => state.news;
export default newsSlice.reducer;
