import { AUTH_USER } from "../types";
import { registerUser, loginUser } from "../../api/index";

export const register = (userData) => ({
  type: AUTH_USER,
  payload: registerUser(userData),
});

export const login = (userData) => ({
  type: AUTH_USER,
  payload: loginUser(userData),
});
