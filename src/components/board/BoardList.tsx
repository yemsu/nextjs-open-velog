import styled from "styled-components"
import MetaDataList from "@/components/MetaDataList"
interface ListItemProps {

}

function BoardList(props: ListItemProps) {
  return (
    <section>
      <TextReferWrapper>
        <TextRefer><span className="ir-hidden">김말순님이 등록한 글</span>  99개</TextRefer>
      </TextReferWrapper>
      <List>
        <ListItem>
          <BoardTitle>React로 결제 페이지 개발하기 (ft. 결제위젯)</BoardTitle>
          <BoardContents>안녕하세요! 결제 페이지 개발하기 포스트에서 받은 뜨거운 반응에 힘을 입어 React 버전으로 돌아왔어요. 이번에도 많은 관심 부탁드려요. 🤗 오늘은 결제 연동을 쉽게 풀어 주는 결제위젯 React 프로젝트를 소개해요! 결제위젯은 한 번 연동하면 다양한 결제 수단과 커스텀 디자인을 노코드(No-code)로 제공하는 서비스입니다.결제위젯은 한 번 연동하면 다양한 결제 수단과 커스텀 디자인을 노코드(No-code)로 제공하는 서비스입니다.</BoardContents>
          <MetaDataList 
            viewCount={5}
            wishCount={3}
            createdAt="2023-03-06"
          />
        </ListItem>
        <ListItem>
          <BoardTitle>React로 결제 페이지 개발하기 (ft. 결제위젯)</BoardTitle>
          <BoardContents>안녕하세요! 결제 페이지 개발하기 포스트에서 받은 뜨거운 반응에 힘을 입어 React 버전으로 돌아왔어요. 이번에도 많은 관심 부탁드려요. 🤗 오늘은 결제 연동을 쉽게 풀어 주는 결제위젯 React 프로젝트를 소개해요! 결제위젯은 한 번 연동하면 다양한 결제 수단과 커스텀 디자인을 노코드(No-code)로 제공하는 서비스입니다.</BoardContents>
          <MetaDataList 
            viewCount={5}
            wishCount={3}
            createdAt="2023-03-06"
          />
        </ListItem>
        <ListItem>
          <BoardTitle>React로 결제 페이지 개발하기 (ft. 결제위젯)</BoardTitle>
          <BoardContents>안녕하세요! 결제 페이지 개발하기 포스트에서 받은 뜨거운 반응에 힘을 입어 React 버전으로 돌아왔어요. 이번에도 많은 관심 부탁드려요. 🤗 오늘은 결제 연동을 쉽게 풀어 주는 결제위젯 React 프로젝트를 소개해요! 결제위젯은 한 번 연동하면 다양한 결제 수단과 커스텀 디자인을 노코드(No-code)로 제공하는 서비스입니다.</BoardContents>
          <MetaDataList 
            viewCount={5}
            wishCount={3}
            createdAt="2023-03-06"
          />
        </ListItem>
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
  padding: 40px 0;
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