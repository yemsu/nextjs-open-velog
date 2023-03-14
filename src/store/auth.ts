import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { postSignup, postSignupPayLoad } from '@/api/auth'

interface UserInfo {
  userId: string,
  nickname: string,
}

interface AuthState {
  isLogin: boolean
  userInfo: UserInfo | null
}

const initialState = {
  isLogin: false,
  userInfo: null
} as AuthState

export const fetchJoin = createAsyncThunk(
  'auth/fetchJoin',
  async (payload: postSignupPayLoad, thunkAPI) => {
    try {
      const response = await postSignup(payload)
      console.log("fetchJoin", response)
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
)

const authSlide = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_IS_LOGIN(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload
    },
    SET_USER_INFO(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload
    },
  },
  extraReducers: {
    [fetchJoin.pending.type]: (state, action) => {
      // 호출 전
      console.log('호출 전')
    },
    [fetchJoin.fulfilled.type]: (state, action) => {
      // 성공
      console.log('성공!!!', action.payload)
      state.isLogin = true
    },
    [fetchJoin.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      console.log('실패', action.payload.message)
    }
  }
})

export const { SET_IS_LOGIN, SET_USER_INFO, } = authSlide.actions
export default authSlide.reducer;