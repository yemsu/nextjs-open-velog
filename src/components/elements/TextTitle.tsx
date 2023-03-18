import { ReactNode } from "react"
import styled from "styled-components"

interface TextTitleProps {
  children: ReactNode
  titleType: 'main-kv'
  color?: 'primary'
  align?: 'left' | 'center'
}

function TextTitle(props: TextTitleProps) {
  const { 
    children,
    titleType,
    color,
    align = 'left'
  } = props

  return (
    <Title
      className={[
        `type-${titleType}`,
        `align-${align}`,
        color ? `color-${color}` : '',
      ].join(' ')}
    >{children}</Title>
  )
}

const Title = styled.h2`
  &.type {
    &-main-kv {
      font-size: var(--font-size-title-B);
      text-align: center;
    }
  }
  &.color {
    &-primary {
      color: hsl(var(--primary-hsl));
    }
  }
  &.align {
    &-center {
      text-align: center;
    }
  }
`

export default TextTitle