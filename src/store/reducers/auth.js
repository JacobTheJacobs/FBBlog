import { AUTH_USER, LOGOUT_USER } from "../types";

const initialState = {
  isAuth: false,
  user: null,
  checkingAuth: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...action.payload, checkingAuth: true };
    case LOGOUT_USER:
      return { ...state, user: null, isAuth: false };
    default:
      return state;
  }
}
