import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AUTH_TOKEN } from '@/constants/etc'
import Axios from '@/api/Axios'
import { SignupPayLoad, SignInPayLoad, UserInfo } from '@/types/auth'
import { postSignup, postSignIn } from '@/api/auth'

const name = 'auth'

interface AuthState {
  isLogin: boolean
  userInfo: UserInfo | null
}

const initialState = {
  isLogin: false,
  userInfo: null
} as AuthState

export const fetchJoin = createAsyncThunk(
  `${name}/fetchJoin`,
  async (payload: SignupPayLoad, thunkAPI) => {
    try {
      const response = await postSignup(payload)
      console.log('fetchJoin', response.data)
      return response.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
)

export const fetchLogin = createAsyncThunk(
  `${name}/fetchLogin`,
  async (payload: SignInPayLoad, thunkAPI) => {
    try {
      const response = await postSignIn(payload)
      const authToken = response.headers.authorization.replace('Bearer ', '')
      localStorage.setItem(AUTH_TOKEN, authToken)
      Axios.prototype.authToken = authToken
      return response.data.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
)

const authSlide = createSlice({
  name,
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
      console.log('회원가입 호출 전')
    },
    [fetchJoin.fulfilled.type]: (state, action) => {
      // 성공
      console.log('회원가입 성공!!!', action.payload)
      state.isLogin = true
    },
    [fetchJoin.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; code: number }>
    ) => {
      // 실패
      console.log('회원가입 실패', action.payload.message)
    },
    [fetchLogin.pending.type]: (state, action) => {
      // 호출 전
      console.log('로그인 호출 전')
    },
    [fetchLogin.fulfilled.type]: (state, action) => {
      // 성공
      console.log('로그인 성공!!!', action.payload)
      state.isLogin = true
    },
    [fetchLogin.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; code: number }>
    ) => {
      // 실패
      console.log('로그인 실패', action.payload.message)
    },
  }
})

export const { SET_IS_LOGIN, SET_USER_INFO } = authSlide.actions
export default authSlide.reducer;