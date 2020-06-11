import { combineReducers } from "redux";
import recipes from "./recipeReducer";
import apiCallsInProgress from "./apiStatusReducer";
import aggregate from "./aggregateReducer";

const rootReducer = combineReducers({
  recipes,
  aggregate,
  apiCallsInProgress,
});

export default rootReducer;
