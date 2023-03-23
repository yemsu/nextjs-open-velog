import useInputs from "@/hooks/useInputs"
import useCommonMutation from "@/hooks/useCommonMutation"
import { BoardData, PostBoardPayload, PutBoardArgs } from "@/types/board"
import { postBoard, putBoard } from "@/api/board"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getUserInfo } from "@/store/auth"
import checkValidations from "@/utils/validation"
import { ALERTS } from "@/constants/alerts"
import Head from "next/head"
import { META } from "@/constants/meta"
import { getMetaTitle } from "@/utils"
import { useRouter } from "next/router"
import { PAGES } from "@/constants/path"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/queryKeys"
import LoadingIndicator from "@/components/elements/LoadingIndicator"
import WriteBoard from "@/components/board/WriteBoard"
import { STORAGE_NAME } from "@/constants/etc"

function Write() {
  const route = useRouter()
  const isEdit = route.query.type === 'edit'
  const constantsType = `${isEdit ? 'PUT' : 'POST'}_BOARD`
  const userInfo = useSelector(getUserInfo)
  const promiseFn = isEdit ? putBoard : postBoard
  const queryClient = useQueryClient()
  const [savedBoardId, setSavedBoardId] = useState()
  const [forms, onChange, reset, setForms] = useInputs({
    boardTitle: '',
    boardContent: '',
  })
  const {
    mutate: registerBoard,
    isLoading,
  } = useCommonMutation<BoardData, any, any>(
    promiseFn, {
    onSuccess: () => {
      alert(ALERTS[constantsType].SUCCESS)
      reset()
      if(userInfo) {
        route.push(PAGES.USER_BLOG(userInfo.userId))
      }
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.BLOG_BOARDS]})
      savedBoardId && localStorage.removeItem(STORAGE_NAME.BOARD_EDIT)
      setSavedBoardId(undefined)
    },
    onError: () => {
      alert(ALERTS.POST_BOARD.ERROR)
    }
  })

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_NAME.BOARD_EDIT)
    if(!savedData || !isEdit) return
    const { title, content, boardId } = JSON.parse(savedData)
    setForms({
      boardTitle: title,
      boardContent: content,
    })
    setSavedBoardId(boardId)
  }, [setForms, setSavedBoardId])

  useEffect(() => {
    if(isEdit && !userInfo) {
      alert(ALERTS.PUT_BOARD.BLOCK)
      route.push(PAGES.MAIN)
    }
  }, [route.query.type, userInfo])

  const onClickSave = useCallback(() => {
    if(!userInfo || (isEdit && !savedBoardId)) {
      console.error('onClickSave Error: No userInfo')
      return
    }

    const { boardTitle, boardContent } = forms
    const hasInvalidData = checkValidations({
      title: !!boardTitle,
      content: !!boardContent
    })
    if(hasInvalidData) return
    
    const args: PostBoardPayload | PutBoardArgs = (isEdit && savedBoardId)
      ? {
          boardId: savedBoardId,
          payload: {
            title: boardTitle,
            content: boardContent
          }
        }
      : {
          blogId: userInfo.blogId,
          title: boardTitle,
          content: boardContent
        }
    registerBoard(args)    
  }, [forms, userInfo, registerBoard, savedBoardId])

  return (
    <>
      <Head>
        <title>{getMetaTitle(META.WRITE.TITLE)}</title>
        <meta name="description" content={META.WRITE.DESC} />
      </Head>
      <WriteBoard
        boardTitle={forms.boardTitle}
        boardContent={forms.boardContent}
        onChange={onChange}
        isEdit={isEdit}
        onClickSave={onClickSave}
      />
      {isLoading && <LoadingIndicator size="full" />}
    </>
  )
}



export default Write