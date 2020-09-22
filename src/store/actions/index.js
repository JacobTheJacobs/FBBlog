import { AUTH_USER } from "../types";
import { registerUser } from "../../api/index";

export const register = (userData) => ({
  type: AUTH_USER,
  payload: registerUser(userData),
});
