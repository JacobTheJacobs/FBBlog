import { combineReducers } from "redux";
import reviews from "./reviews";

import auth from "./auth";

const appReducers = combineReducers({
  auth,
  reviews,
});

export default appReducers;
