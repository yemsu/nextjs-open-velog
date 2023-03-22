import styled from "styled-components"
import Background from "@/components/elements/Background";
import ContentWrapper from "@/components/layouts/ContentWrapper";
import KeyBanner from "@/components/KeyBanner";
import TrendingOptions from "@/components/trending/TrendingOptions";
import useInputs from "@/hooks/useInputs";
import { useCallback, useState } from "react";
import { getMetaTitle, toDateString } from "@/utils";
import useCommonQuery from "@/hooks/useCommonQuery";
import { KeywordTrendParams, RankKeyword, AgeRanges, Genders } from "@/types/keyword";
import { getKeywordTrend } from "@/api/rank";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import StatusHandleContent from "@/components/StatusHandleContent";
import Keywords from "@/components/keyword/Keywords";
import Head from "next/head";
import { META } from "@/constants/meta";
import IrText from "@/components/elements/IrText";
import TextDeco from "@/components/elements/TextDeco";

function TrendingKeyword() {
  const [date, setDate] = useState<Date>(new Date('2023-03-20'))
  const [forms, onChange] = useInputs<{
    ageRange: AgeRanges,
    gender: Genders
  }>({
    ageRange: 'TO19',
    gender: 'F'
  })
  const {
    error: getKeywordError,
    data: keywords,
    isLoading,
  } = useCommonQuery<KeywordTrendParams, RankKeyword[]>({
    queryKey: QUERY_KEYS.TREND_KEYWORD,
    promiseFn: getKeywordTrend, 
    params: {
      ageRange: forms.ageRange,
      gender: forms.gender,
      date: toDateString(date),
      limit: 10
    }, 
    enabledChecker: !!(forms.ageRange && forms.gender && date)
  })

  const queryClient = useQueryClient()
  const onSubmit = useCallback(() => {
    queryClient.refetchQueries([QUERY_KEYS.TREND_KEYWORD])
  }, [queryClient])

  const KeyBannerSubTitle = (<>
    {
      keywords
        ? <>
            <TextDeco color="primary" weight="X-bold">{keywords.length}</TextDeco>개의 키워드
          </>
        : null
    }
  </>)

  return (
    <>
      <Head>
        <title>{getMetaTitle(META.TREND_KEYWORD.TITLE)}</title>
        <meta name="description" content={META.TREND_KEYWORD.DESC} />
      </Head>
      <KeyBanner
        titleNode={META.TREND_KEYWORD.TITLE}
        subTitleNode={KeyBannerSubTitle}
        size="small"
      />
      <TrendingOptions
        forms={forms}
        onChange={onChange}
        date={date}
        setDate={setDate}
        onSubmit={onSubmit}
      />
      <ContentWrapper
        size="narrow"
        contentType="last-content"
      >
        <StatusHandleContent
          isDataFetched={!!keywords}
          hasNodata={keywords?.length === 0}
          hasNodataMessage="조건에 맞는 인기 검색어가 없습니다."
          isLoading={isLoading}
          error={getKeywordError}
        >
          <section>
            <IrText text="인기 검색어 리스트" />
            <Keywords keywords={keywords} listType="rows" />
          </section>
        </StatusHandleContent>
      </ContentWrapper>
    </>
  )
}

export default TrendingKeyword