import { InputCommon } from "@/types/form"
import React, { KeyboardEventHandler, SyntheticEvent } from "react"
import styled, { css } from "styled-components"

interface InputProps extends InputCommon {
  value: string
  checked?: boolean
  isRequired?: boolean
  size?: 'small' | 'medium' | 'big'
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
    <InputWrapLabel
      as={label ? 'label' : 'div'}
      htmlFor={idStr}
      className='wrap-input'
    >
      {!isBulletStyle && <CommonLabelText type="pos-top" />}
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
        onKeyDown={onKeyDown}
        className={`size-${size}`}
      />
      {isBulletStyle && <CommonLabelText />}
    </InputWrapLabel>
  )
}

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

const InputTag = styled.input<{ type: string }>`
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