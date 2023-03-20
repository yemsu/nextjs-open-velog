// 프론트에서 사용하는 에러 정보
export interface CommonResponse<DataType> {
  message: string,
  code: number,
  data: DataType
}
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

export interface CommonPagingResponseData<Content> {
  totalPages: number
  totalElements: number
  number: number
  sort: Sort
  size: number
  content: Content[]
  numberOfElements: 0
  pageable: Pageable
  first: boolean,
  last: boolean,
  empty: boolean
}

export interface CommonPagingRequestParams {
  page: number
  size: number
}