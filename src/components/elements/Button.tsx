import styled, { css } from "styled-components"

type Types = 'square-round' | 'round' | 'text' | 'x'
type BgColors = 'primary' | 'disabled'
type Sizes = 'x-small' | 'small' | 'medium' | 'large'

interface ButtonProps {
  styleType: Types,
  buttonText: string,
  bgColor: BgColors,
  size: Sizes,
  title?: string,
  onClick: () => void
}

export default function Button(props: ButtonProps) {
  const { styleType, buttonText, bgColor, size, title, onClick } = props

  return (
    <ButtonTag
      className={`type-${styleType} bg-${bgColor} size-${size}`}
      onClick={onClick}
      title={title}
    >
      <Text>{buttonText}</Text>
    </ButtonTag>
  )
}

const ButtonTag = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  &.size {
    &-x-small {
      min-width: 40px;
      height: 20px;
      padding: 0 10px;
      font-size: var(--font-size-XXS);
    }
    &-small {
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
  &.bg {
    &-primary {
      background-color: hsl(var(--primary-hsl));
      color: #fff;
    }
  }
  &.type {
    &-square-round {
      border-radius: var(--border-radius-M);
    }
    &-round {
      border-radius: var(--border-radius-F);
    }
    &-text {
      display: inline-flex;
      min-width: 0;
      height: auto;
      padding: 5px;
      &.bg-primary {
        background-color: transparent;
        color: hsl(var(--primary-hsl));
      }
    }
  }
`

const Text = styled.span`
`