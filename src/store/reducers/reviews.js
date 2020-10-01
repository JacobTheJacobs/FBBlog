import { ADD_POST } from "../types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state, addedPost: action.payload };
    default:
      return state;
  }
}
