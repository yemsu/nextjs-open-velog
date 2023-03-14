import Link from "next/link"
import JoinModal from "@/components/auth/JoinModal"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import useModal from "@/hooks/useModal"
import styled from "styled-components"
import { useState } from "react"

export default function Header() {
  const [isOpen, toggle] = useModal()
  const [joinOrLogin, setJoinOrLogin] = useState('join')

  const onClickUtil = (type: string) => {
    setJoinOrLogin(type)
    toggle()
  }
  
  return (
    <>
      <Wrapper>
        <ContentWrapper layoutType="flex-row">
          <Logo>
            <Link href="/">Open Velog</Link>
          </Logo>
          <Utils>
            <Util>
              <UtilButton onClick={() => onClickUtil('join')}>회원 가입</UtilButton>
            </Util>
            <Util>
              <UtilButton onClick={() => onClickUtil('login')}>로그인</UtilButton>
            </Util>
          </Utils>
        </ContentWrapper>
      </Wrapper>
      <JoinModal
        modalType={joinOrLogin}
        isOpen={isOpen}
        toggle={toggle}
      />
    </>
  )
}

const Wrapper = styled.div`
  height: 55px;
  padding: 0 30px;
`

const Logo = styled.h1`
  font-size: var(--font-size-title-S);
  font-weight: var(--font-weight-X-bold);
`

const Utils = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
`

const Util = styled.li`
  font-size: var(--font-size-S);
  color: var(--font-gray);
`

const UtilButton = styled.button`
`