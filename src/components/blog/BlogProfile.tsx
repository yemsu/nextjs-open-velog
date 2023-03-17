import useInputs from "@/hooks/useInputs"
import { useCallback } from "react"
import styled from "styled-components"
import EditableText from "../elements/EditableText"

interface BlogProfileProps {
  profilePosition: 'top' | 'bottom'
  username: string,
  introduce: string,
  isMine?: boolean
}

interface FormDataTypes {
  [key: string]: string
}

function BlogProfile(props: BlogProfileProps) {
  const { profilePosition, username, introduce, isMine = false } = props
  const [forms, onChange, reset] = useInputs<FormDataTypes>({
    blogIntroduce: ''
  })
  const onSubmitEditableText = useCallback(() => {
    console.log('forms', forms)
  }, [forms])

  return (
    <Wrapper className={`pos-${profilePosition}`}>
      <Profile>{username}</Profile>
      <TextWrapper>
        <BlogTitle>{username}님의 블로그</BlogTitle>
        {isMine && !introduce
          ? <EditableText
              defaultText="블로그 소개글을 작성해주세요."
              inputName="blogIntroduce"
              inputValue={forms.blogIntroduce}
              placeholder="블로그 소개글"
              resetInput={reset}
              onChange={onChange}
              onSubmit={onSubmitEditableText}
            />
          : <BlogDescription>{introduce}</BlogDescription> 
        }
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
  margin-bottom: 5px;
  font-size: var(--font-size-title-S);
  font-weight: var(--font-weight-bold);
`

const BlogDescription = styled.p`
  margin-top: 5px;
  font-size: var(--font-size-title-XS);
  color: var(--font-dark-gray);
`

export default BlogProfile