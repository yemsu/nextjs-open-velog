import { getBoardSearch } from "@/api/board"
import ContentWrapper from "@/components/layouts/ContentWrapper"
import { META } from "@/constants/meta"
import { QUERY_KEYS } from "@/constants/queryKeys"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"
import { BoardResponseData, GetBoardSearchParams } from "@/types/board"
import { getMetaTitle } from "@/utils"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import BoardList from "@/components/board/BoardList"
import { useQueryClient } from "@tanstack/react-query"
import InfiniteScrollContent from "@/components/InfiniteScrollContent"
import KeyBanner from "@/components/KeyBanner"
import TextDeco from "@/components/elements/TextDeco"

function Search() {
  const route = useRouter()
  const keyword = route.query.keyword as string
  const queryClient = useQueryClient()
  const {
    error: searchResultError,
    data: searchResult,
    fetchNextPage,
    isFetching,
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
        <title>{getMetaTitle(META.SEARCH.TITLE(keyword))}</title>
        <meta name="description" content={META.SEARCH.DESC(keyword)} />
      </Head>
      <KeyBanner
        titleNode={<KeyBannerTitleNode keyword={keyword}
        resultTotalNumber={searchResult?.pages[0].totalElements} />}
        useSearchBox={true}
      />
      <ContentWrapper
        size="narrow"
      >
        {
          <InfiniteScrollContent
            isDataFetched={!!searchResult}
            isFetchingNextPage={isFetchingNextPage}
            isFetching={isFetching}
            error={searchResultError as Error}
            fetchNextPage={fetchNextPage}
          >
            <BoardList
              boards={searchResult?.pages.flatMap(({content}) => content)}
              boardTitle={`${keyword}와 관련된 게시글 리스트`}
            />
          </InfiniteScrollContent>
        }
      </ContentWrapper>
    </>
  )
}

function KeyBannerTitleNode(props: {
  keyword: string,
  resultTotalNumber: number | undefined
}) {
  const {
    keyword,
    resultTotalNumber,
  } = props

  return (
    <>
      <TextDeco color="primary" weight="X-bold">{keyword}</TextDeco>에 대한 
      {
        resultTotalNumber
          ? <> <TextDeco color="primary" weight="X-bold">{resultTotalNumber}</TextDeco>개의 글이 있습니다</>
          : ' 검색 결과'
      }
    </>
  )
}

export default Search