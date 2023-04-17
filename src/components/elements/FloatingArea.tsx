import { ReactNode } from "react"
import styled from "styled-components"

interface FloatingAreaProps {
  children: ReactNode
}

function FloatingArea(props: FloatingAreaProps) {
  const {
    children
  } = props

  return (
    <FloatingStyled>
      { children }
    </FloatingStyled>
  )
}

const FloatingStyled = styled.div`
  position: fixed;
  top: calc(60px + 55px + 65px);
  left: 50%;
  z-index: var(--floating-z);
  padding: 5px;
  margin-left: calc(-1 * ((var(--content-wrap-narrow) / 2) + 20px));
  background-color: var(--bg-light-gray);
  border-radius: var(--border-radius-F);
  transform: translateX(-100%);
`

export default FloatingArea