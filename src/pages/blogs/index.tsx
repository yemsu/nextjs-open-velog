import { getBlogViewCounts } from "@/api/blog"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import BlogProfile from "@/components/blog/BlogProfile"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { CommonPagingRequestParams, CommonPagingResponseData } from "@/types/api"
import { BlogResponseData } from "@/types/blog"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"

interface BlogsProps {

}

function Blogs(props: BlogsProps) {
  const { ref, inView } = useInView()
  const {
    error: blogsError,
    data: viewCountBlogs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteScroll<CommonPagingRequestParams, CommonPagingResponseData<BlogResponseData>, null> ({
    queryKey: QUERY_KEYS.USER_BLOG,
    promiseFn: getBlogViewCounts,
    params: {
      size: 10,
      page: 1,
    }
  })
console.log('viewCountBlogs', viewCountBlogs)
  return (
    <ContentWrapper
      size="narrow"
      contentType="main"
    >
      <ul>
        {
          viewCountBlogs?.pages.flatMap(({content}) => (
            <li key={content.id}>
              <BlogProfile
                profilePosition="top"
                blog={content}
              ></BlogProfile>
            </li>
          ))
        }
      </ul>
    </ContentWrapper>
  )
}

export default Blogs