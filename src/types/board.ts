import { CommonPagingRequestParams, CommonPagingResponseData } from "./api"

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

export interface GetBlogBoardsParams extends CommonPagingRequestParams {
  userId: number
}

export interface GetBoardSearchParams extends CommonPagingRequestParams {
  keyword: string
}

export type BoardResponseData = CommonPagingResponseData<BoardData[]>