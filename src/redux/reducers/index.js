import { combineReducers } from "redux";
import recipes from "./recipeReducer";
import aggregate from "./aggregateReducer";
import login from "./login";
const rootReducer = combineReducers({
  login,
  recipes,
  aggregate,
});

export default rootReducer;
