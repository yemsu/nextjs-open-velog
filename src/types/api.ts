export interface ErrorResponse {
  message: string,
  code: string,
  status: number
}

interface Sort {
  empty: Boolean
  unsorted: Boolean
  sorted: Boolean
}

interface Pageable {
  sort: Sort
  offset: number,
  pageSize: number,
  paged: boolean,
  pageNumber: number,
  unpaged: boolean
}

export interface PagesResponseData<Content> {
  totalPages: number
  totalElements: number
  number: number
  sort: Sort
  size: number
  content: Content
  numberOfElements: 0
  pageable: Pageable
  first: boolean,
  last: boolean,
  empty: boolean
}

export interface PagingRequestParams {
  page: number
  size: number
}