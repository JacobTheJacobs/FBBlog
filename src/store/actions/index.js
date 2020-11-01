import {
  AUTH_USER,
  LOGOUT_USER,
  ADD_POST,
  CLEAR_POST,
  GET_REVIEWS,
} from "../types";
import {
  registerUser,
  loginUser,
  autoSignInUser,
  logoutUser,
  updateProfileUser,
  addPostUser,
  getPostsUser,
  loadMoreReviewsUser,
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

export const clearPost = () => ({
  type: CLEAR_POST,
  payload: null,
});

export const getReviews = (limit) => ({
  type: GET_REVIEWS,
  payload: getPostsUser(limit),
});

export const loadMoreReviews = (limit, reviews) => ({
  type: GET_REVIEWS,
  payload: loadMoreReviewsUser(limit, reviews),
});
