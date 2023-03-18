import styled from "styled-components"
import MetaDataList from "@/components/MetaDataList"
import { BoardResponseData } from "@/types/board"
interface ListItemProps {
  boards: BoardResponseData | void
}


function BoardList(props: ListItemProps) {
  const {
    boards
  } = props
  
  if(!boards) return null
  
  return (
    <section>
      <TextReferWrapper>
        <TextRefer><span className="ir-hidden">김말순님이 등록한 글</span> {boards.content.length}개</TextRefer>
      </TextReferWrapper>
      <List>
        {boards.content.map(({
          title,
          content,
          viewCount,
          wishCount,
          createdAt
        }) => (
          <ListItem>
            <BoardTitle>{title}</BoardTitle>
            <BoardContents>{content}</BoardContents>
            <MetaDataList 
              viewCount={viewCount}
              wishCount={wishCount}
              createdAt={createdAt}
            />
          </ListItem>
        ))}
      </List>
    </section>
  )
}

const TextReferWrapper = styled.div`
  margin-bottom: 10px;
`

const TextRefer = styled.p`
  font-size: var(--font-size-S);
  color: var(--font-gray);
  text-align: right;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
`

const ListItem = styled.li`
  padding: 30px 0 40px;
  border-top: 1px solid var(--border-light);
`

const BoardTitle = styled.h3`
  font-size: var(--font-size-title-M);
`

const BoardContents = styled.p`
  overflow: hidden;
  display: -webkit-box;
  margin-top: 6px;
  font-size: var(--font-size-M);
  color: var(--font-dark-gray);
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: keep-all;
`


export default BoardList