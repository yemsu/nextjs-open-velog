import { BUTTON_TITLES } from "@/constants/etc"
import { PAGES } from "@/constants/path"
import { RankKeyword } from "@/types/keyword"
import styled from "styled-components"
import Link from "next/link"

interface KeywordsProps {
  keywords: RankKeyword[] | void
  listType?: 'columns' | 'rows'
}

function Keywords(props: KeywordsProps) {
  const { 
    keywords,
    listType = 'columns'
   } = props

  if(!keywords) return null

  return (
    <KeywordListUl className={`list-${listType}`}>
      {keywords.map(({count, keyword}: RankKeyword, i) => (
        <li key={keyword}>
          <Link
            href={PAGES.KEYWORD_SEARCH(keyword)}
            title={`'${keyword}' ${BUTTON_TITLES.KEYWORD_LINK}`}
          >
            <span className="ranking">{i+1}</span>
            <span className="keyword">{keyword}</span>
            <span className="count">{count}회</span>
          </Link>
        </li>
      ))}
    </KeywordListUl>
  )
}

const KeywordListUl = styled.ul`
  overflow: hidden;
  display: grid;
  gap: 10px;
  font-size: var(--font-size-MS);
  li {
    overflow: hidden;
    background-color: var(--bg-white);
    border-radius: var(--border-radius-S);
    a {
      display: flex;
      align-items: center;
      gap: 5px;
      height: 100%;
      span {
        &.ranking {
          font-family: var(--font-family);
          color: var(--bg-dark-gray);
          line-height: 1;
          font-style: italic;
          text-align: center;
        }
        &.keyword {
          overflow: hidden;
          flex: 1;
          text-overflow: ellipsis;
          word-break: keep-all;
        }
        &.count {
          color: hsl(var(--primary-hsl));
          text-align: center;
        }
      }
    }
  }
  &.list {
    &-columns {
      grid-template-columns: repeat(5, 1fr);
      a {
        padding: 8px 0;
        span {
          &.ranking {
            width: 2em;
            font-size: var(--font-size-B);
          }
          &.keyword {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &.count {
            min-width: 4em;
            font-size: var(--font-size-S);
          }
        }
      }
    }
    &-rows {
      grid-template-columns: repeat(1, 1fr);
      li {
        padding: 10px 0;
        border: 1px solid var(--border-light-gray);
        border-radius: var(--border-radius-F);
      }
      a {
        padding: 8px 0;
        span {
          &.ranking {
            width: 4em;
            font-size: var(--font-size-title-M);
          }
          &.keyword {
            display: block;
            margin-left: 20px;
            white-space: nowrap;
            font-size: var(--font-size-title-S);
          }
          &.count {
            min-width: 8em;
            font-size: var(--font-size-B);
          }
        }
      }
    }
  }
`
export default Keywords