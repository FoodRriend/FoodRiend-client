import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import modalReducer from './modalSlice';
import profileReducer from './profileSlice';
import searchReducer from './searchSlice';
import feedReducer from './feedSlice';
import postReducer from './postSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    modals: modalReducer,
    profiles: profileReducer,
    search: searchReducer,
    feed: feedReducer,
    posts: postReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
