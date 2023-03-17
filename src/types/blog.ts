import { CommonResponse } from "./api"

export interface BlogPayload {
  title: string,
  introduce: string
}

export interface BlogResponseData {
  id: number,
  introduce: string,
  memberUserId: string,
  wishCountSum: number,
  viewCountSum: number,
  createdAt: string,
  modifiedAt: string
}

export type BlogResponse = CommonResponse<BlogResponseData>