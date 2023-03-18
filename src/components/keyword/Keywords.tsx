import { BUTTON_TITLES } from "@/constants/etc"
import { PAGES } from "@/constants/path"
import { RankKeyword } from "@/types/keyword"
import styled from "styled-components"
import Link from "next/link"

interface KeywordsProps {
  keywords: RankKeyword[]
}

function Keywords(props: KeywordsProps) {
  const { keywords } = props
  return (
    <KeywordListUl>
      {keywords.map(({count, keyword}: RankKeyword, i) => (
        <ListItem key={keyword}>
          <ListLink
            href={PAGES.KEYWORD_SEARCH(keyword)}
            title={BUTTON_TITLES.KEYWORD_LINK}
          >
            <Ranking>{i+1}</Ranking>
            <Keyword>{keyword}</Keyword>
            <Count>{count}회</Count>
          </ListLink>
        </ListItem>
      ))}
    </KeywordListUl>
  )
}

const KeywordListUl = styled.ul`
  background-color: var(--bg-white);
  font-size: var(--font-size-MS);
  border-radius: var(--border-radius-S);
`

const ListItem = styled.li`
  & + & {
    border-top: 1px solid var(--bg-light-gray);
  }
`

const ListLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
`

const Ranking = styled.span`
  width: 10%;
  font-family: var(--font-family);
  font-size: var(--font-size-B);
  color: var(--bg-dark-gray);
  line-height: 1;
`

const Keyword = styled.span`
  width: 70%;
`

const Count = styled.span`
  width: 20%;
  color: hsl(var(--primary-hsl));
  font-size: var(--font-size-S);
  text-align: center;
`

export default Keywords