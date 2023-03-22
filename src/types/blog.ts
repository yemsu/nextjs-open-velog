export interface BlogPayload {
  introduce: string
}

export interface PutBlogArgs {
  blogId: number
  payload: BlogPayload
}

export interface BlogResponseData {
  id: number,
  introduce: string,
  memberUserId: string,
  memberUsername: string,
  wishCountSum: number,
  viewCountSum: number,
  createdAt: string,
  modifiedAt: string
}
