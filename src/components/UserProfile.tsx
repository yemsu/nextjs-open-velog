import Link from "next/link"
import styled from "styled-components"
import { PAGES } from "@/constants/path"

interface UserProfileProps {
  username: string
  userIdForLInk?: string
  size: 'small' | 'large'
}

function UserProfile(props: UserProfileProps) {
  const {
    username,
    userIdForLInk,
    size
  } = props

  return (
    <UserProfileStyled className={`size-${size}`}>
      {
        !userIdForLInk ? username
          : <Link href={PAGES.USER_BLOG(userIdForLInk)}>{username}</Link>
      }
      
    </UserProfileStyled>
  )
}

const UserProfileStyled = styled.p`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-F);
  background-color: hsl(var(--primary-hsl));
  color: var(--white);
  white-space: nowrap;
  &.size {
    &-small {
      width: 32px;
      height: 32px;
      font-size: var(--font-size-XS);
    }
    &-large {
      width: 90px;
      height: 90px;
      font-size: var(--font-size-M);
    }
  }
`

export default UserProfile