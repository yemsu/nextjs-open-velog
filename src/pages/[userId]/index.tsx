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
import { META } from "@/constants/meta"
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
  
  const isMyBlog = userInfo?.userId === userBlog.memberUserId

  return (
    <>
      <Head>
        <title>{getMetaTitle(META.BLOG.TITLE(userId))}</title>
        <meta name="description" content={META.BLOG.DESC(userId)} />
      </Head>
      <ContentWrapper size="narrow" contentType="main">
        {
          userBlogError
            ? <p>{ALERTS.GET_BLOG.ERROR}</p>
            : <MainSection>
                <BlogProfile
                  isMine={isMyBlog}
                  profilePosition="top"
                  blog={userBlog}
                />
                {
                  <InfiniteScrollContent
                    isDataFetched={!!blogBoards}
                    hasNodata={blogBoards?.pages[0]?.content.length === 0}
                    hasNodataMessage="게시글이 없습니다."
                    isFetchingNextPage={isFetchingNextPage}
                    isFetching={isFetching}
                    error={blogBoardsError as Error}
                    fetchNextPage={fetchNextPage}
                  >
                    <BoardList
                      boards={blogBoards?.pages.flatMap(({content}) => content)}
                      boardTitle={`${userInfo?.username}님이 작성한 게시글 리스트`}
                      isMine={isMyBlog}
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