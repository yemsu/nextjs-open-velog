import { InputCommon } from "@/types/form"
import React, { SyntheticEvent } from "react"
import styled, { css } from "styled-components"

interface InputProps extends InputCommon {
  value: string,
  checked?: boolean,
  isRequired?: boolean,
  size?: 'small' | 'medium' | 'big'
  onChange: (e: SyntheticEvent) => void
}

function Input(props: InputProps) {
  const { 
    type,
    id,
    name,
    label,
    placeholder,
    value,
    checked,
    isRequired = true,
    size = 'small',
    onChange
  } = props

  const isBackLabelStyle = ["checkbox", "radio"].includes(type)
  const idStr = id || `input-${name}`

  const onClick = (e: SyntheticEvent) => {
    if(!isBackLabelStyle) return
    onChange(e)
  }
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
          as={type === 'textarea' ? 'textarea' : 'input'}
          type={type}
          name={name}
          id={idStr}
          placeholder={placeholder}
          value={value}
          checked={checked}
          required={isRequired}
          onChange={onChange}
          onClick={onClick}
          className={`size-${size}`}
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
    if(isTextInputStyle(type), ['textarea']) {
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

const InputWrapLabel = styled.label`
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
  ${({type}) => {
    if(isTextInputStyle(type)) {
      return css`
        appearance: none;
        flex: 1;
        border: none;
        border-bottom: 1px solid var(--border-dark);
        line-height: 2;
      `
    }
  }}
  &::placeholder {
    font-weight: var(--font-weight-thin);
    color: var(--font-light-gray);
  }
  &[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &.size {
    &-small {
      font-size: var(--font-size-S);
      &::placeholder {
        font-size: var(--font-size-XS);
      }
    }
    &-big {
      font-size: var(--font-size-title-B);
    }
  }
  &[type="textarea"] {
    width: 100%;
    height: 100%;
    &.size {
      &-big {
        font-size: var(--font-size-B);
      }
    }
  }
`

const LabelText = styled(CommonLabel).attrs({
  as: 'span'
})`
  min-width: 2em;
`

function isTextInputStyle(inputType: string, additionalTypes = []) {
  return ["text", "email", "password", "number", ...additionalTypes].includes(inputType)
}


export default React.memo(Input)