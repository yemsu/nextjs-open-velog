import { getBoardsByBlog } from "@/api/board"
import { ErrorResponse } from "@/types/api"
import { BoardsByBlogParams, BoardsByBlog, BoardsByBlogData } from "@/types/board"
import { getRejectValue } from "@/utils/store"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RootState } from "."

const name = 'board'

export const fetchBoardsByBlog = createAsyncThunk<BoardsByBlog, BoardsByBlogParams, {rejectValue: ErrorResponse}>(
  `${name}/fetchBoardsByBlog`,
  async (params: BoardsByBlogParams, thunkAPI) => {
    try {
      const response = await getBoardsByBlog(params)
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

interface BoardState {
  boardsByBlog: BoardsByBlogData | null | []
}

const initialState = {
  boardsByBlog: null
} as BoardState

const boardSlice = createSlice({
  name,
  initialState,
  reducers: {
    SET_BOARDS_BY_BLOG(state, action: PayloadAction<BoardsByBlogData | null>) {
      state.boardsByBlog = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardsByBlog.fulfilled, (state, action) => {
        state.boardsByBlog = action.payload.data
        console.log('action.payload', state.boardsByBlog)
      })
      .addCase(fetchBoardsByBlog.rejected, (state, action) => {
        const { message } = action.payload as ErrorResponse
        console.error('fetchBoardsByBlog Error: ', message)
        switch(message) {
          case '블로그가 없습니다.':
            state.boardsByBlog = []
            break
        }
      })
  }
})

export const getBlogBoards = (state: RootState) => state.board.boardsByBlog

export const { SET_BOARDS_BY_BLOG } = boardSlice.actions

export default boardSlice.reducer