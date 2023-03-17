import { combineReducers } from '@reduxjs/toolkit'
import auth from '@/store/auth';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>