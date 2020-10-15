import { ADD_POST, CLEAR_POST, GET_REVIEWS } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, addedPost: action.payload };
    case CLEAR_POST:
      return { addedPost: action.payload };
    case GET_REVIEWS:
      return { ...state, adminReviews: action.payload };
    default:
      return state;
  }
}
