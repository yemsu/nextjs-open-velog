import Link from "next/link"
import { useSelector, useDispatch  } from "react-redux";
import { getIsLogin, getUserInfo, SET_IS_LOGIN, SET_USER_INFO } from "@/store/auth";
import Axios from "@/api/Axios";
import { APP_TITLE, AUTH_TOKEN, USER_INFO } from "@/constants/etc";
import JoinModal from "@/components/auth/JoinModal"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import useModal from "@/hooks/useModal"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { PAGES } from "@/constants/path";
import Button from "../elements/Button";

export default function Header() {
  const [isOpen, toggle] = useModal()
  const [joinOrLogin, setJoinOrLogin] = useState('join')
  const dispatch = useDispatch()
  const isLogin = useSelector(getIsLogin);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    const savedToken = localStorage.getItem(AUTH_TOKEN)
    const userInfoStr = localStorage.getItem(USER_INFO)
    if(savedToken && userInfoStr) {
      dispatch(SET_IS_LOGIN(true))
      dispatch(SET_USER_INFO(JSON.parse(userInfoStr)))
      Axios.prototype.authToken = savedToken
    }
  }, [])

  const onClickUtil = (type: string) => {
    setJoinOrLogin(type)
    toggle()
  }

  const onClickLogout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(USER_INFO)
    dispatch(SET_IS_LOGIN(false))
    dispatch(SET_USER_INFO(null))
    Axios.prototype.authToken = null
  }
  
  return (
    <>
      <Wrapper>
        <ContentWrapper size="full" layoutType="flex-row">
          <Logo>
            <Link href="/">{APP_TITLE}</Link>
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
                  <Button
                    styleType="round"
                    bgColor="border-black"
                    size="small"
                    href={PAGES.BLOG_WRITE}
                    buttonText="새 글쓰기"
                  />
                </Util>
                <Util>{
                  userInfo && 
                    <UtilLink href={PAGES.USER_BLOG(userInfo?.userId)}>
                      My Velog
                    </UtilLink>
                }</Util>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
`

const Logo = styled.h1`
  font-family: var(--font-family-eng-title);
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
  font-family: var(--font-family-eng-title);
`