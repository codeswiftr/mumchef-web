import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function recipeReducer(
  state = initialState.recipes,
  action = {}
) {
  // console.log("recipe reducer:", state, action);
  if (action === undefined) {
    return state;
  }
  switch (action.type) {
    case types.CREATE_RECIPE_SUCCESS:
      return [...state, { ...action.recipe }];
    case types.UPDATE_RECIPE_SUCCESS:
      return state.map((recipe) =>
        recipe.id === action.recipe.id ? action.recipe : recipe
      );
    case types.LOAD_RECIPES_SUCCESS:
      return action.recipes;
    case types.DELETE_RECIPE_OPTIMISTIC:
      return state.filter((recipe) => recipe.id !== action.recipe.id);
    default:
      return state;
  }
}
