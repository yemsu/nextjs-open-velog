import styled, { css } from "styled-components"
import React, { ReactNode } from 'react'

interface InputWrapperProps {
  label?: string,
  labelFor?: string,
  children: ReactNode
  wrapperStyle?: 'normal' | 'compact' | 'row'
}

function InputWrapper(props: InputWrapperProps) {
  const {
    children,
    label,
    labelFor,
    wrapperStyle = 'normal'
  } = props
  
  const childrenCount = React.Children.count(children)
  return (
    <Wrapper 
      multipleChildren={childrenCount > 1}
      className={`type-${wrapperStyle}`}
    >
      {label && <Label htmlFor={labelFor}>{label}</Label>}
      <Inputs>{children}</Inputs>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ multipleChildren: boolean }>`
  position: relative;
  &.type {
    &-normal {
      & + & {
        margin-top: 30px;
      }
    }
    &-compact {
      & + & {
        margin-top: 5px;
      }
    }
    &-row {
    }
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
  gap: 5px 5px;
`

export default InputWrapper