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
import { useInView } from "react-intersection-observer"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { useEffect } from "react"


function UserBlog() {
  const { ref, inView } = useInView()
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
  
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [userId, inView])
  
  const {
    error: blogBoardsError,
    data: blogBoards,
    fetchNextPage,
    hasNextPage,
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
                  blogBoards
                    ? <>
                        <BoardList
                          boards={blogBoards?.pages?.flatMap(({content}) => content)}
                          boardTitle={`${userInfo?.username}님이 등록한 게시글`}
                          totalLength={blogBoards?.pages[0].totalElements}
                        />
                        <p ref={ref}>
                          {
                            isFetchingNextPage
                              ? 'Loading more...'
                              : hasNextPage
                                ? 'Load Newer'
                                : 'Nothing more to load'
                          }
                        </p>
                      </>
                    : null
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