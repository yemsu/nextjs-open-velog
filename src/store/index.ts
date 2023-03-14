import { combineReducers } from '@reduxjs/toolkit';
import posts from '@/store/posts';

const rootReducer = combineReducers({
  posts
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;