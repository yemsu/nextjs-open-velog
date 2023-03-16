import styled from "styled-components"

interface EmojiButtonProps {
  emojiType: 'save' | 'cancel',
  size: 'small',
  onClick: () => void
}

const buttonTitles = {
  save: {
    text: '저장',
    emoji: '✅'
  },
  cancel: {
    text: '취소',
    emoji: '❌'
  }
}

function EmojiButton(props: EmojiButtonProps) {
  const { emojiType, size, onClick } = props

  const { text, emoji } =  buttonTitles[emojiType]
  return (
    <Button
      className={`size-${size}`}
      title={text}
      onClick={onClick}
    >
      { emoji }
    </Button>
  )
}

const Button = styled.button`
  &.size {
    &-small {
      padding: 0 5px;
      font-size: var(--font-size-XS);
    }
  }
`

export default EmojiButton