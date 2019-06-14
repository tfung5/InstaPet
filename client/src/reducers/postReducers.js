import { GET_PETS, GET_POSTS, ADD_POST, REMOVE_POST } from "../actions/types";

const initialState = {
  posts: [],
  post: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case REMOVE_POST:
      // TO BE IMPLEMENTED
      return {
        ...state
      };
    default:
      return state;
  }
};