import styled from "styled-components"
import Input from "@/components/elements/Input"
import IrText from "./IrText"
import useInputs from "@/hooks/useInputs"
import EmojiButton from "./EmojiButton"
import { useCallback } from "react"
import { useRouter } from "next/router"
import { PAGES } from "@/constants/path"
import checkValidations from "@/utils/validation"

interface SearchBoxProps {

}

function SearchBox(props: SearchBoxProps) {
  const [forms, onChange, reset] = useInputs({
    searchKeyword: ''
  })

  const router = useRouter()
  const onClickSearch = useCallback(() => {
    const { searchKeyword } = forms
    const hasInvalidData = checkValidations({
      searchKeyword: !!searchKeyword
    })
    if(hasInvalidData) return

    reset()
    router.push(PAGES.KEYWORD_SEARCH(searchKeyword.trim()))
  }, [forms, reset, router])

  return (
    <SearchBoxSection>
      <IrText text="키워드 검색" />
      <SearchInput>
        <Input
          type="text"
          name="searchKeyword"
          value={forms.searchKeyword}
          size="big"
          onChange={onChange}
          onEnter={onClickSearch}
        />
      </SearchInput>
      <SearchButtonBox>
        <EmojiButton
          emojiType="search"
          size="large"
          onClick={onClickSearch}
        />
      </SearchButtonBox>
    </SearchBoxSection>
  )
}

const SearchBoxSection = styled.section`
  position: relative;
`

const SearchInput = styled.div`
  width: 550px;
  input {
    border-radius: var(--border-radius-F);
    padding: 0 60px 0 30px;
  }
` 

const SearchButtonBox = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`

export default SearchBox