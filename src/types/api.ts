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