import styled from "styled-components"
import Head from 'next/head'
import useCommonQuery from '@/hooks/useCommonQuery'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { getRankKeywords24Hour } from '@/api/keyword'
import ContentWrapper from '@/components/layouts/ContentWrapper'
import RankKeywords from '@/components/keyword/RankKeywords'
import KeyBanner from "@/components/KeyBanner"
import { RankKeyword } from '@/types/keyword'
import { DESCRIPTION, TITLE } from '@/constants/meta'
import { getMetaTitle } from '@/utils'
import TextDeco from "@/components/elements/TextDeco"


function Home() {
  const {
    error: rankKeywordsError,
    data: rankKeywords,
    isLoading
  } = useCommonQuery<null, RankKeyword[]>({
    queryKey: QUERY_KEYS.RANK_KEYWORD,
    promiseFn: getRankKeywords24Hour
  })

  const KeyBannerTitleNode = (<>
    <TextDeco
      color="primary"
      weight="X-bold"
    >843,342</TextDeco>개의 게시글을 
    <br />원하는 키워드로 검색해보세요!
  </>)
  
  return (
    <>
      <Head>
        <title>{getMetaTitle(TITLE.INDEX)}</title>
        <meta name="description" content={DESCRIPTION.INDEX} />
      </Head>
      <KeyBanner
        title={TITLE.INDEX}
        titleNode={KeyBannerTitleNode}
        useSearchBox={true}
      />
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
              error={rankKeywordsError as Error}
              isLoading={isLoading}
            />
          </RankKeywordsArea>
        </ContentWrapper>
      </ContentWrapper>
    </>
  )
}


const RankKeywordsArea = styled.section`
  padding: 50px 0;
`

export default Home