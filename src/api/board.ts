import { PostBoardPayload, BoardData, BoardResponseData, GetBlogBoardsParams } from "@/types/board";
import Axios from "./Axios";

const $axios = new Axios('boards')

export const postBoard = (payload: PostBoardPayload) => {
  return $axios.post<PostBoardPayload, {data: BoardData}>(``, payload)
    .then(res => res.data.data)
}

export const getBlogBoards = (params : GetBlogBoardsParams) => {
  return $axios.get<GetBlogBoardsParams, {data: BoardResponseData}>(`/byBlog/userId`, params)
    .then(res => res.data.data)
}