import styled from "styled-components"

interface EmojiButtonProps {
  emojiType: 'save' | 'cancel' | 'search'
  size: 'small' | 'medium' | 'large',
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
  },
  search: {
    text: '검색',
    emoji: '🔍'
  },
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
    &-large {
      padding: 0 5px;
      font-size: var(--font-size-title-M);
    }
  }
`

export default EmojiButton