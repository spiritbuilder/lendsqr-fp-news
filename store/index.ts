import {combineReducers, configureStore} from '@reduxjs/toolkit';
import News from './slices/news';
import Selected from './slices/selected';
import User from './slices/user';
import type {PreloadedState} from '@reduxjs/toolkit';

let rootReducer = combineReducers({
  news: News,
  selected: Selected,
  user: User,
});
const store = configureStore({
  reducer: {
    news: News,
    selected: Selected,
    user: User,
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
