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
            title={`'${keyword}' ${BUTTON_TITLES.KEYWORD_LINK}`}
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
  overflow: hidden;
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
  height: 100%;
  padding: 8px 0;
`

const Ranking = styled.span`
  width: 2em;
  font-family: var(--font-family);
  font-size: var(--font-size-B);
  color: var(--bg-dark-gray);
  line-height: 1;
  font-style: italic;
  text-align: center;
`

const Keyword = styled.span`
  overflow: hidden;
  display: -webkit-box;
  flex: 1;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`

const Count = styled.span`
  min-width: 4em;
  color: hsl(var(--primary-hsl));
  font-size: var(--font-size-S);
  text-align: center;
`

export default Keywords