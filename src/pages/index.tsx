import styled from "styled-components"
import Head from 'next/head'
import useCommonQuery from '@/hooks/useCommonQuery'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { getRankKeywords24Hour } from '@/api/keyword'
import ContentWrapper from '@/components/layouts/ContentWrapper'
import RankKeywords from '@/components/keyword/RankKeywords'
import SearchBox from "@/components/elements/SearchBox"
import TextTitle from "@/components/elements/TextTitle"
import { RankKeyword } from '@/types/keyword'
import { DESCRIPTION, TITLE } from '@/constants/meta'
import { getMetaTitle } from '@/utils'
import TextDeco from "@/components/elements/TextDeco"


function Home() {
  const {
    error: rankKeywordsError,
    data: rankKeywords
  } = useCommonQuery<null, RankKeyword[]>({
    queryKey: QUERY_KEYS.KEYWORD,
    promiseFn: getRankKeywords24Hour
  })
  
  return (
    <>
      <Head>
        <title>{getMetaTitle(TITLE.INDEX)}</title>
        <meta name="description" content={DESCRIPTION.INDEX} />
      </Head>
      <ContentWrapper
        size="full"
        contentType="main"
        bgColor="primary-1"
        title={TITLE.INDEX}
      >
        <KeyVisualArea>
          <TextTitle titleType="main-kv">
            <TextDeco
              color="primary"
              weight="X-bold"
            >843,342</TextDeco>개의 게시글을 
            <br />원하는 키워드로 검색해보세요!
          </TextTitle>
          <AreaSearchBox>
            <SearchBox />
          </AreaSearchBox>
        </KeyVisualArea>
      </ContentWrapper>
      <ContentWrapper
        size="full"
        bgColor="primary-2"
      >
        <ContentWrapper
          size="normal"
        >
          <RankKeywordsArea>
            <RankKeywords
              rankKeywords={rankKeywords}
              isError={!!rankKeywordsError}
            />
          </RankKeywordsArea>
        </ContentWrapper>
      </ContentWrapper>
    </>
  )
}

const KeyVisualArea = styled.section`
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

const RankKeywordsArea = styled.section`
  padding: 50px 0;
`

export default Home