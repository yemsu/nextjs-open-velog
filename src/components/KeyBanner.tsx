import { ReactNode } from "react"
import styled from "styled-components"
import SearchBox from "./elements/SearchBox"
import TextTitle from "./elements/TextTitle"
import ContentWrapper from "./layouts/ContentWrapper"

interface KeyBannerProps {
  title?: string
  titleNode: ReactNode
  useSearchBox?: boolean
  bgColor?: 'primary-1'
}

function KeyBanner(props: KeyBannerProps) {
  const {
    title,
    titleNode,
    useSearchBox = false,
    bgColor = 'primary-1'
  } = props
  return (
    <ContentWrapper
      size="full"
      contentType="main"
      bgColor={bgColor}
      title={title}
    >
      <KeyBannerArea>
        <TextTitle titleType="main-kv">
          {titleNode}
        </TextTitle>
        {
          useSearchBox
          && <AreaSearchBox>
              <SearchBox />
            </AreaSearchBox>
        }
      </KeyBannerArea>
    </ContentWrapper>
  )
}

const KeyBannerArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  min-height: 150px;
`

const AreaSearchBox = styled.div`
  margin-top: 30px;
`
export default KeyBanner