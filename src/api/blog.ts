import { BlogPayload, BlogResponse, PutBlogArgs } from "@/types/blog";
import Axios from "./Axios";

const $axios = new Axios('blogs')

// export const postBlog = (payload: BlogPayload) => {
//   return $axios.post<BlogPayload, BlogResponse>(`/signup`, payload)
// }

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