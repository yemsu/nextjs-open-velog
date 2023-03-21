import Axios from "./Axios";
import { SignupPayLoad, SignInPayLoad, UserResponse } from "@/types/auth";
import { CommonResponse } from "@/types/api";
const $axios = new Axios('members')

export const postSignup = (payload: SignupPayLoad) => {
  return $axios.post<SignupPayLoad, UserResponse>(`/signup`, payload)
}

export const postSignIn = (payload: SignInPayLoad) => {
  return $axios.post<SignInPayLoad, UserResponse>(`/login`, payload)
}

export const getIsDuplicatedId = (params: {userId: string}) => {
  return $axios
    .get<{userId: string}, CommonResponse<boolean>>(
      `/userId/duplicate`, params
    ).then(({ data }) => data.data)
}