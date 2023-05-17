import {configureStore} from '@reduxjs/toolkit';
import News from './slices/news';
import Selected from './slices/selected';
import User from './slices/user';
const store = configureStore({
  reducer: {
    news: News,
    selected: Selected,
    user: User,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
