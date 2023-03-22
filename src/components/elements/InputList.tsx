import styled from "styled-components"
import { ValidationsState } from "@/types/auth"
import { Forms, InputCategory } from "@/types/form"
import React, { SyntheticEvent } from "react"
import Input from "./Input"
import InputWrapper from "./InputWrapper"

interface InputListProps {
  inputList: InputCategory[]
  forms: Forms
  onChange: (e: SyntheticEvent) => void
  validations?: ValidationsState
}

function InputList(props: InputListProps) {
  const {
    inputList,
    forms,
    onChange,
    validations
  } = props

  return (
    <InputWrapper>
      {inputList.map(({
        type,
        id,
        name,
        label,
        value,
        placeholder
      }: InputCategory, i) => {
        return (
          <React.Fragment key={name + id}>
            <Input
              type={type}
              id={id}
              name={name}
              label={label}
              value={value || forms[name]}
              checked={forms[name] === value}
              placeholder={placeholder}
              onChange={onChange}
            />
            {
              validations && validations[name]?.text &&
              <TextValidation className={validations[name].isValid ? 'pass' : ''}>
                {validations[name].text}
              </TextValidation>
            }
          </React.Fragment>
        )
      })}
    </InputWrapper>
  )
}

const TextValidation = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: var(--font-size-XS);
  &:not(.pass) {
    color: #f33c5a;
    font-weight: var(--font-weight-bold);
    &:before {
      content: '❗';
    }
  }
  &.pass {
    color: #21b98c;
    &:before {
      content: '✅';
    }
  }
`

export default InputList