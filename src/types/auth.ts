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

export interface UserResponse extends UserInfo {
  id: number,
  createdAt: string,
  modifiedAt: string
}