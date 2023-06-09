import { InputCommon } from "@/types/form"
import React, { KeyboardEventHandler, SyntheticEvent } from "react"
import styled, { css } from "styled-components"

interface InputProps extends InputCommon {
  value: string
  onChange: (e: SyntheticEvent) => void,
  onEnter?: () => void,
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
    maxLength,
    minLength,
    autoCompleteName,
    onChange,
    onEnter
  } = props

  const isBulletStyle = ["checkbox", "radio"].includes(type)
  const idStr = id || `input-${name}`
  
  const onClick = (e: SyntheticEvent) => {
    if(!isBulletStyle) return
    onChange(e)
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if(!onEnter) return
    if(e.key === "Enter") {
      onEnter()
    }
  }

  const CommonLabelText = (props: {type?: string}) => (
    label 
      ? <LabelText className={props.type}>{label}</LabelText>
      : null
  )

  return (
    <InputWrap
      as={label ? 'label' : 'div'}
      htmlFor={idStr}
      className={`wrap-input ${checked ? 'checked' : ''}`}
      type={type}
    >
      {!isBulletStyle && <CommonLabelText type="pos-top" />}
      <InputStyled
        as={type === 'textarea' ? 'textarea' : 'input'}
        type={type}
        name={name}
        id={idStr}
        placeholder={placeholder}
        value={value}
        checked={checked}
        required={isRequired}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoCompleteName}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={`size-${size}`}
      />
      {isBulletStyle && <CommonLabelText />}
    </InputWrap>
  )
}

const CommonLabel = styled.label`
  min-width: 30px;
  font-size: var(--font-size-S);
  line-height: 1;
`

const InputWrapLabel = styled.label``
const InputWrap = styled(InputWrapLabel)<{ type: string }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  ${({type}) => {
    if(isBasicStyle(type)) {
      return css`
        width: 100%;
      `
    }
    if(type === 'radio') {
      return css`
        gap:0;
        padding: 6px 10px;
        background-color: var(--white);
        border: 1px solid var(--border-light-gray);
        text-align: center;
        border-radius: var(--border-radius-F);
        cursor: pointer;
        &.checked {
          background-color: hsl(var(--primary-hsl));
          border-color: transparent;
          color: var(--white);          
        }
      `
    }
  }}
`

const InputStyledAs = styled.input``
const InputStyled = styled(InputStyledAs)<{ type: string }>`
  ${({type}) => {
    if(isBasicStyle(type)) {
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
  &[type="radio"] {
    appearance: none;
  }
`

const LabelText = styled(CommonLabel).attrs({
  as: 'span'
})`
  min-width: 2em;
  &.pos-top {
    width: 100%
  }
`

function isBasicStyle(inputType: string, additionalTypes = []) {
  return ["text", "email", "password", "number", ...additionalTypes].includes(inputType)
}


export default React.memo(Input)