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


function UserBlog() {
  const userInfo = useSelector(getUserInfo)
  const router = useRouter()
  const userId = router.query.userId as string
  const {
    error: userBlogError,
    data: userBlog
  } = useCommonQuery<string, BlogResponseData>({
    queryKey: QUERY_KEYS.BLOG,
    params: userId, 
    promiseFn: getBlog, 
    enabledChecker: !!userId
  })
  
  if (userBlogError) {
    return "An userBlogError error has occurred: " + userBlogError.message
  }

  if(!userBlog) return null
  return (
    <ContentWrapper size="narrow" contentType="main">
      {userBlog &&
        <MainSection>
          <BlogProfile
            profilePosition="top"
            blog={userBlog}
          />
          <BoardList />
        </MainSection>
      }
    </ContentWrapper>
  )
}

const MainSection = styled.section`  
`

export default UserBlog