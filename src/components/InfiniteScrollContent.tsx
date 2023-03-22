import { ALERTS } from "@/constants/alerts"
import { ReactNode, useEffect } from "react"
import LoadingIndicator from "./elements/LoadingIndicator"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"

interface InfiniteScrollContentProps {
  children: ReactNode
  isDataFetched: boolean
  hasNodata?: boolean,
  hasNodataMessage?: string,
  isFetchingNextPage: boolean
  isFetching: boolean
  error: {message: string}
  fetchNextPage: () => void
}

function InfiniteScrollContent(props: InfiniteScrollContentProps) {
  const {
    children,
    isDataFetched,
    hasNodata,
    hasNodataMessage,
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

  if(isDataFetched && hasNodata) {
    return <FailedText>
      {hasNodataMessage || '데이터가 없습니다.'}
    </FailedText>
  }
  
  return (
    <>
      {isDataFetched ? children : null}
      {
        <RefElement ref={ref}>
          {
            isFetchingNextPage || isFetching
              ? <LoadingText>
                  데이터를 가져오는 중이예요
                  <LoadingIndicator />
                </LoadingText>
              : null
          }
        </RefElement> 
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

const RefElement = styled.div`
  height: 100px;
`

const FailedText = styled(Text)`
  padding: 100px 0;
`

const LoadingText = styled(Text)`
  padding: 10px;
`

export default InfiniteScrollContent