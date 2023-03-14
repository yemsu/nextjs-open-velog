import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: string,
  title: string,
  regDt: string,
  description: string
}

/* 액션 타입 만들기 */

// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.

// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줍니다.
const SET_POSTS = 'posts/SET_POSTS' as const
const ADD = 'posts/ADD' as const
const DELETE = 'posts/DELETE' as const

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.


// 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일합니다
// 이는 FSA (https://github.com/redux-utilities/flux-standard-action) 라는 규칙인데
// 이 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어 추후 다룰 때도 편하고
// 읽기 쉽고, 액션 구조를 일반화함으로써 액션에 관련돤 라이브러리를 사용 할 수 있게 해줍니다.
// 다만, 무조건 꼭 따를 필요는 없습니다.
export const setPosts = (posts: Post[]) => ({ type: SET_POSTS, payload: posts });
export const addPost = (post: Post) => ({ type: ADD, payload: post });
export const deletePost = (postId: string) => ({ type: DELETE, payload: postId });

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type PostsAction =
  | ReturnType<typeof setPosts>
  | ReturnType<typeof addPost>
  | ReturnType<typeof deletePost>

interface PostsState {
  posts: Post[]
}

/* 초기 상태 선언 */
const initialState: PostsState = {
  posts: []
}

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.

// 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성하세요.
// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
function posts(
  state: PostsState = initialState,
  action: PostsAction
): PostsState {
  const { posts } = state
  switch (action.type) {
    case SET_POSTS: // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인 할 수 있습니다.
      return { posts: action.payload }
    case ADD:
      return { posts: posts.concat([action.payload]) }
    case DELETE:
      return { posts: posts.filter(({id}: {id: string}) => id !== action.payload) }
    default:
      return state;
  }
}

export default posts;