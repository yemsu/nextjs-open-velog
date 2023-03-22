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
import { META } from "@/constants/meta"
import { useRouter } from "next/router"
import { PAGES } from "@/constants/path"
import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import KeyBanner from "@/components/KeyBanner"
import TextDeco from "@/components/elements/TextDeco"

function Blogs() {
  const route = useRouter()
  const querySort = route.query?.sort
  const [sortBy, setSortBy] = useState(querySort)

  const {
    error: blogsError,
    data: blogs,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteScroll<PagingRequestParams, PagesResponseData<BlogResponseData>, any> ({
    queryKey: sortBy === 'views' 
      ? QUERY_KEYS.BLOGS_VIEW_COUNT
      : QUERY_KEYS.BLOGS_LIKE_COUNT,
    promiseFn: sortBy === 'views' 
      ? getBlogViewCountRank
      : getBlogBoardLikeRank,
    params: {
      size: 10,
      page: 1,
    }
  })

  useEffect(() => {
    setSortBy(route.query?.sort)
  }, [route.query?.sort])

  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.refetchQueries([QUERY_KEYS.USER_BLOG])
  }, [sortBy, queryClient])

  if(!querySort) return null

  const tabsInfo = [
    {
      text: '조회수 높은순',
      href: PAGES.BLOG_VIEW_COUNT,
      isActive: sortBy === 'views'
    },
    {
      text: '좋아요 많은순',
      href: PAGES.BLOG_LIKE_COUNT,
      isActive: sortBy === 'likes'
    },
  ]

  const KeyBannerSubTitle = (<>
    {
      blogs?.pages[0]
        ? <>
            <TextDeco color="primary" weight="X-bold">{blogs.pages[0].totalElements}</TextDeco>개의 블로그
          </>
        : null
    }
  </>)

  const activeTabIndex = sortBy === 'views' ? 0 : 1
  
  return (
    <>
      <Head>
        <title>{META.BLOG_RANK.TITLE}</title>
        <meta name="description" content={META.BLOG_RANK.DESC} />
      </Head>
      <KeyBanner
        titleNode={`🔥 ${META.BLOG_RANK.TITLE}`}
        subTitleNode={KeyBannerSubTitle}
        size="small"
      />
      <Tabs
        tabs={tabsInfo}
        align="center"
        size="small"
      />
      <ContentWrapper
        size="narrow"
        contentType="last-content"
        isSection={true}
        title={`블로그 리스트 - ${tabsInfo[activeTabIndex].text}`}
      >
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