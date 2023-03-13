import styled, { css } from 'styled-components'
import { ReactNode } from 'react'

type Sizes = 'small' | 'medium' | 'large'

interface ModalProps {
  isOpen: boolean,
  title: string,
  toggle: () => void,
  children: ReactNode,
  size?: Sizes
};

function Modal (props: ModalProps) {
  const { isOpen, title, toggle, children, size = 'medium' } = props
  
  return (
    <>
      {isOpen && (
        <Wrapper onClick={toggle}>
          <ModalBox
            size={size}
            onClick={(e) => e.stopPropagation()}
          >
            <WrapTitle>
              <Title>{title}</Title>
            </WrapTitle>
            <WrapContent>{children}</WrapContent>
            <ButtonClose onClick={toggle}>
              닫기
            </ButtonClose>
          </ModalBox>
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: var(--bg-dimmed);
`

const ModalBox = styled.section<{ size: string }>`
  position: relative;
  min-width: 400px;
  padding: 60px 30px;
  background-color: var(--bg-white);
  transform: translateY(calc(25% - 20vh));
  border-radius: var(--border-radius-M);
  box-shadow: var(--shadow-M);
  ${({size}) => {
    switch (size) {
      case 'small':
        return css`
          min-width: 400px;
        `
      case 'medium':
        return css`
          min-width: 500px;
        `
      case 'large':
        return css`
          min-width: 600px;
        `
    }
  }}
`

const WrapTitle = styled.div`
  text-align: center;
  margin-bottom: 50px;
`

const Title = styled.h2`
  font-size: var(--font-size-title-M);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
`

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--font-size-title-M);
  font-weight: var(--font-weight-X-bold);
  line-height: 1.2;
`

const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`

export default Modal