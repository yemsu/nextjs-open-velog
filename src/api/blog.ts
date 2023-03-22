import { PagingRequestParams, PagesResponseData } from "@/types/api";
import {
  BlogPayload,
  PutBlogArgs,
  BlogResponseData
} from "@/types/blog";
import Axios from "./Axios";

const $axios = new Axios('blogs')

export const getBlog = (userId: number) => {
  return $axios.get<null, BlogResponseData>(`/${userId}`)
}

export const putBlog = ({ blogId, payload }: PutBlogArgs) => {
  return $axios.put<BlogPayload, BlogResponseData>(`/${blogId}`, payload)
}

export const deleteBlog = (blogId: string) => {
  return $axios.delete<BlogResponseData>(`/${blogId}`)
}

export const getBlogViewCountRank = (params: PagingRequestParams) => {
  console.log('getBlogViewCountRank', params)
  return $axios
    .get<PagingRequestParams, PagesResponseData<BlogResponseData>>(
      `/viewCounts`, params
    )
}

export const getBlogBoardLikeRank = (params: PagingRequestParams) => {
  return $axios
    .get<PagingRequestParams, PagesResponseData<BlogResponseData>>(
      `/boardWishes`, params
    )
}