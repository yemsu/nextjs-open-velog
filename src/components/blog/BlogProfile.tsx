import useInputs from "@/hooks/useInputs"
import MetaDataList from "../MetaDataList"
import { useCallback } from "react"
import styled from "styled-components"
import EditableText from "../elements/EditableText"
import UserProfile from "../UserProfile"
import { putBlog } from "@/api/blog"
import useCommonMutation from "@/hooks/useCommonMutation"
import { BlogResponseData, PutBlogArgs } from "@/types/blog"
import { ALERTS } from "@/constants/alerts"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/queryKeys"

interface BlogProfileProps {
  profilePosition?: 'top' | 'bottom'
  blog: BlogResponseData
  isMine?: boolean
}

interface FormDataTypes {
  [key: string]: string
}

function BlogProfile(props: BlogProfileProps) {
  const queryClient = useQueryClient()
  const {
    profilePosition,
    blog: { 
      id: blogId,
      memberUsername,
      introduce,
      wishCountSum,
      viewCountSum
    },
    isMine = false
  } = props

  const {
    mutate: editIntroduce
  } = useCommonMutation<BlogResponseData, PutBlogArgs, any>(
    putBlog, {
    onSuccess: () => {
      alert(ALERTS.PUT_BLOG_SUCCESS)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_BLOG] })
    },
    onError: () => {
      alert(ALERTS.PUT_BLOG_ERROR)
    },
  })

  const [forms, onChange, reset] = useInputs<FormDataTypes>({
    blogIntroduce: introduce
  })

  const onSubmitEditableText = useCallback(() => {
    editIntroduce({
      blogId,
      payload: {
        introduce: forms.blogIntroduce
      }
    })
  }, [blogId, forms, editIntroduce])

  return (
    <Wrapper className={profilePosition ? `pos-${profilePosition}` : ''}>
      <UserProfile
        username={memberUsername}
        size="large"
      />
      <TextWrapper>
        <BlogTitle>{memberUsername}님의 블로그</BlogTitle>
        {isMine
          ? <EditableText
              defaultText="블로그 소개글을 작성해주세요."
              text={introduce}
              inputName="blogIntroduce"
              inputValue={forms.blogIntroduce}
              placeholder="블로그 소개글"
              resetInput={reset}
              onChange={onChange}
              onSubmit={onSubmitEditableText}
            />
          : <BlogDescription>{introduce}</BlogDescription> 
        }
        <MetaDataList
          dataObj={{
            viewCount: viewCountSum,
            wishCount: wishCountSum
          }}
        />
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