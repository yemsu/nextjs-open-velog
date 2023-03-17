import { combineReducers } from '@reduxjs/toolkit'
import auth from '@/store/auth';
import board from '@/store/board';

const rootReducer = combineReducers({
  auth,
  board
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>