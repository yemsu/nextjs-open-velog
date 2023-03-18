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
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  font-size: var(--font-size-MS);
`

const ListItem = styled.li`
  background-color: var(--bg-white);
  border-radius: var(--border-radius-S);
`

const ListLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
`

const Ranking = styled.span`
  width: 1.5em;
  font-family: var(--font-family);
  font-size: var(--font-size-B);
  color: var(--bg-dark-gray);
  line-height: 1;
  font-style: italic;
`

const Keyword = styled.span`
  flex: 1;
`

const Count = styled.span`
  min-width: 3em;
  color: hsl(var(--primary-hsl));
  font-size: var(--font-size-S);
  text-align: center;
`

export default Keywords