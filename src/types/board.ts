import { PagingRequestParams } from "./api"

export interface BoardPayload {
  title: string
  content: string
}

export interface PutBoardArgs {
  boardId: number
  payload: BoardPayload
}

export interface PostBoardPayload extends BoardPayload {
  blogId: number
}

export interface BoardData {
  id: number
  title: string
  content: string
  isLike: boolean
  wishCount: number
  viewCount: number
  createdAt: string
  modifiedAt: string
}

export interface GetBlogBoardsParams extends PagingRequestParams {
  userId: number
}

export interface GetBoardSearchParams extends PagingRequestParams {
  keyword: string
}

export interface BoardResponseData {
  content: BoardData[]
  totalPages: number
  pageNumber: number
  totalElements: number
  last: true
}