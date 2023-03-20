import { getBoardSearch } from "@/api/board"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import { DESCRIPTION, TITLE } from "@/constants/meta"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { BoardResponseData, GetBoardSearchParams } from "@/types/board"
import { getMetaTitle } from "@/utils"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import BoardList from "@/components/board/BoardList"
import styled from "styled-components"
import { useQueryClient } from "@tanstack/react-query"
import InfiniteScrollContent from "@/components/InfiniteScrollContent"

function Search() {
  const route = useRouter()
  const keyword = route.query.keyword as string
  const queryClient = useQueryClient()
  const {
    error: searchResultError,
    data: searchResult,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteScroll<GetBoardSearchParams, BoardResponseData, any>({
    queryKey: QUERY_KEYS.BOARDS_SEARCH,
    promiseFn: getBoardSearch,
    params: {
      keyword,
      size: 10,
      page: 1
    }
  })

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.RANK_KEYWORD]
    })
  }, [keyword])

  return (
    <>
      <Head>
        <title>{getMetaTitle(TITLE.SEARCH(keyword))}</title>
        <meta name="description" content={DESCRIPTION.SEARCH(keyword)} />
      </Head>
      <ContentWrapper
        size="narrow"
        contentType="main"
      >
        <h2>{keyword}에 대한 {searchResult?.pages[0].totalElements}개의 검색결과</h2>
        {
          <InfiniteScrollContent
            isDataFetched={!!searchResult}
            isFetchingNextPage={isFetchingNextPage}
            isError={!!searchResultError}
            fetchNextPage={fetchNextPage}
          >
            <BoardList
              boards={searchResult?.pages.flatMap(({content}) => content)}
            />
          </InfiniteScrollContent>
        }
      </ContentWrapper>
    </>
  )
}

export default Search