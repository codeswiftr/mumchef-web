import { combineReducers } from "redux";
import recipes from "./recipeReducer";
import apiCallsInProgress from "./apiStatusReducer";
import aggregate from "./aggregateReducer";
import login from "./login";
const rootReducer = combineReducers({
  login,
  recipes,
  aggregate,
  apiCallsInProgress,
});

export default rootReducer;
