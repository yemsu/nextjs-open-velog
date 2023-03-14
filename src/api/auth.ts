import Https from "./Https";
const $axios = new Https('members')

export interface postSignupPayLoad {
  userId: string,
  username: string,
  password: string,
  email: string,
  gender: string,
  birthday: string
}

export interface postLoginPayLoad {
  userId: string,
  password: string
}

export const postSignup = (payload: postSignupPayLoad) => {
  return $axios.post(`/signup`, payload)
}

export const postLogin = (payload: postLoginPayLoad) => {
  return $axios.post(`/login`, payload)
}