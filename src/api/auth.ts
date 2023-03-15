import Axios from "./Axios";
import { SignupPayLoad, SignInPayLoad, UserResponse } from "@/types/auth";
const $axios = new Axios('members')

export const postSignup = (payload: SignupPayLoad) => {
  return $axios.post<SignupPayLoad, UserResponse>(`/signup`, payload)
}

export const postSignIn = (payload: SignInPayLoad) => {
  return $axios.post<SignInPayLoad, UserResponse>(`/login`, payload)
}