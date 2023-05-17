import {configureStore} from '@reduxjs/toolkit';
import News from './slices/news';
import Selected from './slices/selected';
const store = configureStore({
  reducer: {
    news: News,
    selected: Selected,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
