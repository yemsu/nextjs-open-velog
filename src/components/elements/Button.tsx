import Link from "next/link"
import styled, { css } from "styled-components"

type Types = 'square-round' | 'round' | 'x'
type BgColors = 'primary' | 'border-black' |
'border-gray' | 'border-primary' | 'black' | 'disabled'
type Sizes = 'x-small' | 'small' | 'medium' | 'large'

interface ButtonProps {
  styleType: Types
  buttonText: string
  buttonTitle?: string
  bgColor: BgColors
  size: Sizes
  href?: string
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  const {
    styleType,
    buttonText,
    buttonTitle,
    bgColor,
    size,
    onClick,
    href
  } = props

  const isOutLink = href?.includes('http')
  const tagName = href && isOutLink ? 'a' 
    : !href ? 'button' : Link
  return (
    <ButtonTag
      as={tagName}
      href={href}
      className={`type-${styleType} bg-${bgColor} size-${size}`}
      title={buttonTitle || (isOutLink ? '새창' : '')}
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
  color: var(--white);
  &.type {
    &-square-round {
      border-radius: var(--border-radius-M);
    }
    &-round {
      border-radius: var(--border-radius-F);
    }
  }
  &.bg {
    &-black {
      background-color: var(--black);
    }
    &-primary {
      background-color: hsl(var(--primary-hsl));
    }
    &-disabled {
      background-color: var(--bg-light-gray);
      font-weight: var(--font-weight-bold);
      color: var(--font-gray);
    }
    &-border {
      &-black {
        border: 1px solid var(--border-dark);
        color: var(--font-dark);
      }
      &-gray {
        border: 1px solid var(--border-gray);
        color: var(--font-gray);
      }
      &-primary {
        border: 1px solid hsl(var(--primary-hsl));
        color: hsl(var(--primary-hsl));
      }
    }
  }
  &.size {
    &-x-small {
      height: 20px;
      padding: 0 8px;
      font-size: var(--font-size-XXS);
      font-weight: var(--font-weight-bold);
    }
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
      min-width: 140px;
      height: 45px;
      padding: 0 30px;
      font-size: var(--font-size-L);
      font-weight: var(--font-weight-X-bold);
    }
  }
`

const Text = styled.span`
`