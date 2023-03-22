export const SERVICES = {
  MEMBER: 'members',
  BLOG: 'blogs',
  BLOG_VIEW_COUNT: '/blogs/view-count',
  BOARD: 'boards',
  BOARD_WISH: 'board/wished',
  RANK: 'rank/keyword',
  KEYWORD: 'keywords',
}

export const PAGES = {
  MAIN: '/',
  BLOG: '/blog',
  USER_BLOG: (userId: string) => `/${userId}`,
  BLOG_WRITE: `/write`,
  KEYWORD_SEARCH: (keyword: string) => `/search?keyword=${keyword}`,
  BOARD: (boardId: number) => `/boards/${boardId}`,
  BLOG_VIEW_COUNT: '/blogs?sort=views',
  BLOG_LIKE_COUNT: '/blogs?sort=likes',
}