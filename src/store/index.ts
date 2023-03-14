import { combineReducers } from '@reduxjs/toolkit';
import boards from '@/store/board';

const rootReducer = combineReducers({
  boards
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;