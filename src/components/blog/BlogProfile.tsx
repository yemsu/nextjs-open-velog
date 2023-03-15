import styled from "styled-components"

interface BlogProfileProps {
  profilePosition: 'top' | 'bottom'
}

function BlogProfile(props: BlogProfileProps) {
  const { profilePosition } = props
  return (
    <Wrapper className={`pos-${profilePosition}`}>
      <Profile>김말순</Profile>
      <TextWrapper>
        <BlogTitle>김말순님의 블로그</BlogTitle>
        <BlogDescription>FE 블로그</BlogDescription>
      </TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px 0;
  &.pos {
    &-top {
      padding-top: 0;
      margin-bottom: 10px;
    }
  }
`

const Profile = styled.p`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: var(--border-radius-F);
  background-color: hsl(var(--primary-hsl));
  color: var(--white);
  white-space: nowrap;
`

const TextWrapper = styled.div`
`

const BlogTitle = styled.h2`
  font-size: var(--font-size-title-S);
  font-weight: var(--font-weight-bold);
`

const BlogDescription = styled.p`
  margin-top: 5px;
  font-size: var(--font-size-title-XS);
  color: var(--font-dark-gray);
`

export default BlogProfile