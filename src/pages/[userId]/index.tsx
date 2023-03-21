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
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import InfiniteScrollContent from "@/components/InfiniteScrollContent"


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
    data: blogBoards,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteScroll<GetBlogBoardsParams, BoardResponseData, any>({
    queryKey: QUERY_KEYS.BLOG_BOARDS,
    promiseFn: getBlogBoards,
    params: {
      userId,
      size: 10,
      page: 1
    }
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
                {
                  <InfiniteScrollContent
                    isDataFetched={!!blogBoards}
                    isFetchingNextPage={isFetchingNextPage}
                    isFetching={isFetching}
                    error={blogBoardsError as Error}
                    fetchNextPage={fetchNextPage}
                  >
                    <BoardList
                      boards={blogBoards?.pages.flatMap(({content}) => content)}
                      boardTitle={`${userInfo?.username}님이 작성한 게시글 리스트`}
                    />
                  </InfiniteScrollContent>
                }
              </MainSection>
        }
      </ContentWrapper>
    </>
  )
}

const MainSection = styled.section`  
`

export default UserBlog