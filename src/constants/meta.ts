import { APP_TITLE } from "./etc"

export const TITLE = {
  COMMON: APP_TITLE,
  INDEX: `메인`,
  WRITE: `새 글쓰기`,
  BLOG: (userID: number) => `${userID}님의 블로그`,
  SEARCH: (keyword: string) => `'${keyword}'에 대한 검색 결과`,
  BLOG_RANK: '실시간 블로그 순위 🔥',
  BLOG_VIEW_COUNT: '실시간 블로그 순위 🔥',
}

export const DESCRIPTION = {
  INDEX: `블로그 플랫폼 ${APP_TITLE}`,
  WRITE: '새 블로그 글을 작성하실 수 있습니다.',
  BLOG: (userID: number) => `${userID}님의 블로그 페이지 입니다.`,
  SEARCH: (keyword: string) => `'${keyword}'에 대한 검색 결과 페이지 입니다.`,
  BLOG_RANK: `실시간 블로그 순위를 확인할 수 있는 페이지 입니다. 조회수 높은순, 좋아요 많은순 중 원하시는 정렬을 선택하여 확인하실 수 있습니다.`,
}