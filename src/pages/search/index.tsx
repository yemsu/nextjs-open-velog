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
import { useInView } from 'react-intersection-observer'
import BoardList from "@/components/board/BoardList"
import styled from "styled-components"
import { useQueryClient } from "@tanstack/react-query"

function Search() {
  const { ref, inView } = useInView()
  const route = useRouter()
  const keyword = route.query.keyword as string
  const queryClient = useQueryClient()
  const {
    error: searchResultError,
    data: searchResult,
    fetchNextPage,
    hasNextPage,
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

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [keyword, inView])

  if(searchResultError) {
    return <p>검색 결과 에러</p>
  }

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
          searchResult
            ? <>
                <BoardList
                  boards={searchResult?.pages.flatMap(({content}) => content)}
                />
                <p ref={ref}>
                  {
                    isFetchingNextPage
                      ? 'Loading more...'
                      : hasNextPage 
                        ? 'Load Newer'
                        : 'Nothing more to load'
                  }
                </p>
              </>
            : null
        }
      </ContentWrapper>
    </>
  )
}

export default Search