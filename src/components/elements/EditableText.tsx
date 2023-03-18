import Input from "./Input"
import styled from "styled-components"
import { SyntheticEvent, useCallback, useState } from "react"
import EmojiButton from "./EmojiButton"
import { BUTTON_TITLES } from "@/constants/etc"

interface EditableTextProps {
  defaultText: string
  text?: string
  inputName: string 
  inputValue?: string
  placeholder?: string
  onChange: (e: SyntheticEvent) => void
  onSubmit: () => void
  resetInput: () => void
}

function EditableText(props: EditableTextProps) {
  const {
    defaultText,
    text,
    inputName,
    inputValue,
    placeholder,
    onChange,
    onSubmit,
    resetInput
  } = props
  const [isShowInput, setIsShowInput] = useState(false)

  const onClickDefaultText = useCallback(() => {
    setIsShowInput(true)
  }, [])

  const onCancel = useCallback(() => {
    setIsShowInput(false)
    resetInput()
  }, [])

  const onClickSubmit = useCallback(() => {
    onSubmit()
    setIsShowInput(false)
  }, [onSubmit])

  return (
    <div>
      {isShowInput 
        ? <InputWrapper>
            <Input
              type="text"
              name={inputName}
              value={inputValue as string}
              placeholder={placeholder}
              onChange={onChange}
            />
            <EmojiButton
              emojiType="save"
              size="small"
              onClick={onClickSubmit}
            />
            <EmojiButton
              emojiType="cancel"
              size="small"
              onClick={onCancel}
            />
          </InputWrapper>
        : <EditButton
            onClick={onClickDefaultText}
            title={BUTTON_TITLES.EDIT}
          >
            {text || defaultText} ✍️
          </EditButton>
      }
    </div>
  )
}

const InputWrapper = styled.div`
  display: flex;
  gap: 5px;
  input {
    width: 250px;
  }
`

const EditButton = styled.button`
  font-size: var(--font-size-title-XS);
  color: var(--font-dark-gray);
`

export default EditableText