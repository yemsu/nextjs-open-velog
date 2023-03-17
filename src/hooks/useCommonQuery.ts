import { AxiosResponse } from "axios"
import { useQuery } from "react-query"

interface ReturnType<Response> {
  isLoading: boolean
  error: any
  data: Response | void
}

interface Props<Params, Response> {
  queryKey: string
  params: Params
  promiseFn: (params: Params) => Promise<Response | void>
  enabledChecker: boolean
  successFn?: () => void
}

function useCommonQuery<Params, Response>(
  props: Props<Params, Response>
): ReturnType<Response> {
  const { queryKey, params, promiseFn, enabledChecker, successFn } = props
  const { isLoading, error, data } = useQuery(
    [queryKey, params],
    () => promiseFn(params),
    {
      staleTime: 60 * 1000 * 5,
      enabled: !!enabledChecker,
      refetchOnWindowFocus: false,
      onSuccess: successFn,
    }
  )
  return { isLoading, error, data }
}

export default useCommonQuery