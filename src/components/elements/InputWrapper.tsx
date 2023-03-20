import styled, { css } from "styled-components"
import React, { ReactNode } from 'react'

interface InputWrapperProps {
  label?: string,
  labelFor?: string,
  children: ReactNode
}

function InputWrapper(props: InputWrapperProps) {
  const { children, label, labelFor } = props
  
  const childrenCount = React.Children.count(children)
  return (
    <Wrapper multipleChildren={childrenCount > 1}>
      {label && <Label htmlFor={labelFor}>{label}</Label>}
      <Inputs>{children}</Inputs>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ multipleChildren: boolean }>`
  position: relative;
  & + & {
    margin-top: 30px;
  }
  ${({multipleChildren}) => {
    if(multipleChildren) {
      return css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
      `
    }
  }}
`

const Label = styled.label`
  font-size: var(--font-size-S);
  line-height: 1;
  width: 100%;
`

const Inputs = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px 15px;
`

export default InputWrapper