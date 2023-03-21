import { PagingRequestParams, PagesResponseData, CommonResponse } from "@/types/api";
import { BlogPayload, BlogResponse, PutBlogArgs, BlogResponseData } from "@/types/blog";
import Axios from "./Axios";

const $axios = new Axios('blogs')

export const getBlog = (userId: number) => {
  return $axios.get<null, BlogResponse>(`/${userId}`)
    .then(res => res.data.data)
}

export const putBlog = ({ blogId, payload }: PutBlogArgs) => {
  return $axios.put<BlogPayload, BlogResponse>(`/${blogId}`, payload)
    .then(res => res.data.data)
}

export const deleteBlog = (blogId: string) => {
  return $axios.delete<BlogResponse>(`/${blogId}`)
}

type GetBlogRank = CommonResponse<PagesResponseData<BlogResponseData>>

export const getBlogViewCountRank = (params: PagingRequestParams) => {
  console.log('getBlogViewCountRank', params)
  return $axios
    .get<PagingRequestParams, GetBlogRank>(
      `/viewCounts`, params
    ).then(({data}) => data.data)
}

export const getBlogBoardLikeRank = (params: PagingRequestParams) => {
  return $axios
    .get<PagingRequestParams, GetBlogRank>(
      `/boardWishes`, params
    ).then(({data}) => data.data)
}