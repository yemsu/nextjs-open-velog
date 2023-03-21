import ContentWrapper from "@/components/layouts/ContentWrapper"
import Input from "@/components/elements/Input"
import Button from "@/components/elements/Button"
import useInputs from "@/hooks/useInputs"
import styled from "styled-components"
import useCommonMutation from "@/hooks/useCommonMutation"
import { BoardData, PostBoardPayload } from "@/types/board"
import { postBoard } from "@/api/board"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { getUserInfo } from "@/store/auth"
import checkValidations from "@/utils/validation"
import { ALERTS } from "@/constants/alerts"
import Head from "next/head"
import { DESCRIPTION, TITLE } from "@/constants/meta"
import { getMetaTitle } from "@/utils"
import { useRouter } from "next/router"
import { PAGES } from "@/constants/path"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/queryKeys"

function Write() {
  const route = useRouter()
  const userInfo = useSelector(getUserInfo)
  const queryClient = useQueryClient()
  const {
    mutate: registerBoard,
    error
  } = useCommonMutation<BoardData, PostBoardPayload, any>(
    postBoard, {
    onSuccess: () => {
      alert(ALERTS.POST_BOARD_SUCCESS)
      reset()
      if(userInfo) {
        route.push(PAGES.USER_BLOG(userInfo.userId))
      }
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.BLOG_BOARDS]})
    },
    onError: () => {
      alert(ALERTS.POST_BOARD_ERROR)
      console.log("글 등록 에러!", error);
    }
  })

  const [forms, onChange, reset] = useInputs({
    boardTitle: '',
    boardContent: '',
  })

  const onClickSave = useCallback(() => {
    if(!userInfo) {
      console.error('onClickSave Error: No userInfo')
      return
    }

    const { boardTitle, boardContent } = forms
    const hasInvalidData = checkValidations({
      title: !!boardTitle,
      content: !!boardContent
    })
    if(hasInvalidData) return

    registerBoard({
      blogId: userInfo.blogId,
      title: boardTitle,
      content: boardContent
    })    
  }, [forms, userInfo])

  return (
    <>
      <Head>
        <title>{getMetaTitle(TITLE.WRITE)}</title>
        <meta name="description" content={DESCRIPTION.WRITE} />
      </Head>
      <ContentWrapper
        size="narrow"
        contentType="main"
        title={TITLE.WRITE}
      >
        <Input
          type="text"
          name="boardTitle"
          value={forms.boardTitle}
          placeholder="입력 하세요. 제목."
          size="big"
          onChange={onChange}
        />
        <TextareaWrapper>
          <Input
            type="textarea"
            name="boardContent"
            value={forms.boardContent}
            placeholder="입력 하세요. 내용."
            size="big"
            onChange={onChange}
          />
        </TextareaWrapper>
        <BottomFixBar>
          <Button
            styleType="square-round"
            buttonText="다썼다. 📝"
            bgColor="primary"
            size="large"
            onClick={onClickSave}
          />
        </BottomFixBar>
      </ContentWrapper>
    </>
  )
}

const TextareaWrapper = styled.div`
  height: calc(100vh - (60px * 2) - 53px - 55px);
  padding: 30px 0;
  * {
    height: 100%;
  }
`

const BottomFixBar = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 0 15px;
  background: linear-gradient(to bottom, transparent, var(--bg-gray));
`

export default Write