import { SyntheticEvent, useCallback, useState } from "react";

type useInputs<T> = [
  T,
  (e: SyntheticEvent) => void,
  () => void
]

function useInputs<T>(initialForm: T): useInputs<T> {
  const [forms, setForm] = useState(initialForm)

  const onChange = useCallback((e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const reset = useCallback(() => {
    setForm(initialForm)
  }, [initialForm])

  return [forms, onChange, reset]
}

export default useInputs