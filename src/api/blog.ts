import { CommonPagingRequestParams, CommonPagingResponseData } from "@/types/api";
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

export const getBlogViewCounts = (params: CommonPagingRequestParams) => {
  return $axios
    .get<CommonPagingRequestParams, CommonPagingResponseData<BlogResponseData>>(
      `/viewCounts`, params
    ).then(res => res.data)
}