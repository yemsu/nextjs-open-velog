import Input from "./Input"
import styled from "styled-components"
import { SyntheticEvent, useCallback, useState } from "react"
import EmojiButton from "./EmojiButton"

interface EditableTextProps {
  defaultText: string
  inputName: string 
  inputValue?: string
  placeholder?: string
  onChange: (e: SyntheticEvent) => void
  onSubmit: () => void
  resetInput: () => void
}

function EditableText(props: EditableTextProps) {
  const { defaultText, inputName, inputValue, placeholder, onChange, onSubmit, resetInput } = props
  const [isShowInput, setIsShowInput] = useState(false)

  const onClickDefaultText = useCallback(() => {
    setIsShowInput(true)
  }, [])

  const onCancel = useCallback(() => {
    setIsShowInput(false)
    resetInput()
  }, [])

  return (
    <div>
      {isShowInput 
        ? <InputWrapper>
            <Input
              type="text"
              name={inputName}
              value={inputValue}
              placeholder={placeholder}
              onChange={onChange}
            />
            <EmojiButton
              emojiType="save"
              size="small"
              onClick={onSubmit}
            />
            <EmojiButton
              emojiType="cancel"
              size="small"
              onClick={onCancel}
            />
          </InputWrapper>
        : <EditButton
            onClick={onClickDefaultText}
            title=""
          >
            {defaultText} ✍️
          </EditButton>
      }
    </div>
  )
}

const InputWrapper = styled.div`
  display: flex;
  gap: 5px;
`

const EditButton = styled.button`
  color: var(--font-light-gray);
  font-style: italic;
`

export default EditableText