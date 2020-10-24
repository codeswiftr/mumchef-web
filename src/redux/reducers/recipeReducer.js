import { types } from "../actions/recipes";

const emptyRecipe = {
  cookMinutes: 15,
  prepMinutes: 10,
  yield: 4,
  ingredients: [],
  instructions: [],
  photoUrl:
    "https://firebasestorage.googleapis.com/v0/b/babyledweaning-cb434.appspot.com/o/no-photo-available.png?alt=media&token=4f58833d-84db-4678-9d6b-5a4b572b5c2b",
};
const initialState = {
  list: [],
  new: "",
  selected: { ...emptyRecipe },
  snack: {},
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
        snack: {},
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

    case types.RECIPE.RESET:
      console.log("# REDUCER -> reset");
      return {
        ...state,
        snack: {},
        selected: { ...emptyRecipe },
      };

    case types.RECIPE.SAVE.SUCCESS:
      console.log("# REDUCER: save successful");
      return {
        ...state,
        snack: { message: "Recipe saved successfully!", severity: "success" },
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
        photoFile: action.file,
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
          ingredients: [...state.selected.ingredients, action.item],
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
          instructions: [...state.selected.instructions, action.item],
        },
      };

    default:
      return state;
  }
}
