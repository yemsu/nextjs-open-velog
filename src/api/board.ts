import { PostBoardPayload, BoardData } from "@/types/board";
import Axios from "./Axios";

const $axios = new Axios('boards')

export const postBoard = (payload: PostBoardPayload) => {
  return $axios.post<PostBoardPayload, BoardData>(``, payload)
    .then(res => res.data)
}