import { CommonResponse } from "@/types/api";
import { RankKeyword } from "@/types/keyword";
import Axios from "./Axios";

const $axios = new Axios('keywords')

export const getRankKeywords24Hour = () => {
  return $axios.get<null, CommonResponse<RankKeyword[]>>('/ranking')
    .then(res => {
      console.log("res", res)
      return res.data.data
    })
}