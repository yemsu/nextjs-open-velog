import { ReactNode } from "react"
import styled from "styled-components"
import SearchBox from "./elements/SearchBox"
import TextTitle from "./elements/TextTitle"
import ContentWrapper from "./layouts/ContentWrapper"

interface KeyBannerProps {
  titleNode: ReactNode
  subTitleNode?: ReactNode
  useSearchBox?: boolean
  bgColor?: 'primary-1'
  size?: 'small' | 'medium' | 'large'
}

function KeyBanner(props: KeyBannerProps) {
  const {
    titleNode,
    subTitleNode,
    useSearchBox = false,
    bgColor = 'primary-1',
    size = 'medium'
  } = props
  return (
    <ContentWrapper
      size="full"
      contentType="main"
      bgColor={bgColor}
    >
      <KeyBannerArea className={`size-${size}`}>
        <TextTitle titleType="main-kv">
          {titleNode}
        </TextTitle>
        {
          subTitleNode
            ? <SubTitle>{subTitleNode}</SubTitle>
            : null
        }
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
  &.size {
    &-small {
      height: 10vh;
      min-height: 60px;
    }
    &-medium {
      height: 20vh;
      min-height: 150px;
    }
  }
`

const SubTitle = styled.p`
  margin-top: 10px;
  font-size: var(--font-size-title-S);
`

const AreaSearchBox = styled.div`
  margin-top: 30px;
`
export default KeyBanner