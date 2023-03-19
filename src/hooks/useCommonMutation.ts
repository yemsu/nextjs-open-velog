import { useMutation } from "@tanstack/react-query"

interface Options<Response, Payload, TError> {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
}

function useCommonMutation<Response, Payload, TError = unknown>(
  mutationFn: (payload: Payload) => Promise<Response>,
  options?: Options<Response, Payload, TError>
) {
  const { onSuccess, onError, onSettled } = options || {};
  return useMutation(
    mutationFn,
    {
      onSuccess: () => {
        onSuccess && onSuccess();
      },
      onError: () => {
        onError && onError();
      },
      onSettled: () => {
        onSettled && onSettled();
      }
    }
  )
}

export default useCommonMutation