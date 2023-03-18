import styled from "styled-components"

interface TextDecoProps {
  children: string,
  color?: 'primary',
  weight?: 'bold' | 'X-bold'
}

function TextDeco(props: TextDecoProps) {
  const { children, color, weight } = props

  return (
    <Text
      className={[
        color ? `color-${color}` : '',
        weight ? `weight-${weight}` : ''
      ].join(' ')}
    >{children}</Text>
  )
}

const Text = styled.span`
  &.color {
    &-primary {
      color: hsl(var(--primary-hsl));
    }
  }
  &.weight {
    &-bold {
      font-weight: var(--font-weight-bold);
    }
    &-X-bold {
      font-weight: var(--font-weight-X-bold);
    }
  }
`

export default TextDeco