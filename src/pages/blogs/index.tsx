import Head from "next/head"
import { getBlogViewCountRank, getBlogBoardLikeRank } from "@/api/blog"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import Tabs from "@/components/elements/Tabs"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { PagingRequestParams, PagesResponseData } from "@/types/api"
import { BlogResponseData } from "@/types/blog"
import InfiniteScrollContent from "@/components/InfiniteScrollContent"
import BlogProfileList from "@/components/blog/BlogProfileList"
import { DESCRIPTION, TITLE } from "@/constants/meta"
import { useRouter } from "next/router"
import { PAGES } from "@/constants/path"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

function Blogs() {
  const route = useRouter()
  if(!route.query) return null
  // const [sortBy, setSortBy] = useState(route.query?.sort)
  const sortBy = route.query?.sort
  const isSortByView = sortBy === 'views'
  const isSortByLike = sortBy === 'likes'
  const promiseFn = isSortByView
    ? getBlogViewCountRank
    : getBlogBoardLikeRank
  const queryKey = isSortByView
    ? QUERY_KEYS.BLOGS_VIEW_COUNT
    : QUERY_KEYS.BLOGS_LIKE_COUNT

  const {
    error: blogsError,
    data: blogs,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteScroll<PagingRequestParams, PagesResponseData<BlogResponseData>, any> ({
    queryKey,
    promiseFn,
    params: {
      size: 10,
      page: 1,
    }
  })

  const queryClient = useQueryClient()
  useEffect(() => {
    console.log('useEffect', sortBy)
    queryClient.refetchQueries([QUERY_KEYS.USER_BLOG])
  }, [sortBy])

  const tabsInfo = [
    {
      text: '조회수 높은순',
      href: PAGES.BLOG_VIEW_COUNT,
      isActive: isSortByView
    },
    {
      text: '좋아요 많은순',
      href: PAGES.BLOG_LIKE_COUNT,
      isActive: isSortByLike
    },
  ]
  
  return (
    <>
      <Head>
        <title>{TITLE.BLOG_VIEW_COUNT}</title>
        <meta name="description" content={DESCRIPTION.BLOG_VIEW_COUNT} />
      </Head>
      <ContentWrapper
        size="narrow"
        contentType="main"
      >
        <Tabs
          tabs={tabsInfo}
          align="center"
          size="small"
        />
        <InfiniteScrollContent
          isDataFetched={!!blogs}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
          error={blogsError as Error}
          fetchNextPage={fetchNextPage}
        >
          <BlogProfileList
            blogs={blogs?.pages.flatMap(({content}) => content)}
          />
        </InfiniteScrollContent>
      </ContentWrapper>
    </>
  )
}

export default Blogs