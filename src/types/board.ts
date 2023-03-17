import { CommonResponse } from "./api"

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

export interface BoardContent {
  id: number
  title: string
  content: string
  wishCount: number
  isLike: boolean
  viewCount: number
  createdAt: string
  modifiedAt: string
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
  content: BoardContent[]
  numberOfElements: 0
  pageable: Pageable
  first: boolean,
  last: boolean,
  empty: boolean
}


export type BoardsByBlog = CommonResponse<BoardsByBlogData>