export interface UserInfo {
  userId: string,
  username: string,
  email: string,
  gender: string,
  birthday: string
}

export interface SignupPayLoad extends UserInfo {
  password: string,
}

export interface SignInPayLoad {
  userId: string,
  password: string
}

export interface UserResponseData extends UserInfo {
  id: number,
  blogId: number,
  createdAt: string,
  modifiedAt: string
}
export interface UserResponse extends UserInfo {
  data: UserResponseData
}

export interface ValidationsState {
  [key: string]: {
    text: string,
    isValid: boolean
  }
}