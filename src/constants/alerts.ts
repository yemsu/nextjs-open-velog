const COMMON_ERROR_ALERTS = '문제가 지속되면 개발자에게 문의해주세요 😥'
export const ALERTS = {
  POST_BOARD_SUCCESS: '글이 등록 되었습니다! 🎉',
  POST_BOARD_ERROR: `글 등록에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  PUT_BLOG_SUCCESS: '블로그 소개글이 변경되었습니다!',
  PUT_BLOG_ERROR: `블로그 소개글 변경에 실패하였습니다. ${COMMON_ERROR_ALERTS}`,
  GET_BLOG: {
    ERROR: `블로그 데이터 호출에 실패하였습니다.  ${COMMON_ERROR_ALERTS}`,
  }
}