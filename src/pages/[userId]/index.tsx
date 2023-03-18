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


function UserBlog() {
  const userInfo = useSelector(getUserInfo)
  const router = useRouter()
  const userId = router.query.userId as string
  const {
    error: userBlogError,
    data: userBlog
  } = useCommonQuery<string, BlogResponseData>({
    queryKey: QUERY_KEYS.BLOG,
    promiseFn: getBlog, 
    params: userId, 
    enabledChecker: !!userId
  })

  if(!userBlog) return null

  return (
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
              <BoardList />
            </MainSection>
      }
    </ContentWrapper>
  )
}

const MainSection = styled.section`  
`

export default UserBlog