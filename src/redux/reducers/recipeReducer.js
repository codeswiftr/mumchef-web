import { types } from "../actions/recipes";

const initialState = {
  list: [],
  new: "",
  selected: null,
  loading: true,
  recipeId: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECIPES.SYNC:
      return {
        ...state,
        list: action.recipes,
        loading: false,
      };
    case types.RECIPE.SELECT:
      return {
        ...state,
        selected: action.recipe,
      };
    case types.RECIPE.FIND:
      return {
        ...state,
        recipeId: action.recipeId,
      };
    case types.RECIPES.NEW.CHANGE:
      return {
        ...state,
        new: action.recipe,
      };
    case types.RECIPE.UPDATE.NAME:
      return {
        ...state,
        selected: { ...state.selected, name: action.name },
      };
    case types.RECIPE.UPDATE.YIELD:
      return {
        ...state,
        selected: { ...state.selected, yield: action.yield },
      };
    case types.RECIPE.SET_ERROR:
      return {
        ...state,
        selected: { ...state.selected, error: action.error },
      };
    case types.RECIPE.UPDATE.PREP_MINUTES:
      return {
        ...state,
        selected: { ...state.selected, prepMinutes: action.prepMinutes },
      };
    case types.RECIPE.UPDATE.COOK_MINUTES:
      return {
        ...state,
        selected: { ...state.selected, cookMinutes: action.cookMinutes },
      };

    case types.RECIPE.UPDATE.PHOTO_URL:
      return {
        ...state,
        selected: { ...state.selected, photoUrl: action.photoUrl },
      };
    case types.RECIPE.SET_FILE:
      return {
        ...state,
        selected: { ...state.selected, photoFile: action.file },
      };
    case types.RECIPE.UPLOAD_FILE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
