import { CommonResponse } from "@/types/api";
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
): Promise<BoardData> => {
  return $axios
    .post<PostBoardPayload, CommonResponse<BoardData>>(
      ``, payload
    ).then(res => res.data.data)
}

export const getBlogBoards = (
  params : GetBlogBoardsParams
): Promise<BoardResponseData> => {
  if(!params.userId) return Promise.reject("getBlogBoards Invalid params")
  return $axios
    .get<GetBlogBoardsParams, CommonResponse<BoardResponseData>>(
      `/byBlog/userId`, params
    ).then(({ data }) => data.data)
}

export const getBoardSearch = (
  params: GetBoardSearchParams
): Promise<BoardResponseData> => {
  if(!params.keyword) return Promise.reject("getBoardSearch Invalid params")
  
  return $axios
    .get<GetBoardSearchParams, CommonResponse<BoardResponseData>>(
      `/search`, params
    ).then(({ data }) => data.data)
}

export const getBoard = (
  boardId: string
): Promise<BoardData> => {
  console.log('getBoard', boardId)
  if(!boardId) return Promise.reject("getBoard Invalid boardId")

  return $axios
    .get<null, CommonResponse<BoardData>>(
      `/${boardId}`,
    ).then(({ data }) => {
      console.log('data', data)
      return data.data
    })
}