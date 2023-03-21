import { getBoard } from "@/api/board"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import GetDataContent from "@/components/GetDataContent"
import MetaDataList from "@/components/MetaDataList"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useCommonQuery from "@/hooks/useCommonQuery"
import { BoardData } from "@/types/board"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styled from "styled-components"

function BoardView() {
  const route = useRouter()
  const boardId = route.query.boardId as string
  const queryClient = useQueryClient()
  const {
    error: boardDataError,
    data: boardData,
    isLoading
  } = useCommonQuery<string, BoardData>({
    queryKey: QUERY_KEYS.BOARD_VIEW,
    promiseFn: getBoard, 
    params: boardId, 
    enabledChecker: !!boardId,
  })

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.BOARD_VIEW]
    })
  }, [boardId])

  return (
    <ContentWrapper size="narrow" contentType="main">
      <GetDataContent
        isDataFetched={!!boardData}
        isLoading={isLoading}
        error={boardDataError as Error}
      >
        {
          boardData
            ? <>
                <h2>{boardData.title}</h2>
                <MetaDataList
                  viewCount={boardData.viewCount}
                  wishCount={boardData.wishCount}
                  createdAt={boardData.createdAt}
                />
                <p>{boardData.content}</p>
              </>
            : null
        }
      </GetDataContent>
    </ContentWrapper>
  )
}

export default BoardView