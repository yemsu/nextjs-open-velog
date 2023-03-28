import { ReactNode } from "react"
import styled from "styled-components"

interface ButtonsProps {
  children: ReactNode
  className?: string
}

function Buttons(props: ButtonsProps) {
  const {
    children,
    className
  } = props

  return (
    <ButtonsWrapper className={className}>
      {children}
    </ButtonsWrapper>
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 5px;
`

export default Buttons