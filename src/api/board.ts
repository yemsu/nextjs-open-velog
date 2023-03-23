import {
  PostBoardPayload,
  BoardData,
  BoardResponseData,
  GetBlogBoardsParams,
  GetBoardSearchParams
} from "@/types/board";
import Axios from "./Axios";

const $axios = new Axios('boards')

export const postBoard = (
  payload: PostBoardPayload
) => {
  return $axios.post<PostBoardPayload, BoardData>(``, payload)
}

export const getBlogBoards = (
  params : GetBlogBoardsParams
) => {
  if(!params.userId) return Promise.reject("getBlogBoards Invalid params")
  return $axios
    .get<GetBlogBoardsParams, BoardResponseData>(`/byBlog/userId`, params)
}

export const getBoardSearch = (
  params: GetBoardSearchParams
) => {
  if(!params.keyword) return Promise.reject("getBoardSearch Invalid params")  
  return $axios
    .get<GetBoardSearchParams, BoardResponseData>(`/search`, params)
}

export const getBoard = (
  boardId: string
) => {
  if(!boardId) return Promise.reject("getBoard Invalid boardId")
  return $axios
    .get<null, BoardData>(`/${boardId}`)
}

export const deleteBoard = (
  boardId: number
) => {
  return $axios
    .delete<BoardData>(`/${boardId}`)
}