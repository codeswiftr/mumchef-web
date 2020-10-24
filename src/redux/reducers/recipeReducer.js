import { types } from "../actions/recipes";

const initialState = {
  list: [],
  new: "",
  selected: null,
  loading: true,
  recipeId: null,
};
function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    console.log("# REDUCER: ", { item, action });
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item,
    };
  });
}
function insertItem(array, action) {
  let newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
}

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

    case types.RECIPE.UPDATE.ALLERGENS:
      return {
        ...state,
        selected: { ...state.selected, allergens: action.allergens },
      };
    case types.RECIPE.UPDATE.CATEGORIES:
      return {
        ...state,
        selected: { ...state.selected, categories: action.categories },
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
    case types.RECIPE.UPDATE.INGREDIENT:
      return {
        ...state,
        selected: {
          ...state.selected,
          ingredients: updateObjectInArray(state.selected.ingredients, action),
        },
      };
    case types.RECIPE.ADD.INGREDIENT:
      return {
        ...state,
        selected: {
          ...state.selected,
          ingredients: insertItem(state.selected.ingredients, action),
        },
      };
    case types.RECIPE.UPDATE.STEP:
      return {
        ...state,
        selected: {
          ...state.selected,
          instructions: updateObjectInArray(
            state.selected.instructions,
            action
          ),
        },
      };

    case types.RECIPE.ADD.STEP:
      return {
        ...state,
        selected: {
          ...state.selected,
          instructions: insertItem(state.selected.instructions, action),
        },
      };

    default:
      return state;
  }
}
