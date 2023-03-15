import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH_TOKEN } from '@/constants/etc'
import Axios from '@/api/Axios'
import { SignupPayLoad, SignInPayLoad, UserResponse, UserResponseData } from '@/types/auth'
import { ErrorResponse } from '@/types/api'
import { postSignup, postSignIn } from '@/api/auth'
import { getRejectValue } from '@/utils/store'
import { AxiosError } from 'axios'
import { RootState } from '.'

const name = 'auth'

export const fetchJoin = createAsyncThunk<UserResponse, SignupPayLoad, {rejectValue: ErrorResponse}>(
  `${name}/fetchJoin`,
  async (payload: SignupPayLoad, thunkAPI) => {
    try {
      const response = await postSignup(payload)
      return response.data
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(getRejectValue(error))
      } else {
        throw error;
      }
    }
  }
)

export const fetchLogin = createAsyncThunk<UserResponse, SignInPayLoad, {rejectValue: ErrorResponse}>(
  `${name}/fetchLogin`,
  async (payload: SignInPayLoad, thunkAPI) => {
    try {
      const response = await postSignIn(payload)
      const authToken = response.headers.authorization.replace('Bearer ', '')
      localStorage.setItem(AUTH_TOKEN, authToken)
      Axios.prototype.authToken = authToken
      return response.data
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(getRejectValue(error))
      } else {
        throw error;
      }
    }
  }
)

interface AuthState {
  isLogin: boolean
  userInfo: UserResponseData | null,
  error: string | null
}

const initialState = {
  isLogin: false,
  userInfo: null,
  error: null
} as AuthState

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoin.fulfilled, (state, action) => {
      // 성공
        console.log('회원가입 성공!!!', action.payload)
        state.isLogin = true
        alert('회원가입 완료')
      })
      .addCase(fetchJoin.rejected, (state, action) => {
        // 실패
        console.log('회원가입 실패', action.payload)
        alert('회원가입 실패')
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        // console.log('로그인 성공!!!', action.payload)
        state.isLogin = true
        state.userInfo = action.payload.data
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        // 실패
        console.log('로그인 실패', action.payload)
        alert('로그인 실패')
      })
  }
})

export const getIsLogin = (state: RootState) => state.auth.isLogin
export const getUserInfo = (state: RootState) => state.auth.userInfo

export const { SET_IS_LOGIN, SET_USER_INFO } = authSlide.actions

export default authSlide.reducer;