import { combineReducers } from '@reduxjs/toolkit'
import auth from '@/store/auth';
import blog from '@/store/blog';

const rootReducer = combineReducers({
  auth,
  blog
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>