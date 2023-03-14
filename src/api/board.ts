import Https from "./Https";
const $axios = new Https('boards')

export interface PostBoardPayLoad {
  blogId: number,
  title: string,
  content: string
}
export interface PutBoardPayload {
  title: string,
  content: string
}
export interface GetBoardSearchResults {
  keyword: string,
  memberId: number
}

export const getBoard = (boardId: string) => {
  return $axios.get(`/${boardId}`)
}

export const postBoard = (payload: PostBoardPayLoad) => {
  return $axios.post(``, payload)
}

export const putBoard = (boardId: string, payload: PutBoardPayload) => {
  return $axios.put(`/${boardId}`, payload)
}

export const deleteBoard = (boardId: string) => {
  return $axios.delete(`/${boardId}`)
}

export const getBoardSearchResults = (params: GetBoardSearchResults) => {
  return $axios.get(``, { params })
}