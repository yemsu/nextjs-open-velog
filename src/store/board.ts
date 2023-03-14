import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { postBlog, PostBlogPayLoad } from '@/api/blog'

interface Post {
  id: string,
  title: string,
  regDt: string,
  description: string
}

interface BoardsState {
  boards: Post[]
}

const initialState = {
  boards: []
} as BoardsState

export const fetchPostBlog = createAsyncThunk(
  'users/fetchByIdStatus',
  async (payload: PostBlogPayLoad, thunkAPI) => {
    try {
      const response = await postBlog(payload)
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  }
)

const boardsSlide = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    SET_POST(state, action: PayloadAction<Post[]>) {
      state.boards = action.payload
    },
    ADD_POST(state, action: PayloadAction<Post>) {
      state.boards = state.boards.concat([action.payload])
    },
    DELETE_POST(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter(({id}: {id: string}) => id !== action.payload)
    },
  },
  extraReducers: {
    [fetchPostBlog.pending.type]: (state, action) => {
      // 호출 전
      console.log('호출 전')
    },
    [fetchPostBlog.fulfilled.type]: (state, action) => {
      // 성공
      console.log('성공!!!', action.payload)
      state.boards = action.payload;
    },
    [fetchPostBlog.rejected.type]: (
      state,
      action: PayloadAction<{ message: string; status: number }>
    ) => {
      // 실패
      console.log('실패', action.payload.message)
    }
  }
})

export const { SET_POST, ADD_POST, DELETE_POST } = boardsSlide.actions
export default boardsSlide.reducer;