import * as ActionTypes from "./actionTypes";
import * as recipeApi from "../../api/recipeApi";
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

export function loadRecipes() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return recipeApi
      .getRecipes()
      .once("value", (snapshot) => {
        let recipes = Object.entries(snapshot.val()).map(([k, v]) => ({
          id: k,
          ...v,
        }));

        console.log(recipes[0]);
        dispatch(loadRecipesSuccess(recipes));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveRecipe(recipe) {
  console.log(recipe);
  return function (dispatch, getState) {
    dispatch(beginApiCall());
  };
}
