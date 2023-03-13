import React, { SyntheticEvent } from "react"
import styled from "styled-components"

interface InputProps {
  type: string,
  name: string,
  label: string,
  value?: string,
  placeholder?: string,
  onChange: (e: SyntheticEvent) => void
}

function Input(props: InputProps) {
  const { type, name, label, placeholder, value, onChange } = props

  const id = `input-${name}`
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <InputTag
        type={type}
        id={id}
        name={name}
        placeholder={placeholder || `${label} 입력 해주세요`}
        value={value}
        onChange={onChange}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  &:nth-child(n+2) {
    margin-top: 15px;
  }
`
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: var(--font-size-S);
  line-height: 1;
`
const InputTag = styled.input`
  flex: 1;
  padding: 10px 10px 5px;
  border-bottom: 1px solid var(--border-dark);
  font-size: var(--font-size-S);
  &::placeholder {
    font-weight: var(--font-weight-thin);
    color: var(--font-light-gray);
  }
`

export default React.memo(Input)