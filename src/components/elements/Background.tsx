import { ReactNode } from "react"
import styled from "styled-components"

interface BackgroundProps {
  children: ReactNode
  bgColor: 'primary-1' | 'primary-2'
}

function Background(props: BackgroundProps) {
  const {
    children,
    bgColor
  } = props

  return (
    <Area className={`bg-${bgColor}`}>
      {children}
    </Area>
  )
}

const Area = styled.div`
  &.bg {
    &-primary-1 {
      background-color: hsla(var(--primary-hsl), .1);
    }
    &-primary-2 {
      background-color: hsla(var(--primary-hsl), .2);
    }
  }
`

export default Background