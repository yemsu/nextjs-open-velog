import { ALERTS } from "@/constants/alerts"
import { ReactNode, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"

interface InfiniteScrollContentProps {
  children: ReactNode
  isDataFetched: boolean
  isFetchingNextPage: boolean
  isFetching: boolean
  error: {message: string}
  fetchNextPage: () => void
}

function InfiniteScrollContent(props: InfiniteScrollContentProps) {
  const {
    children,
    isDataFetched,
    isFetchingNextPage,
    isFetching,
    error,
    fetchNextPage
  } = props
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if(error) {
    return <FailedText>
      {ALERTS.FETCH_FAIL}
      <br /> {error.message}
    </FailedText>
  }

  return (
    <>
      {isDataFetched ? children : null}
      {
        isFetchingNextPage || isFetching
          ? <LoadingText>
              데이터를 가져오는 중이예요 <EmojiWrapper>🏃‍♂️ 🏃‍♂️ 🏃‍♂️</EmojiWrapper>
            </LoadingText>
          : <div ref={ref}></div>
      }
    </>
  )
}

const Text = styled.p`
  margin: 10px 0;
  border-radius: var(--border-radius-S);
  background-color: var(--bg-light-gray);
  text-align: center;
  font-size: var(--font-size-MS);
  color: var(--font-dark-gray);
`

const FailedText = styled(Text)`
  padding: 100px 0;
`

const LoadingText = styled(Text)`
  padding: 10px;
`
const emojiWidthEm = 0.6
const EmojiWrapper = styled.span`
  overflow: hidden;
  position: relative;

  &:after {
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 1;
    width: 100%;
    height: 100%;
    transform: translateX(${emojiWidthEm}em);
    background-color: var(--bg-light-gray);
    content: '';
    animation: curtain 2s infinite linear;
  }

  @keyframes curtain {
    0% {
      transform: translateX(${emojiWidthEm}em);
    }
    33% {
      transform: translateX(${emojiWidthEm}em);
    }
    34% {
      transform: translateX(${emojiWidthEm * 4}em);
    }
    66% {
      transform: translateX(${emojiWidthEm * 4}em);
    }
    67% {
      transform: translateX(${emojiWidthEm * 6}em);
    }
    100% {
      transform: translateX(${emojiWidthEm * 6}em);
    }
  }
`

export default InfiniteScrollContent