const COMMON_ERROR_ALERTS = '문제가 지속되면 개발자에게 문의해주세요 😥'

interface Alerts {
  [key: string]: any
}

export const ALERTS: Alerts = {
  AUTH: {
    NEED_LOGIN: '로그인이 필요한 기능입니다.'
  },
  FETCH_FAIL: `데이터 호출에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  POST_BOARD_SUCCESS: '글이 등록 되었습니다! 🎉',
  POST_BOARD_ERROR: `글 등록에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  PUT_BLOG_SUCCESS: '블로그 소개글이 변경되었습니다!',
  PUT_BLOG_ERROR: `블로그 소개글 변경에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  GET_BLOG: {
    ERROR: `블로그 데이터 호출에 실패하였습니다.  ${COMMON_ERROR_ALERTS}`,
  },
  GET_BOARD: {
    ERROR: `게시글 데이터 호출에 실패하였습니다.  ${COMMON_ERROR_ALERTS}`,
  },
  PUT_BOARD: {
    SUCCESS: '게시글 수정이 완료되었습니다.',
    ERROR: `게시글 수정에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  },
  POST_BOARD: {
    SUCCESS: '글이 등록 되었습니다! 🎉',
    ERROR: `글 등록에 실패하였습니다. ${COMMON_ERROR_ALERTS}`
  },
  DELETE_BOARD: {
    CONFIRM: `게시글을 삭제하시겠어요?`,
    SUCCESS: `게시글이 삭제되었습니다.`,
    ERROR: `게시글 삭제에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  },
  LIKE_BOARD: {
    ERROR: `게시글 좋아요 설정에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  },
}