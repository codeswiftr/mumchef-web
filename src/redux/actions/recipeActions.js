import * as ActionTypes from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadRecipesSuccess(recipes) {
  return { type: ActionTypes.LOAD_RECIPES_SUCCESS, recipes };
}

export function createRecipeSuccess(recipe) {
  return { type: ActionTypes.CREATE_RECIPE_SUCCESS, recipe };
}

export function updateRecipeSuccess(recipe) {
  return { type: ActionTypes.UPDATE_RECIPE_SUCCESS, recipe };
}

export function deleteRecipeOptimistic(recipe) {
  return { type: ActionTypes.DELETE_RECIPE_OPTIMISTIC, recipe };
}
