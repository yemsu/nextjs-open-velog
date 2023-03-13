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
      styleType={styleType}
      bgColor={bgColor}
      size={size}
      onClick={onClick}
    >
      <Text>{buttonText}</Text>
    </ButtonTag>
  )
}

interface ButtonStyledProps {
  styleType: string,
  bgColor: string,
  size: string,
}

const typeStyles = css<{styleType: string}>`
  ${({styleType}) => {
    // style type
    switch (styleType) {
      case 'square-round':
        return css`
          border-radius: var(--border-radius-M);
        `
      case 'round':
        return css`
          border-radius: var(--border-radius-F);
        `
    }
  }}
`

const bgStyles = css<{bgColor: string}>`
  ${({bgColor}) => {
    switch (bgColor) {
      case 'primary':
        return css`
          background-color: hsl(var(--primary-hsl));
          color: #fff;
        `
    }
  }}
`

const sizeStyles = css<{size: string}>`
  ${({size}) => {
    switch (size) {
      case 'small':
        return css`
          font-size: var(--font-size-XS);
        `
      case 'medium':
        return css`
          font-size: var(--font-size-S);
        `
      case 'large':
        return css`
          font-size: var(--font-size-M);
        `
    }
  }}
`

const ButtonTag = styled.button<ButtonStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  height: 40px;
  padding: 0 20px;
  line-height: 1;
  ${typeStyles}
  ${bgStyles}
  ${sizeStyles}
`

const Text = styled.span`
`