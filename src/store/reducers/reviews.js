import { ADD_POST, CLEAR_POST, GET_REVIEWS,DELETE_POST ,GET_REVIEW_BY_ID,FETCH_POSTS} from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, addedPost: action.payload };
    case CLEAR_POST:
      return { addedPost: action.payload,reviewById:action.payload };
    case GET_REVIEWS:
      return { ...state, adminReviews: action.payload };
      case GET_REVIEW_BY_ID:
        return {...state,reviewById:action.payload}
    case FETCH_POSTS:
      return {...state,posts:action.payload}
      case DELETE_POST:
      return {...state,posts:action.payload}
    default:
      return state;
  }

  
}
