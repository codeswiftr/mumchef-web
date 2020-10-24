import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import recipes from "./recipeReducer";
import aggregate from "./aggregateReducer";
import login from "./login";
const createRootReducer = (history) =>
  combineReducers({
    login,
    recipes,
    aggregate,
    router: connectRouter(history),
  });

export default createRootReducer;
