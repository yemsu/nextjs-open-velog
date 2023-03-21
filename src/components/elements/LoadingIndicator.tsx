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
      <Loader><span>🏃‍♂️</span> <span>🏃‍♂️</span> <span>🏃‍♂️</span></Loader>
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

const Loader = styled.div`
  span:nth-child(3) {
    opacity: 0;
    animation: curtain 3s infinite;
    @keyframes curtain {
      0% {
        opacity: 1;
        transform: translateX(0);
      }
      80% {
        opacity: 1;
        transform: translateX(-6px);
      }
      90% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        transform: translateX(-6px);
      }
    }
  }
  span:nth-child(2) {
    opacity: 0;
    animation: curtain 3s infinite;
    animation-delay: 0.8s;
    @keyframes curtain {
      32% {
        opacity: 0;
      }
      33% {
        opacity: 1;
        transform: translateX(0);
      }
      80% {
        opacity: 1;
        transform: translateX(-6px);
      }
      90% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        transform: translateX(-6px);
      }
    }
  }
  span:nth-child(1) {
    opacity: 0;
    animation: curtain 3s infinite;
    animation-delay: 1.6s;
    @keyframes curtain {
      65% {
        opacity: 0;
      }
      66% {
        opacity: 1;
        transform: translateX(0);
      }
      80% {
        opacity: 1;
        transform: translateX(-6px);
      }
      90% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        transform: translateX(-6px);
      }
    }
  }
`

export default LoadingIndicator