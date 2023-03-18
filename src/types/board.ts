import { CommonResponse } from "./api"

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

export interface BoardsByBlogParams {
  blogId: number
  page: number
  size: number
}

export interface Sort {
  empty: Boolean
  unsorted: Boolean
  sorted: Boolean
}

export interface Pageable {
  sort: Sort
  offset: number,
  pageSize: number,
  paged: boolean,
  pageNumber: number,
  unpaged: boolean
}

export interface BoardsByBlogData {
  totalPages: number
  totalElements: number
  number: number
  sort: Sort
  size: number
  content: BoardData[]
  numberOfElements: 0
  pageable: Pageable
  first: boolean,
  last: boolean,
  empty: boolean
}


export type BoardsByBlog = CommonResponse<BoardsByBlogData>