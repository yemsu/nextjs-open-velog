import styled from "styled-components"

interface EmojiButtonProps {
  emojiType: 'save' | 'cancel' | 'search' | 'like' | 'unlike'
  size: 'small' | 'medium' | 'large',
  styleType?: 'none' | 'round',
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
  like: {
    text: '좋아요',
    emoji: '🤍'
  },
  unlike: {
    text: '좋아요 취소',
    emoji: '💚'
  },
}

function EmojiButton(props: EmojiButtonProps) {
  const {
    emojiType,
    size,
    styleType = 'none',
    onClick
  } = props

  const { text, emoji } =  buttonTitles[emojiType]
  return (
    <Button
      className={`size-${size} style-${styleType}`}
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
  &.style {
    &-none {
    }
    &-round {
      border: 1px solid var(--border-gray);
      border-radius: var(--border-radius-F);
      background-color: var(--bg-white);
      &.size-large {
        width: 50px;
        height: 50px;
      }
    }
  }
`

export default EmojiButton