import { getBlog } from "@/api/blog"
import { ErrorResponse } from "@/types/api"
import { BlogResponse, BlogResponseData } from "@/types/blog"
import { getRejectValue } from "@/utils/store"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RootState } from "."

const name = 'blog'

export const fetchUserBlog = createAsyncThunk<BlogResponse, string, {rejectValue: ErrorResponse}>(
  `${name}/fetchUserBlog`,
  async (userId: string, thunkAPI) => {
    try {
      const response = await getBlog(userId)
      return response.data
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        return thunkAPI.rejectWithValue(getRejectValue(error))
      } else {
        throw error
      }
    }
  }
)

interface BlogState {
  userBlog: BlogResponseData | null
}

const initialState = {
  userBlog: null
} as BlogState

const blogSlice = createSlice({
  name,
  initialState,
  reducers: {
    SET_USER_BLOG(state, action: PayloadAction<BlogResponseData | null>) {
      state.userBlog = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBlog.fulfilled, (state, action) => {
        state.userBlog = action.payload.data
        console.log('action.payload', state.userBlog)
      })
      .addCase(fetchUserBlog.rejected, (state, action) => {
        console.log('user blog 가져오기 실패', action.payload)
      })
  }
})

export const getUserBlog = (state: RootState) => state.blog.userBlog

export const { SET_USER_BLOG } = blogSlice.actions

export default blogSlice.reducer