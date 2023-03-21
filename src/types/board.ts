import { PagingRequestParams, PagesResponseData } from "./api"

export interface PostBoardPayload {
  blogId: number
  title: string
  content: string
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