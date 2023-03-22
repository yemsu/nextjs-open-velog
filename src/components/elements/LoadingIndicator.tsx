import styled from "styled-components"

interface LoadingIndicatorProps {
  size?: 'normal' | 'full'
}

function LoadingIndicator(props: LoadingIndicatorProps) {
  const {
    size = 'normal'
  } = props
  return (
    <EmojiWrapper className={`size-${size}`}>
      <Loader>
        <span>🏃‍♂️</span>
        <span>🏃‍♂️</span>
        <span>🏃‍♂️</span>
        <span>🏃‍♂️</span>
        <span>🏃‍♂️</span>
      </Loader>
    </EmojiWrapper>
  )
}

const EmojiWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: 10px;
  font-size: 18px;
  &.size {
    &-full {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--bg-dimmed);
      font-size: 30px;
    }
  }
`

const totalDuration = 2.5
const emojiNumber = 5
const eachDuration = totalDuration / emojiNumber
const Loader = styled.span`
  display: flex;
  margin: 5px;
  padding: 0px 10px;
  border-radius: var(--border-radius-F);
  background-color: hsla(var(--white-hsl), .5);
  span {
    opacity: 0;
    animation: curtain ${totalDuration}s infinite;
    &:nth-child(1) {
      animation-delay: ${eachDuration * 4}s;
    }
    &:nth-child(2) {
      animation-delay: ${eachDuration * 3}s;
    }
    &:nth-child(3) {
      animation-delay: ${eachDuration * 2}s;
    }
    &:nth-child(4) {
      animation-delay: ${eachDuration}s;
    }
    &:nth-child(5) {
      opacity: 1;
      animation-fill-mode: forwards;
    }
  }
  @keyframes curtain {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    70% {
      transform: translateX(-5px);
    }
    75% {
      opacity: 0;
      transform: rotate(-15deg);
    }
    100% {
      opacity: 0;
      transform: translateX(-5px);
    }
  }
`

export default LoadingIndicator