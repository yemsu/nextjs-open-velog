import React from "react"
import styled from "styled-components"

interface MetaDataListProps {
  [key: string]: string | number
}

const mapTitles = [
  ['createdAt', '작성일', '📅'],
  ['viewCount', '조회수', '👀'],
  ['wishCount', '좋아요', '❤️']
]

function MetaDataList(props: MetaDataListProps) {
  console.log('props', Object.keys(props))
  return (
    <MetaDataListDl>
      {mapTitles.map(([key, title, emoji]) => (
        props[key] !== undefined
        ? <ListItem key={key}>
            <Title title={title}>
              <span className="ir-hidden">{title}</span>
              {emoji}
            </Title>
            <Desc>{props[key]}</Desc>
          </ListItem>
        : null
      ))}
    </MetaDataListDl>
  )
}

const MetaDataListDl = styled.dl`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  font-size: var(--font-size-S);
  color: var(--font-gray);
  line-height: 1;
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Title = styled.dt`
  font-size: var(--font-size-XXS);
  filter: saturate(.8);
  cursor: pointer;
`

const Desc = styled.dd`
`

export default React.memo(MetaDataList)