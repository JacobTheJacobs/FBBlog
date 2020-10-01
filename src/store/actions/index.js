import { AUTH_USER, LOGOUT_USER, ADD_POST } from "../types";
import {
  registerUser,
  loginUser,
  autoSignInUser,
  logoutUser,
  updateProfileUser,
  addPostUser,
} from "../../api/index";

//=======AUTH
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

export const updateProfile = (formData, isEmailChanged) => ({
  type: AUTH_USER,
  payload: updateProfileUser(formData, isEmailChanged),
});

//=======POSTs

export const addPost = (data, user) => ({
  type: ADD_POST,
  payload: addPostUser(data, user),
});
