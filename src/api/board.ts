import { BlogPayload, BlogResponse } from "@/types/blog";
import { BoardsByBlogParams, BoardsByBlog } from "@/types/board";
import Axios from "./Axios";

const $axios = new Axios('blogs')

export const getBoardsByBlog = (params: BoardsByBlogParams) => {
  return $axios.get<BoardsByBlogParams, BoardsByBlog>(`/signup`, params)
}