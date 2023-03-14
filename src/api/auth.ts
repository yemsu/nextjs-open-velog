import Axios from "./Axios";
import { SignupPayLoad, SignInPayLoad } from "@/types/auth";
const $axios = new Axios('members')

export const postSignup = (payload: SignupPayLoad) => {
  return $axios.post<SignupPayLoad>(`/signup`, payload)
}

export const postSignIn = (payload: SignInPayLoad) => {
  return $axios.post<SignInPayLoad>(`/login`, payload)
}