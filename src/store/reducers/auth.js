import { AUTH_USER } from "../types";

const initialState = {
  isAuth: false,
  user: null,
  checkingAuth: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...action.payload, checkingAuth: true };
    default:
      return state;
  }
}
