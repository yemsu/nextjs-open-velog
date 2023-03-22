import { APP_TITLE } from "./etc"

export const META = {
  COMMON: {
    TITLE: APP_TITLE,
    DESC: '',
  },
  INDEX: {
    TITLE: `메인`,
    DESC: `블로그 플랫폼 ${APP_TITLE}`
  },
  WRITE: {
    TITLE: `새 글쓰기`,
    DESC: '새 블로그 글을 작성하실 수 있습니다.'
  },
  BLOG: {
    TITLE: (userID: number) => `${userID}님의 블로그`,
    DESC: (userID: number) => `${userID}님의 블로그 페이지 입니다.`
  },
  SEARCH: {
    TITLE: (keyword: string) => `'${keyword}'에 대한 검색 결과`,
    DESC: (keyword: string) => `'${keyword}'에 대한 검색 결과 페이지 입니다.`
  },
  BLOG_RANK: {
    TITLE: '실시간 블로그 순위',
    DESC: `실시간 블로그 순위를 확인할 수 있는 페이지 입니다. 조회수 높은순, 좋아요 많은순 중 원하시는 정렬을 선택하여 확인하실 수 있습니다.`
  },
  TREND_KEYWORD: {
    TITLE: '인기 검색어',
    DESC: `날짜, 나이, 성별에 따른 인기 검색어를 확인하실 수 있습니다.`
  },
}
