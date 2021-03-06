import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import redditReducer from './redditSlice';
import subredditReducer from './subredditSlice';
import searchReducer from './searchSlice';

export default configureStore({
  reducer: combineReducers({
    reddit: redditReducer,
    subreddits: subredditReducer,
    search: searchReducer,
  }),
  middleware: getDefaultMiddleware({
      serializableCheck: false
  })
});
