import { APP_TITLE } from "./etc"

export const TITLE = {
  COMMON: APP_TITLE,
  INDEX: `메인`,
  WRITE: `새 글쓰기`,
  BLOG: (userID: number) => `${userID}님의 블로그`
}

export const DESCRIPTION = {
  INDEX: `블로그 플랫폼 ${APP_TITLE}`,
  WRITE: '새 블로그 글을 작성하실 수 있습니다.',
  BLOG: (userID: number) => `${userID}님의 블로그 페이지 입니다.`
}