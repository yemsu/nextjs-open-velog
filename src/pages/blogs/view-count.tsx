import { getBlogViewCountRank } from "@/api/blog"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import BlogProfile from "@/components/blog/BlogProfile"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { PagingRequestParams, PagesResponseData } from "@/types/api"
import { BlogResponseData } from "@/types/blog"
import InfiniteScrollContent from "@/components/InfiniteScrollContent"
import styled from "styled-components"

function BlogViewCount() {
  const {
    error: blogsError,
    data: viewCountBlogs,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteScroll<PagingRequestParams, PagesResponseData<BlogResponseData>, any> ({
    queryKey: QUERY_KEYS.USER_BLOG,
    promiseFn: getBlogViewCountRank,
    params: {
      size: 10,
      page: 1,
    }
  })

  return (
    <ContentWrapper
      size="narrow"
      contentType="main"
    >
      <InfiniteScrollContent
        isDataFetched={!!viewCountBlogs}
        isFetchingNextPage={isFetchingNextPage}
        isFetching={isFetching}
        error={blogsError as Error}
        fetchNextPage={fetchNextPage}
      >
        <ul>
          {
            viewCountBlogs?.pages.flatMap(({content}) => (
              <li key={content.id}>
                <BlogProfile
                  blog={content}
                ></BlogProfile>
              </li>
            ))
          }
        </ul>
      </InfiniteScrollContent>
    </ContentWrapper>
  )
}

export default BlogViewCount