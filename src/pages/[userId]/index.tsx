import BoardList from "@/components/board/BoardList"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import BlogProfile from "@/components/blog/BlogProfile"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { getUserInfo } from "@/store/auth"
import { getBlog } from "@/api/blog"
import useCommonQuery from "@/hooks/useCommonQuery"
import { BlogResponseData } from "@/types/blog"
import { QUERY_KEYS } from "@/constants/queryKeys"
import { ALERTS } from "@/constants/alerts"
import { BoardResponseData, GetBlogBoardsParams } from "@/types/board"
import { getBlogBoards } from "@/api/board"
import Head from "next/head"
import { getMetaTitle } from "@/utils"
import { DESCRIPTION, TITLE } from "@/constants/meta"


function UserBlog() {
  const userInfo = useSelector(getUserInfo)
  const router = useRouter()
  const userId = router.query.userId as any as number
  const {
    error: userBlogError,
    data: userBlog
  } = useCommonQuery<number, BlogResponseData>({
    queryKey: QUERY_KEYS.USER_BLOG,
    promiseFn: getBlog, 
    params: userId, 
    enabledChecker: !!userId
  })

  const {
    error: blogBoardsError,
    data: blogBoards
  } = useCommonQuery<GetBlogBoardsParams, BoardResponseData>({
    queryKey: QUERY_KEYS.BLOG_BOARDS,
    promiseFn: getBlogBoards, 
    params: {
      userId,
      page: 1,
      size: 10
    }, 
    enabledChecker: !!userId
  })

  if(!userBlog) return null

  return (
    <>
      <Head>
        <title>{getMetaTitle(TITLE.BLOG(userId))}</title>
        <meta name="description" content={DESCRIPTION.BLOG(userId)} />
      </Head>
      <ContentWrapper size="narrow" contentType="main">
        {
          userBlogError
            ? <p>{ALERTS.GET_BLOG.ERROR}</p>
            : <MainSection>
                <BlogProfile
                  isMine={userInfo?.userId === userBlog.memberUserId}
                  profilePosition="top"
                  blog={userBlog}
                />
                <BoardList
                  boards={blogBoards}
                />
              </MainSection>
        }
      </ContentWrapper>
    </>
  )
}

const MainSection = styled.section`  
`

export default UserBlog