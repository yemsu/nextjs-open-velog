import { ALERTS } from "@/constants/alerts"
import { ReactNode, useEffect } from "react"
import LoadingIndicator from "./elements/LoadingIndicator"
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
              <LoadingIndicator />
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

export default InfiniteScrollContent