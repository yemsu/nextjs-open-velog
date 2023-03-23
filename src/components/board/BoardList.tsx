import styled from "styled-components"
import MetaDataList from "@/components/MetaDataList"
import { BoardData } from "@/types/board"
import Link from "next/link"
import { PAGES } from "@/constants/path"
import IrText from "../elements/IrText"
import Button from "../elements/Button"
import Buttons from "../elements/Buttons"
import { useCallback } from "react"
import { deleteBoard } from "@/api/board"
import { ALERTS } from "@/constants/alerts"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useCommonMutation from "@/hooks/useCommonMutation"
interface ListItemProps {
  boards: BoardData[] | void,
  boardTitle?: string,
  totalLength?: number,
  isMine?: boolean
}


function BoardList(props: ListItemProps) {
  const {
    boards,
    boardTitle,
    totalLength,
    isMine
  } = props

  const {
    mutate: onDeleteBoard
  } = useCommonMutation
  <BoardData, number, any>(
    deleteBoard, {
    onSuccess: () => {
      alert(ALERTS.DELETE_BOARD.SUCCESS)
      queryClient.invalidateQueries({ 
        queryKey: [QUERY_KEYS.USER_BLOG]
      })
    },
    onError: () => {
      alert(ALERTS.DELETE_BOARD.ERROR)
    },
  })

  const queryClient = useQueryClient()
  const onClickDelete = useCallback((boardId: number) => {
    const confirmDelete = confirm(ALERTS.DELETE_BOARD.CONFIRM) 
    if(!confirmDelete) return
    onDeleteBoard(boardId)
    queryClient.invalidateQueries([QUERY_KEYS.BLOG_BOARDS])
  }, [onDeleteBoard, queryClient])

  if(!boards) return null
  
  return (
    <section>
      {boardTitle && <IrText text={boardTitle} />}
      {
        totalLength && 
          <TextReferWrapper>
            <TextRefer>{totalLength || boards.length}개</TextRefer>
          </TextReferWrapper>
      }
      <List>
        {boards.map(({
          id,
          title,
          content,
          viewCount,
          wishCount,
          createdAt
        }) => (
          <ListItem key={id}>
            <Link href={PAGES.BOARD(id)}>
              <BoardTitle>{title}</BoardTitle>
              <BoardContents>{content}</BoardContents>
              <MetaDataList
                dataObj={{
                  viewCount,
                  wishCount,
                  createdAt
                }}
              />
            </Link>
            {
              isMine
                ? <>
                    <ButtonsStyled>
                      <Button
                        styleType="round"
                        buttonText="수정"
                        buttonTitle="게시글 수정하기"
                        bgColor="border-gray"
                        size="x-small"
                      />
                      <Button
                        styleType="round"
                        buttonText="삭제"
                        buttonTitle="게시글 삭제하기"
                        bgColor="border-gray"
                        size="x-small"
                        onClick={() => onClickDelete(id)}
                      />
                    </ButtonsStyled>
                  </>
                : null
              }
          </ListItem>
        ))}
      </List>
    </section>
  )
}


const TextReferWrapper = styled.div`
  margin-bottom: 10px;
`

const TextRefer = styled.p`
  font-size: var(--font-size-S);
  color: var(--font-gray);
  text-align: right;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
`

const ListItem = styled.li`
  position: relative;
  padding: 30px 0 40px;
  border-top: 1px solid var(--border-light);
`

const BoardTitle = styled.h3`
  font-size: var(--font-size-title-M);
`

const BoardContents = styled.p`
  overflow: hidden;
  display: -webkit-box;
  margin-top: 6px;
  font-size: var(--font-size-M);
  color: var(--font-dark-gray);
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`

const ButtonsStyled = styled(Buttons)`
  position: absolute;
  right: 40px;
  bottom: 30px;
`

export default BoardList