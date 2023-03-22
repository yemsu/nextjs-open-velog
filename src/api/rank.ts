import { KeywordTrendParams, RankKeyword } from "@/types/keyword";
import Axios from "./Axios";

const $axios = new Axios('rank')

export const getKeywordTrend = (params: KeywordTrendParams) => {
  return $axios.get<KeywordTrendParams, RankKeyword[]>(`/keyword`, params)
}