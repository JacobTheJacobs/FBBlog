import { ADD_POST, CLEAR_POST, GET_REVIEWS ,GET_REVIEW_BY_ID} from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, addedPost: action.payload };
    case CLEAR_POST:
      return { addedPost: action.payload };
    case GET_REVIEWS:
      return { ...state, adminReviews: action.payload };
      case GET_REVIEW_BY_ID:
        return {...state,reviewById:action.payload}
    default:
      return state;
  }

  
}
