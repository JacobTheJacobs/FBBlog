import { AUTH_USER, LOGOUT_USER} from "../types";
import { registerUser, loginUser, autoSignInUser,logoutUser } from "../../api/index";

export const register = (userData) => ({
  type: AUTH_USER,
  payload: registerUser(userData),
});

export const login = (userData) => ({
  type: AUTH_USER,
  payload: loginUser(userData),
});

export const autoSignIn = () => ({
  type: AUTH_USER,
  payload: autoSignInUser(),
});

export const logout = () => ({
  type: LOGOUT_USER,
  payload: logoutUser(),
});
