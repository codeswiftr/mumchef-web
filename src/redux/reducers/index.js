import { combineReducers } from "redux";
import recipes from "./recipeReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  recipes,
  apiCallsInProgress,
});

export default rootReducer;
