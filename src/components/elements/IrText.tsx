import styled from "styled-components"

interface IrTextProps {
  text: string
  tagName?: keyof JSX.IntrinsicElements
}

function IrText(props: IrTextProps) {
  const {
    text,
    tagName = 'h2'
  } = props

  return (
    <IrTextStyled
      as={tagName}
    >{text}</IrTextStyled>
  )
}

const IrTextStyled = styled.h2`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  font-size: 1px;
`

export default IrText