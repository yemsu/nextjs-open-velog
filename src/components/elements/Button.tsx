import Link from "next/link"
import styled, { css } from "styled-components"

type Types = 'square-round' | 'round' | 'x'
type BgColors = 'primary' | 'border-black'  | 'disabled'
type Sizes = 'small' | 'medium' | 'large'

interface ButtonProps {
  styleType: Types
  buttonText: string
  bgColor: BgColors
  size: Sizes
  href?: string
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  const { styleType, buttonText, bgColor, size, onClick, href } = props

  const isOutLink = href?.includes('http')
  const tagName = href && isOutLink ? 'a' 
    : !href ? 'button' : Link
  return (
    <ButtonTag
      as={tagName}
      href={href}
      className={`type-${styleType} bg-${bgColor} size-${size}`}
      title={isOutLink ? '새창' : ''}
      target={isOutLink ? '_blank' : ''}
      onClick={onClick}
    >
      <Text>{buttonText}</Text>
    </ButtonTag>
  )
}

const ButtonTag = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  &.type {
    &-square-round {
      border-radius: var(--border-radius-M);
    }
    &-round {
      border-radius: var(--border-radius-F);
    }
  }
  &.bg {
    &-primary {
      background-color: hsl(var(--primary-hsl));
      color: #fff;
    }
    &-border {
      &-black {
        border: 1px solid var(--border-dark);
        color: var(--font-dark);
      }
    }
  }
  &.size {
    &-small {
      min-width: 80px;
      height: 30px;
      padding: 0 10px;
      font-size: var(--font-size-XS);
    }
    &-medium {
      min-width: 120px;
      height: 40px;
      padding: 0 20px;
      font-size: var(--font-size-S);
    }
    &-large {
      font-size: var(--font-size-M);
    }
  }
`

const Text = styled.span`
`