import styled from "styled-components"
import { RankKeyword } from '@/types/keyword'
import Keywords from "./Keywords"

interface RankKeywordsProps {
  rankKeywords: RankKeyword[] | void
  isError: boolean
}

function RankKeywords(props: RankKeywordsProps) {
  const { rankKeywords, isError } = props

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>키워드 검색 순위 🧐</Title>
        <TitleDesc>최근 24시간 기준</TitleDesc>
      </TitleWrapper>
      {
        isError
          ? <ErrorText>키워드 랭킹 호출에 <br />에러가 발생했습니다..! 😥</ErrorText>
          : rankKeywords
            ? <Keywords keywords={rankKeywords} />
            : null
      }
    </Wrapper>
  )
}

const ContentArea = `
  background-color: var(--bg-white);
  font-size: var(--font-size-MS);
  border-radius: var(--border-radius-S);
`

const Wrapper = styled.div`
  width: 250px;
  padding: 10px;
  border-radius: var(--border-radius-M);
  background-color: var(--bg-light-gray);
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Title = styled.h2`
  font-weight: var(--font-size-title-S);
  font-weight: var(--font-weight-X-bold);
`

const TitleDesc = styled.p`
  font-size: var(--font-size-XXS);
  color: var(--font-gray);
`

const ErrorText = styled.p`
  ${ContentArea}
  padding: 20px 10px;
  font-size: var(--font-size-MS);
  text-align: center;
`

export default RankKeywords