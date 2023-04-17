import { getBoard, postWish } from "@/api/board"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import StatusHandleContent from "@/components/StatusHandleContent"
import MetaDataList from "@/components/MetaDataList"
import EmojiButton from "@/components/elements/EmojiButton"
import FloatingArea from "@/components/elements/FloatingArea"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useCommonQuery from "@/hooks/useCommonQuery"
import { BoardData } from "@/types/board"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styled from "styled-components"
import useCommonMutation from "@/hooks/useCommonMutation"
import { ALERTS } from "@/constants/alerts"

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

  const {
    mutate: toggleBoardLike
  } = useCommonMutation<boolean, number, any>(
    postWish, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BOARD_VIEW]
        })
      },
      onError: () => {
        alert(ALERTS.LIKE_BOARD.ERROR)
      }
    }
  )

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.BOARD_VIEW]
    })
  }, [boardId, queryClient])

  return (
    <>
      <ContentWrapper size="narrow" contentType="main">
        <StatusHandleContent
          isDataFetched={!!boardData}
          isLoading={isLoading}
          error={boardDataError as Error}
        >
          {
            boardData
              ? <>
                  <BoardTitle>{boardData.title}</BoardTitle>
                  <MetaDataList
                    dataObj={{
                      viewCount: boardData.viewCount,
                      wishCount: boardData.wishCount,
                      createdAt: boardData.createdAt
                    }}
                    align="center"
                  />
                  <BoardContent>{boardData.content}</BoardContent>
                </>
              : null
          }
        </StatusHandleContent>
      </ContentWrapper>
      {
        boardData &&
          <FloatingArea>
            <EmojiButton
              emojiType={boardData.isLike ? 'unlike' : 'like'}
              size="large"
              styleType="round"
              onClick={() => toggleBoardLike(boardData.id)}
            />
            <FloatingWishCount>{boardData.wishCount}</FloatingWishCount>
          </FloatingArea>
      }
    </>
  )
}

const BoardTitle = styled.h2`
  padding: 10px 0;
  text-align: center;
  font-size: var(--font-size-title-B);
  word-break: keep-all;
`

const BoardContent = styled.p`
  margin-top: 30px;
  line-height: 1.8;
  font-size: var(--font-size-M);
`

const FloatingWishCount = styled.p`
  font-size: var(--font-size-S);
  color: var(--font-gray);
  text-align: center;
`

export default BoardView