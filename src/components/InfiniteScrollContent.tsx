import { ALERTS } from "@/constants/alerts"
import { ReactNode, useEffect, useState } from "react"
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
              데이터를 가져오는 중이예요
              <EmojiWrapper>
                <span>🏃‍♂️</span> <span>🏃‍♂️</span> <span>🏃‍♂️</span>
              </EmojiWrapper>
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: 10px;
  font-size: 18px;
  span:nth-child(3) {
    opacity: 0;
    animation: curtain 3s infinite;
    @keyframes curtain {
      0% {
        opacity: 1;
        transform: translateX(0);
      }
      100% {
        opacity: 1;
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
      100% {
        opacity: 1;
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
      100% {
        opacity: 1;
        transform: translateX(-6px);
      }
    }
  }
  /* @keyframes curtain {
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
  } */
`

export default InfiniteScrollContent