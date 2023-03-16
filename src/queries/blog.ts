import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from 'react-query';
import { getBlog, postBlog } from "@/api/blog"
import { AxiosResponse } from 'axios';
import { BlogPayload, BlogResponse } from '@/types/blog';
import { ErrorResponse } from '@/types/api';

// useQuery에서 사용할 UniqueKey를 상수로 선언하고 export로 외부에 노출합니다.
// 상수로 UniqueKey를 관리할 경우 다른 컴포넌트 (or Custom Hook)에서 쉽게 참조가 가능합니다.
export const QUERY_KEY = '/blogs';

// useQuery에서 사용할 `서버의 상태를 불러오는데 사용할 Promise를 반환하는 함수`
const fetchBlog = (userId: string): Promise<AxiosResponse<BlogResponse>> => {
  return getBlog(userId);
}

const useBlogsQuery = (userId: string) => {
  return useQuery([QUERY_KEY, userId], () => fetchBlog(userId))
};
// useMutation에서 사용할 `서버에 Side Effect를 발생시키기 위해 사용할 함수`
// 이 함수의 파라미터로는 useMutation의 `mutate` 함수의 파라미터가 전달됩니다.
const mutationFetcher = (blog: BlogPayload) => postBlog(blog)

const useBlogMutation = () => {
  // mutation 성공 후 `useTodosQuery`로 관리되는 서버 상태를 다시 불러오기 위한
  // Cache 초기화를 위해 사용될 queryClient 객체
  const queryClient = useQueryClient();

  return useMutation(mutationFetcher, {
    // mutate 요청이 성공한 후 queryClient.invalidateQueries 함수를 통해
    // useTodosQuery에서 불러온 API Response의 Cache를 초기화
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY),
  });
};

export {
  useBlogsQuery,
  useBlogMutation
}