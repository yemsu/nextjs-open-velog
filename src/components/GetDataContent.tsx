import { ALERTS } from "@/constants/alerts"
import { ReactNode } from "react"
import LoadingIndicator from "./elements/LoadingIndicator"
import styled from "styled-components"

interface RequestStatusContentProps {
  children: ReactNode
  isDataFetched: boolean
  isLoading: boolean
  error: {message: string}
}

function RequestStatusContent(props: RequestStatusContentProps) {
  const {
    children,
    isDataFetched,
    isLoading,
    error
  } = props

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

export default RequestStatusContent