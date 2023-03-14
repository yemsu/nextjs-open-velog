import Https from "./Https";
const $axios = new Https('blogs')

export interface PostBlogPayLoad {
  title: string,
  introduce: string
}
export interface PutBlogPayload {
  title: string,
  introduce: string
}

export const getBlog = (blogId: string) => {
  return $axios.get(`/${blogId}`)
}

export const postBlog = (payload: PostBlogPayLoad) => {
  return $axios.post(``, payload)
}

export const putBlog = (blogId: string, payload: PutBlogPayload) => {
  return $axios.put(`/${blogId}`, payload)
}

export const deleteBlog = (blogId: string) => {
  return $axios.delete(`/${blogId}`)
}