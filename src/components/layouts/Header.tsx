import Link from "next/link"
import { useSelector, useDispatch  } from "react-redux";
import { getIsLogin, getUserInfo, SET_IS_LOGIN, SET_USER_INFO } from "@/store/auth";
import Axios from "@/api/Axios";
import { APP_TITLE, USER_INFO } from "@/constants/etc";
import JoinModal from "@/components/auth/JoinModal"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import IrText from "../elements/IrText";
import useModal from "@/hooks/useModal"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { PAGES } from "@/constants/path";
import Button from "../elements/Button";
import { getCookie, removeCookie } from "@/utils/cookie";

export default function Header() {
  const [isOpen, toggle] = useModal()
  const [joinOrLogin, setJoinOrLogin] = useState('join')
  const dispatch = useDispatch()
  const isLogin = useSelector(getIsLogin);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    const savedToken = getCookie('Authorization')
    const userInfoStr = localStorage.getItem(USER_INFO)
    if(!savedToken && userInfoStr) {
      localStorage.removeItem(USER_INFO)
      return
    }
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
    removeCookie('Authorization')
    localStorage.removeItem(USER_INFO)
    dispatch(SET_IS_LOGIN(false))
    dispatch(SET_USER_INFO(null))
    Axios.prototype.authToken = null
    alert('로그아웃이 완료되었습니다.')
  }
  
  return (
    <>
      <Wrapper>
        <ContentWrapper size="full">
          <Inner>
            <Logo>
              <Link href="/">{APP_TITLE}</Link>
            </Logo>
            <GnbNav>
              <IrText text="사이트 글로벌 메뉴" />
              <GnbList>
                <GnbItem>
                  <Link href="/blogs/view-count">실시간 블로그 순위</Link>
                </GnbItem>
                <GnbItem>
                  <Link href="/">인기 검색어</Link>
                </GnbItem>
              </GnbList>
            </GnbNav>
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
                        {userInfo.username} Velog
                      </UtilLink>
                  }</Util>
                  <Util>
                    <UtilButton onClick={onClickLogout}>로그아웃</UtilButton>
                  </Util>
                </>
              }
            </Utils>
          </Inner>
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
  z-index: var(--header-z);
  width: 100%;
  background: hsla(var(--white-hsl), .7);
  backdrop-filter: blur(5px);
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 55px;
`

const Logo = styled.h1`
  margin-top: -6px;
  font-family: var(--font-family-eng-title);
  font-size: var(--font-size-title-S);
  font-weight: var(--font-weight-X-bold);
`

const GnbNav = styled.nav`
  flex: 1;
  position: absolute;
  left: 50%;
  transform: translateX(calc(-1 * ((var(--content-wrap-normal) / 2) - var(--content-wrap-hrz-padding))));
`

const GnbList = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;
`

const GnbItem = styled.li`
  font-size: var(--font-size-M);
  font-weight: var(--font-weight-bold);
`

const Utils = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
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