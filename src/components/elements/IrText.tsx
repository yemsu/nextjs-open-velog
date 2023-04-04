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

const IrTextH2 = styled.h2``
const IrTextStyled = styled(IrTextH2)`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  font-size: 1px;
`

export default IrText