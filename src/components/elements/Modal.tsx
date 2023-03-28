import styled, { css } from 'styled-components'
import { ReactNode, SyntheticEvent } from 'react'
import IrText from './IrText'

type Sizes = 'small' | 'medium' | 'large'

interface ModalProps {
  isOpen: boolean,
  title: string,
  toggle: () => void,
  children: ReactNode,
  submitButton: ReactNode,
  submitEvent?: (e: SyntheticEvent) => void,
  size?: Sizes
};

function Modal (props: ModalProps) {
  const {
    isOpen,
    title,
    toggle,
    children,
    submitButton,
    submitEvent,
    size = 'medium'
  } = props
  
  return (
    <>
      {isOpen && (
        <Wrapper onClick={toggle}>
          <ModalBox
            as={submitEvent ? 'form' : 'div'}
            size={size}
            onClick={(e: SyntheticEvent) => e.stopPropagation()}
            onSubmit={submitEvent}
          >
            <WrapTitle>
              <Title>{title}</Title>
            </WrapTitle>
            <WrapContent>{children}</WrapContent>
            <WrapButtons>
              { submitButton }
            </WrapButtons>
            <ButtonClose onClick={toggle} title="팝업 닫기">
              <IrText text="닫기" />
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
  padding: 60px 30px 40px;
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
  font-family: var(--font-family-eng-title);
  font-size: var(--font-size-title-M);
  font-weight: var(--font-weight-X-bold);
  line-height: 1.2;
`

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--font-size-title-M);
  line-height: 1.2;
`

const WrapButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;
`

const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  transition: transform .3s;
  &:hover {
    transform: rotate(90deg);
    transition: transform .3s;
  }
  &:before,
  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--bg-dark);
    content: '';
  }
  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

export default Modal