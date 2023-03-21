import { getBlogViewCountRank } from "@/api/blog"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { PagingRequestParams, PagesResponseData } from "@/types/api"
import { BlogResponseData } from "@/types/blog"
import InfiniteScrollContent from "@/components/InfiniteScrollContent"
import BlogProfileList from "@/components/blog/BlogProfileList"

function BlogViewCount() {
  const {
    error: blogsError,
    data: viewCountBlogs,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteScroll<PagingRequestParams, PagesResponseData<BlogResponseData>, any> ({
    queryKey: QUERY_KEYS.BLOG_VIEW_COUNT,
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
        <BlogProfileList 
          blogs={viewCountBlogs?.pages.flatMap(({content}) => content)}
        />
      </InfiniteScrollContent>
    </ContentWrapper>
  )
}

export default BlogViewCount