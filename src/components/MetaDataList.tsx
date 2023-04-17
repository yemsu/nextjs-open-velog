import { toDateString } from "@/utils"
import React from "react"
import styled from "styled-components"
import IrText from "./elements/IrText"

type MetaTitles = 'createdAt' | 'viewCount' | 'wishCount'

interface MetaDataListProps {
  dataObj: {
    createdAt?: string
    viewCount?: number
    wishCount?: number
  }
  align?: 'left' | 'center' | 'right'
}

interface InfoObj {
  [key: string]: {
    title: string,
    emoji: string
  }
}

const infoObj: InfoObj = {
  createdAt: {
    title: '작성일',
    emoji: '📅'
  },
  viewCount: {
    title: '조회수',
    emoji: '👀'
  },
  wishCount: {
    title: '좋아요',
    emoji: '🤍'
  },
}

const infoSeq: MetaTitles[] = ['createdAt', 'viewCount', 'wishCount']

function MetaDataList(props: MetaDataListProps) {
  const {
    dataObj,
    align = 'left'
  } = props
  
  if(!dataObj) return null

  return (
    <MetaDataListDl className={`align-${align}`}>
      {infoSeq.map((key) => (
        dataObj[key] === undefined ? null
          : <ListItem key={key}>
              <Title title={infoObj[key].title}>
                <IrText
                  text={infoObj[key].title}
                  tagName="span"
                />
                {infoObj[key].emoji}
              </Title>
              <Desc>{
                ['createdAt'].includes(key)
                  ? toDateString(dataObj[key] as string)
                  : dataObj[key]
              }</Desc>
            </ListItem>
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
  &.align {
    &-center {
      justify-content: center;
    }
    &-right {
      justify-content: flex-end;
    }
  }
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