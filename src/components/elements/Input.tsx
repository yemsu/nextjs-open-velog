import React, { SyntheticEvent } from "react"
import styled, { css } from "styled-components"

interface InputProps {
  type: string,
  id?: string,
  name: string,
  label?: string,
  value?: string,
  placeholder?: string,
  checked?: boolean,
  isRequired?: boolean,
  onChange: (e: SyntheticEvent) => void
}

function Input(props: InputProps) {
  const { type, id, name, label, placeholder, value, checked, isRequired = true, onChange } = props

  const idStr = id || `input-${name}`
  const isBackLabelStyle = ["checkbox", "radio"].includes(type)
  return (
    <Wrapper type={type}>
      {
        label && !isBackLabelStyle &&
        <Label htmlFor={idStr} type={type}>{label}</Label>
      }
      <InputWrapLabel
        as={isBackLabelStyle ? 'label' : 'div'}
        className='wrap-input'
      >
        <InputTag
          type={type}
          id={idStr}
          name={name}
          placeholder={placeholder}
          value={value}
          checked={checked}
          required={isRequired}
          onChange={onChange}
        />
        {isBackLabelStyle && <LabelText>{label}</LabelText>}
      </InputWrapLabel>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  ${({type}) => {
    if(isTextInputStyle(type)) {
      return css`
        width: 100%;
        .wrap-input {
          width: 100%;
        }
      `
    }
  }}
`

const CommonLabel = styled.label`
  min-width: 30px;
  font-size: var(--font-size-S);
  line-height: 1;
`

const InputWrapLabel = styled(CommonLabel)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`

const Label = styled(CommonLabel)<{ type: string }>`
  ${({type}) => {
    if(isTextInputStyle(type)) {
      return css`
        width: 100%;
      `
    }
  }}
`

const InputTag = styled.input<{ type: string }>`
  font-size: var(--font-size-S);
  ${({type}) => {
    if(isTextInputStyle(type)) {
      return css`
        appearance: none;
        flex: 1;
        padding: 5px;
        border: none;
        border-bottom: 1px solid var(--border-dark);
      `
    }
  }}
  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::placeholder {
    font-weight: var(--font-weight-thin);
    color: var(--font-light-gray);
  }
`

const LabelText = styled.span`
  min-width: 2em;
`

function isTextInputStyle(inputType: string) {
  return ["text", "email", "password", "number"].includes(inputType)
}


export default React.memo(Input)