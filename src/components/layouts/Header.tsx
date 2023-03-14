import Link from "next/link"
import { useSelector, useDispatch  } from "react-redux";
import { SET_IS_LOGIN } from "@/store/auth";
import { RootState } from "@/store";
import Axios from "@/api/Axios";
import JoinModal from "@/components/auth/JoinModal"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import useModal from "@/hooks/useModal"
import styled from "styled-components"
import { useEffect, useState } from "react"

export default function Header() {
  const [isOpen, toggle] = useModal()
  const [joinOrLogin, setJoinOrLogin] = useState('join')
  const dispatch = useDispatch()
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  useEffect(() => {
    const hasToken = localStorage.getItem('AUTH_TOKEN')
    if(hasToken) dispatch(SET_IS_LOGIN(true))
  }, [])

  const onClickUtil = (type: string) => {
    setJoinOrLogin(type)
    toggle()
  }

  const onClickLogout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    dispatch(SET_IS_LOGIN(false))
    Axios.prototype.authToken = null
  }
  
  return (
    <>
      <Wrapper>
        <ContentWrapper layoutType="flex-row">
          <Logo>
            <Link href="/">Open Velog</Link>
          </Logo>
          <Utils>
            {!isLogin ?
              <>
                <Util>
                  <UtilButton onClick={() => onClickUtil('join')}>회원 가입</UtilButton>
                </Util>
                <Util>
                  <UtilButton onClick={() => onClickUtil('login')}>로그인</UtilButton>
                </Util>
              </> :
              <>
                <Util>
                  <UtilLink href="/boards">My Velog</UtilLink>
                </Util>
                <Util>
                  <UtilButton onClick={onClickLogout}>로그아웃</UtilButton>
                </Util>
              </> 
            }
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
const UtilLink = styled(Link)`
`