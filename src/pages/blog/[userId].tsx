import BoardList from "@/components/board/BoardList"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import BlogProfile from "@/components/blog/BlogProfile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { fetchUserBlog, getUserBlog } from "@/store/blog"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { getUserInfo } from "@/store/auth"

function UserBlog() {
  const router = useRouter()
  const dispatch = useDispatch()
  const userBlog = useSelector(getUserBlog)
  const userInfo = useSelector(getUserInfo)

  useEffect(() => {
    const userId = router.query.userId as string
    if(userId) {
      dispatch(fetchUserBlog(userId) as any)
    }
  }, [router.query.userId])

  return (
    <ContentWrapper size="narrow" contentType="main">
      {userBlog &&
        <MainSection>
          <BlogProfile
            isMine={userInfo?.username === userBlog.member.username}
            profilePosition="top"
            username={userBlog.member.username}
            introduce={userBlog.introduce}
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