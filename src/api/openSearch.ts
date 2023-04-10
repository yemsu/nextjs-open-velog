import {
  BoardResponseData,
  GetBoardSearchParams,
} from "@/types/board";
import Axios from "./Axios";

const $axios = new Axios('opensearch')

export const getBoardSearch = (
  params: GetBoardSearchParams
) => {
  if(!params.keyword) return Promise.reject("getBoardSearch Invalid params")  
  return $axios
    .get<GetBoardSearchParams, BoardResponseData>(`/search`, params)
}