
import { RankKeyword } from "@/types/keyword";
import Axios from "./Axios";

const $axios = new Axios('keywords')

export const getRankKeywords24Hour = () => {
  return $axios.get<null, RankKeyword[]>('/ranking')
}