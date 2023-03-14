import styled, { css } from "styled-components"

type Types = 'square-round' | 'round' | 'x'
type BgColors = 'primary' | 'disabled'
type Sizes = 'small' | 'medium' | 'large'

interface ButtonProps {
  styleType: Types,
  buttonText: string,
  bgColor: BgColors,
  size: Sizes,
  onClick: () => void
}

export default function Button(props: ButtonProps) {
  const { styleType, buttonText, bgColor, size, onClick } = props

  return (
    <ButtonTag
      className={`type-${styleType} bg-${bgColor} size-${size}`}
      onClick={onClick}
    >
      <Text>{buttonText}</Text>
    </ButtonTag>
  )
}

const ButtonTag = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 40px;
  padding: 0 20px;
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
  }
  &.size {
    &-small {
      font-size: var(--font-size-XS);
    }
    &-medium {
      font-size: var(--font-size-S);
    }
    &-large {
      font-size: var(--font-size-M);
    }
  }
`

const Text = styled.span`
`