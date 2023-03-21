import { useInfiniteQuery, QueryFunction, UseInfiniteQueryResult } from '@tanstack/react-query';

function useInfiniteScroll<
  Params,
  ResponseData,
  Error,  
>(props: {
  queryKey: string,
  promiseFn: (params: Params) => Promise<ResponseData>,
  params: Params
}): UseInfiniteQueryResult<ResponseData> {
  const { queryKey, promiseFn, params } = props
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ResponseData, Error>(
    [queryKey, params],
    ({ pageParam = 1 }) => promiseFn({
      ...params,
      page: pageParam
    }),
    {
      getNextPageParam: (lastPage: any) => {
        const { totalPages } = lastPage
        const pageNumber = lastPage.pageable?.pageNumber || lastPage.pageNumber
        const nextPage = pageNumber + 2
        return nextPage <= totalPages ? nextPage : undefined
      },
    },
  );

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } as UseInfiniteQueryResult<ResponseData>
};

export default useInfiniteScroll