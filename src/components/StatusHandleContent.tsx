import { ALERTS } from "@/constants/alerts"
import { ReactNode } from "react"
import LoadingIndicator from "./elements/LoadingIndicator"
import styled from "styled-components"

interface StatusHandleContentProps {
  children: ReactNode
  isDataFetched: boolean
  hasNodata?: boolean,
  hasNodataMessage?: string,
  isLoading: boolean
  error: {message: string}
}

function StatusHandleContent(props: StatusHandleContentProps) {
  const {
    children,
    isDataFetched,
    hasNodata,
    hasNodataMessage,
    isLoading,
    error
  } = props

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
        isLoading
          ? <LoadingText>
              데이터를 가져오는 중이예요
              <LoadingIndicator />
            </LoadingText>
          : null
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

export default StatusHandleContent