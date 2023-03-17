import { BlogPayload, BlogResponse } from "@/types/blog";
import Axios from "./Axios";

const $axios = new Axios('blogs')

// export const postBlog = (payload: BlogPayload) => {
//   return $axios.post<BlogPayload, BlogResponse>(`/signup`, payload)
// }

export const getBlog = (userId: string) => {
  return $axios.get<null, BlogResponse>(`/${userId}`)
    .then(res => res.data.data)
}

export const putBlog = ({ blogId, payload }: {blogId: string, payload: BlogPayload}) => {
  console.log('putBlog', blogId, payload)
  return $axios.put<BlogPayload, BlogResponse>(`/${blogId}`, payload)
    .then(res => res.data.data)
}

export const deleteBlog = (blogId: string) => {
  return $axios.delete<BlogResponse>(`/${blogId}`)
}