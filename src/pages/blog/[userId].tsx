import BoardList from "@/components/board/BoardList"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import BlogProfile from "@/components/blog/BlogProfile"
import { getUserInfo } from "@/store/auth"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import styled from "styled-components"

interface userBlogProps {

}

function UserBlog(props: userBlogProps) {
  const [username, setUsername] = useState('')

  const dispatch = useDispatch()
  const userInfo = useSelector(getUserInfo)

  useEffect(() => {
    console.log('userInfo', userInfo)
    if(userInfo) {
      setUsername(userInfo.username)
    }
  }, [userInfo])

  return (
    <ContentWrapper size="narrow" contentType="main">
      {username &&
        <MainSection>
          <BlogProfile profilePosition="top" />
          <BoardList />
        </MainSection>
      }
    </ContentWrapper>
  )
}

const MainSection = styled.section`  
`

export default UserBlog