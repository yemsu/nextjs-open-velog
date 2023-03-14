import Link from "next/link"
import JoinModal from "@/components/auth/JoinModal"
import useModal from "@/hooks/useModal"
import styled from "styled-components"

export default function Header() {
  const [isOpen, toggle] = useModal()

  return (
    <>
      <Wrapper>
        <Logo>
          <Link href="/">📑blog</Link>
        </Logo>
        <Utils>
          <Util>
            <UtilButton onClick={toggle}>회원 가입</UtilButton>
          </Util>
          <Util>
            <UtilButton>로그인</UtilButton>
          </Util>
        </Utils>
      </Wrapper>
      <JoinModal
        isOpen={isOpen}
        toggle={toggle}
      />
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  padding: 10px 30px;
`

const Logo = styled.h1`
  font-size: var(--font-size-title-S);
  font-weight: var(--font-weight-X-bold);
  letter-spacing: 0.05em;
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