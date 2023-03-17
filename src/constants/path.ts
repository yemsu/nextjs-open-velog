export const SERVICES = {
  MEMBER: 'members',
  BLOG: 'blogs',
  BOARD: 'boards',
  BOARD_WISH: 'board/wished',
  RANK: 'rank/keyword',
  KEYWORD: 'keywords'
}

export const PAGES = {
  MAIN: '/',
  BLOG: '/blog',
  USER_BLOG: (userId: string): string => `${PAGES.BLOG}/${userId}`,
}