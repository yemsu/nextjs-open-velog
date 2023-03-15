import Axios from "./Axios";
const $axios = new Axios('blogs')

export interface BlogPayload {
  title: string,
  introduce: string
}
export interface BlogResponse {
  id: number,
  title: string,
  introduce: string,
  member: string,
  boards: string,
  createdAt: string,
  modifiedAt: string
}

export const postBlog = (payload: BlogPayload) => {
  return $axios.post<BlogPayload, BlogResponse>(`/signup`, payload)
}

export const getBlog = (blogId: string) => {
  return $axios.get<null, BlogResponse>(`/${blogId}`)
}

export const putBlog = (blogId: string, payload: BlogPayload) => {
  return $axios.put<BlogPayload, BlogResponse>(`/${blogId}`, payload)
}

export const deleteBlog = (blogId: string) => {
  return $axios.delete<BlogResponse>(`/${blogId}`)
}