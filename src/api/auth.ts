import Axios from "./Axios";
import { SignupPayLoad, SignInPayLoad, UserResponse } from "@/types/auth";

const $axios = new Axios('members')

export const postSignup = (payload: SignupPayLoad) => {
  return $axios.postFullRes<SignupPayLoad, UserResponse>(`/signup`, payload)
}

export const postSignIn = (payload: SignInPayLoad) => {
  return $axios.postFullRes<SignInPayLoad, UserResponse>(`/login`, payload)
}

export const getIsDuplicatedId = (params: {userId: string}) => {
  return $axios
    .get<{userId: string}, boolean>(
      `/userId/duplicate`, params
    )
}