import styled from 'styled-components'
import { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean,
  title: string,
  toggle: () => void,
  children: ReactNode
};

function Modal (props: ModalProps) {
  const { isOpen, title, toggle, children } = props
  
  return (
    <>
      {isOpen && (
        <Wrapper onClick={toggle}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
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

const modalPd = {
  vtc: '40px',
  hrz: '30px'
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

const ModalBox = styled.section`
  position: relative;
  min-width: 400px;
  padding: ${modalPd.vtc} ${modalPd.hrz};
  background-color: var(--bg-white);
  transform: translateY(calc(25% - 20vh));
  border-radius: var(--border-radius-M);
  box-shadow: var(--shadow-M);
`

const WrapTitle = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const Title = styled.h2`
  font-size: var(--font-size-title-M);
  font-weight: var(--font-weight-X-bold);
  line-height: 1.2;
`

const WrapContent = styled.div`
  font-size: var(--font-size-title-M);
  font-weight: var(--font-weight-X-bold);
  line-height: 1.2;
`

const ButtonClose = styled.button`
  position: absolute;
  top: ${modalPd.vtc};
  right: ${modalPd.hrz};
`

export default Modal