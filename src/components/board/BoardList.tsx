import styled from "styled-components"

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
          <BoardInfoList>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">날짜</span>📅</BorderInfoTitle>
              <BorderInfoDesc>2023년 3월 6일</BorderInfoDesc>
            </BorderInfoWrapper>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">조회수</span>👀</BorderInfoTitle>
              <BorderInfoDesc>4</BorderInfoDesc>
            </BorderInfoWrapper>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">좋아요</span>💜</BorderInfoTitle>
              <BorderInfoDesc>2</BorderInfoDesc>
            </BorderInfoWrapper>
          </BoardInfoList>
        </ListItem>
        <ListItem>
          <BoardTitle>React로 결제 페이지 개발하기 (ft. 결제위젯)</BoardTitle>
          <BoardContents>안녕하세요! 결제 페이지 개발하기 포스트에서 받은 뜨거운 반응에 힘을 입어 React 버전으로 돌아왔어요. 이번에도 많은 관심 부탁드려요. 🤗 오늘은 결제 연동을 쉽게 풀어 주는 결제위젯 React 프로젝트를 소개해요! 결제위젯은 한 번 연동하면 다양한 결제 수단과 커스텀 디자인을 노코드(No-code)로 제공하는 서비스입니다.</BoardContents>
          <BoardInfoList>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">날짜</span>📅</BorderInfoTitle>
              <BorderInfoDesc>2023년 3월 6일</BorderInfoDesc>
            </BorderInfoWrapper>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">조회수</span>👀</BorderInfoTitle>
              <BorderInfoDesc>4</BorderInfoDesc>
            </BorderInfoWrapper>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">좋아요</span>💜</BorderInfoTitle>
              <BorderInfoDesc>2</BorderInfoDesc>
            </BorderInfoWrapper>
          </BoardInfoList>
        </ListItem>
        <ListItem>
          <BoardTitle>React로 결제 페이지 개발하기 (ft. 결제위젯)</BoardTitle>
          <BoardContents>안녕하세요! 결제 페이지 개발하기 포스트에서 받은 뜨거운 반응에 힘을 입어 React 버전으로 돌아왔어요. 이번에도 많은 관심 부탁드려요. 🤗 오늘은 결제 연동을 쉽게 풀어 주는 결제위젯 React 프로젝트를 소개해요! 결제위젯은 한 번 연동하면 다양한 결제 수단과 커스텀 디자인을 노코드(No-code)로 제공하는 서비스입니다.</BoardContents>
          <BoardInfoList>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">날짜</span>📅</BorderInfoTitle>
              <BorderInfoDesc>2023년 3월 6일</BorderInfoDesc>
            </BorderInfoWrapper>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">조회수</span>👀</BorderInfoTitle>
              <BorderInfoDesc>4</BorderInfoDesc>
            </BorderInfoWrapper>
            <BorderInfoWrapper>
              <BorderInfoTitle><span className="ir-hidden">좋아요</span>💜</BorderInfoTitle>
              <BorderInfoDesc>2</BorderInfoDesc>
            </BorderInfoWrapper>
          </BoardInfoList>
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

const BoardInfoList = styled.dl`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  font-size: var(--font-size-S);
  color: var(--font-gray);
  line-height: 1;
`

const BorderInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const BorderInfoTitle = styled.dt`
  font-size: var(--font-size-XS);
`

const BorderInfoDesc = styled.dd`
`

export default BoardList